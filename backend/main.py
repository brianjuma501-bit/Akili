import os
import base64
import requests
from datetime import datetime, date
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

PAYPAL_EMAIL = os.getenv("PAYPAL_EMAIL")
MPESA_NUMBER = os.getenv("MPESA_NUMBER")
OWNER_ID = os.getenv("OWNER_ID", "brianjuma501")
DARAJA_CONSUMER_KEY = os.getenv("DARAJA_CONSUMER_KEY")
DARAJA_CONSUMER_SECRET = os.getenv("DARAJA_CONSUMER_SECRET")
DARAJA_SHORTCODE = os.getenv("DARAJA_SHORTCODE", "174379")
DARAJA_PASSKEY = os.getenv("DARAJA_PASSKEY")
DARAJA_CALLBACK_URL = os.getenv("DARAJA_CALLBACK_URL")

FREE_TRIAL_LIMIT = 2
DAILY_LIMIT = 20

user_data = {}
request_counts = {}


def get_user(user_id: str):
    if user_id not in user_data:
        user_data[user_id] = {
            "trial_used": 0,
            "paid": False,
            "daily_count": 0,
            "last_reset": str(date.today()),
            "chats": {},
            "email": None
        }
    u = user_data[user_id]
    if u["last_reset"] != str(date.today()):
        u["daily_count"] = 0
        u["last_reset"] = str(date.today())
    return u


def get_mpesa_token():
    try:
        credentials = base64.b64encode(
            f"{DARAJA_CONSUMER_KEY}:{DARAJA_CONSUMER_SECRET}".encode()
        ).decode()
        response = requests.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            headers={"Authorization": f"Basic {credentials}"}
        )
        return response.json().get("access_token")
    except Exception as e:
        return None


def generate_mpesa_password():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    data = base64.b64encode(
        f"{DARAJA_SHORTCODE}{DARAJA_PASSKEY}{timestamp}".encode()
    ).decode()
    return data, timestamp


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    system: str
    messages: list[Message]
    user_id: str


class SaveChatRequest(BaseModel):
    user_id: str
    chat_id: str
    title: str
    messages: list[Message]


class DeleteChatRequest(BaseModel):
    user_id: str
    chat_id: str


class PaymentRequest(BaseModel):
    user_id: str
    payment_method: str
    amount: float


class STKRequest(BaseModel):
    user_id: str
    phone_number: str
    amount: int = 650


class ManualConfirmRequest(BaseModel):
    user_id: str


@app.get("/")
def health_check():
    return {"status": "Akili backend is running"}


@app.get("/payment-info")
def payment_info():
    return {
        "paypal_email": PAYPAL_EMAIL,
        "paypal_link": f"https://paypal.me/brianjuma501/5",
        "mpesa_number": MPESA_NUMBER,
        "subscription_price_usd": 5,
        "subscription_price_kes": 650,
        "trial_messages": FREE_TRIAL_LIMIT,
        "daily_limit": DAILY_LIMIT
    }


@app.get("/user-status/{user_id}")
def user_status(user_id: str):
    if user_id == OWNER_ID:
        return {
            "is_owner": True,
            "can_chat": True,
            "trial_used": 0,
            "daily_count": 0,
            "paid": True,
            "trial_remaining": 999,
            "daily_remaining": 999
        }
    u = get_user(user_id)
    in_trial = u["trial_used"] < FREE_TRIAL_LIMIT
    in_daily = u["paid"] and u["daily_count"] < DAILY_LIMIT
    can_chat = in_trial or in_daily
    return {
        "is_owner": False,
        "can_chat": can_chat,
        "trial_used": u["trial_used"],
        "daily_count": u["daily_count"],
        "paid": u["paid"],
        "trial_remaining": max(0, FREE_TRIAL_LIMIT - u["trial_used"]),
        "daily_remaining": max(0, DAILY_LIMIT - u["daily_count"]) if u["paid"] else 0
    }


