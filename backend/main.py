import os
import uuid
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

FREE_TRIAL_LIMIT = 2
DAILY_LIMIT = 20

# In-memory storage (resets when server restarts — we'll upgrade to database later)
user_data = {}

def get_user(user_id: str):
    if user_id not in user_data:
        user_data[user_id] = {
            "trial_used": 0,
            "paid": False,
            "daily_count": 0,
            "last_reset": str(date.today()),
            "chats": {}
        }
    u = user_data[user_id]
    if u["last_reset"] != str(date.today()):
        u["daily_count"] = 0
        u["last_reset"] = str(date.today())
    return u


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


@app.get("/")
def health_check():
    return {"status": "Akili backend is running"}


@app.get("/payment-info")
def payment_info():
    return {
        "paypal_email": PAYPAL_EMAIL,
        "mpesa_number": MPESA_NUMBER,
        "subscription_price_usd": 5,
        "subscription_price_kes": 650,
        "trial_messages": FREE_TRIAL_LIMIT,
        "daily_limit": DAILY_LIMIT
    }


@app.get("/user-status/{user_id}")
def user_status(user_id: str):
    if user_id == OWNER_ID:
        return {"is_owner": True, "can_chat": True, "trial_used": 0, "daily_count": 0, "paid": True}
    u = get_user(user_id)
    can_chat = (
        u["trial_used"] < FREE_TRIAL_LIMIT or
        (u["paid"] and u["daily_count"] < DAILY_LIMIT)
    )
    return {
        "is_owner": False,
        "can_chat": can_chat,
        "trial_used": u["trial_used"],
        "daily_count": u["daily_count"],
        "paid": u["paid"],
        "trial_remaining": max(0, FREE_TRIAL_LIMIT - u["trial_used"]),
        "daily_remaining": max(0, DAILY_LIMIT - u["daily_count"]) if u["paid"] else 0
    }


@app.post("/verify-payment")
def verify_payment(req: PaymentRequest):
    # For now we manually confirm payment since Daraja API is pending
    # This endpoint will be upgraded to auto-verify once Daraja is approved
    u = get_user(req.user_id)
    u["paid"] = True
    u["daily_count"] = 0
    return {"success": True, "message": "Payment confirmed. Welcome to Akili!"}


@app.post("/chat")
def chat(request: ChatRequest):
    if request.user_id == OWNER_ID:
        pass  # Owner bypasses all limits
    else:
        u = get_user(request.user_id)
        if u["trial_used"] < FREE_TRIAL_LIMIT:
            u["trial_used"] += 1
        elif u["paid"] and u["daily_count"] < DAILY_LIMIT:
            u["daily_count"] += 1
        else:
            if not u["paid"]:
                return {"error": "TRIAL_ENDED", "message": "Your 2 free messages have been used. Please subscribe to continue using Akili."}
            else:
                return {"error": "DAILY_LIMIT", "message": "You have reached your 20 message daily limit. It resets at midnight."}

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