@app.post("/stk-push")
def stk_push(req: STKRequest):
    try:
        token = get_mpesa_token()
        if not token:
            return {"success": False, "message": "Could not connect to M-Pesa. Please try manual payment."}

        password, timestamp = generate_mpesa_password()
        phone = req.phone_number.strip()
        if phone.startswith("0"):
            phone = "254" + phone[1:]
        elif phone.startswith("+"):
            phone = phone[1:]

        payload = {
            "BusinessShortCode": DARAJA_SHORTCODE,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": req.amount,
            "PartyA": phone,
            "PartyB": DARAJA_SHORTCODE,
            "PhoneNumber": phone,
            "CallBackURL": DARAJA_CALLBACK_URL,
            "AccountReference": f"AKILI-{req.user_id[:8]}",
            "TransactionDesc": "Akili AI Subscription"
        }

        response = requests.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            json=payload,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json"
            }
        )
        result = response.json()

        if result.get("ResponseCode") == "0":
            return {
                "success": True,
                "message": "M-Pesa prompt sent to your phone. Enter your PIN to complete payment.",
                "checkout_request_id": result.get("CheckoutRequestID")
            }
        else:
            return {
                "success": False,
                "message": result.get("ResponseDescription", "STK push failed. Please try manual payment.")
            }
    except Exception as e:
        return {"success": False, "message": f"Error: {str(e)}"}


@app.post("/mpesa-callback")
async def mpesa_callback(request: Request):
    try:
        body = await request.json()
        result = body.get("Body", {}).get("stkCallback", {})
        result_code = result.get("ResultCode")
        if result_code == 0:
            metadata = result.get("CallbackMetadata", {}).get("Item", [])
            account_ref = next((i["Value"] for i in metadata if i["Name"] == "AccountReference"), None)
            if account_ref and account_ref.startswith("AKILI-"):
                user_prefix = account_ref.replace("AKILI-", "")
                for uid in user_data:
                    if uid.startswith(user_prefix):
                        user_data[uid]["paid"] = True
                        user_data[uid]["daily_count"] = 0
                        break
    except Exception as e:
        pass
    return {"ResultCode": 0, "ResultDesc": "Accepted"}


@app.post("/manual-confirm")
def manual_confirm(req: ManualConfirmRequest):
    u = get_user(req.user_id)
    u["paid"] = True
    u["daily_count"] = 0
    return {"success": True, "message": "Access unlocked! You have 20 messages per day."}


@app.post("/chat")
def chat(request: ChatRequest):
    if request.user_id == OWNER_ID:
        pass
    else:
        uid = request.user_id
        if uid not in request_counts:
            request_counts[uid] = {"count": 0, "window": datetime.now().timestamp()}
        rc = request_counts[uid]
        if datetime.now().timestamp() - rc["window"] < 60:
            if rc["count"] > 30:
                return {"error": "RATE_LIMIT", "message": "Too many requests. Please wait a moment."}
            rc["count"] += 1
        else:
            rc["count"] = 1
            rc["window"] = datetime.now().timestamp()

        u = get_user(request.user_id)
        if u["trial_used"] < FREE_TRIAL_LIMIT:
            u["trial_used"] += 1
        elif u["paid"] and u["daily_count"] < DAILY_LIMIT:
            u["daily_count"] += 1
        else:
            if not u["paid"]:
                return {"error": "TRIAL_ENDED", "message": "Your 2 free messages are used up. Subscribe to continue."}
            else:
                return {"error": "DAILY_LIMIT", "message": "Daily limit reached. Resets at midnight."}

    try:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1000,
            system=request.system,
            messages=[{"role": m.role, "content": m.content} for m in request.messages],
        )
        reply_text = "".join(
            block.text for block in response.content if hasattr(block, "text")
        )
        return {"reply": reply_text}
    except Exception as e:
        return {"error": str(e)}


@app.post("/save-chat")
def save_chat(req: SaveChatRequest):
    u = get_user(req.user_id)
    u["chats"][req.chat_id] = {
        "title": req.title,
        "messages": [{"role": m.role, "content": m.content} for m in req.messages],
        "saved_at": str(datetime.now())
    }
    return {"success": True}


@app.get("/get-chats/{user_id}")
def get_chats(user_id: str):
    u = get_user(user_id)
    return {"chats": u["chats"]}


@app.post("/delete-chat")
def delete_chat(req: DeleteChatRequest):
    u = get_user(req.user_id)
    if req.chat_id in u["chats"]:
        del u["chats"][req.chat_id]
    return {"success": True}