import React, { useState, useRef, useEffect } from 'react'

const SendIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>)
const PaperclipIcon = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>)
const GlobeIcon = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>)
const PlusIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>)
const TrashIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>)
const MenuIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>)
const CloseIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>)
const SaveIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>)
const HistoryIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>)
const StarIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)
const MicIcon = () => (<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>)
const SpeakerIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>)
const SpeakerOffIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>)
const EditIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>)

const BACKEND_URL = 'https://akili-backend.onrender.com'

const MODES = [
  {
    id: 'teacher', emoji: '🎓', name: 'Teacher Mode', desc: 'Explain anything simply',
    systemPrompt: `You are Akili in Teacher Mode. Be direct — give the answer first, explain after only if needed. Never over-explain or repeat yourself. Answer exam questions directly and completely. Help write any letter, email, or document requested. Solve math step by step but concisely. Use casual language if the user does. Be honest even when truth is uncomfortable. You are knowledgeable — share it confidently. Always add a brief note that Akili can make mistakes on important matters.`,
    placeholder: 'Ask anything — exams, letters, math, concepts...',
    welcome: 'Ask me anything. I give straight, honest answers.'
  },
  {
    id: 'analyst', emoji: '🔍', name: 'Analyst Mode', desc: 'Break down documents & data',
    systemPrompt: `You are Akili in Analyst Mode. Get straight to key points — most important findings first. Be objective and honest. Flag red flags clearly. Never soften uncomfortable truths. Never assist with anything illegal.`,
    placeholder: 'Paste a document, contract, or data to analyze...',
    welcome: 'Paste anything. I break it down fast and honestly.'
  },
  {
    id: 'logic', emoji: '🧠', name: 'Logic Mode', desc: 'Sharpen your reasoning',
    systemPrompt: `You are Akili in Logic Mode. Point out logical flaws directly. If an argument is weak, say so and explain why. If someone is right, confirm it clearly. Be a sharp, honest thinking partner.`,
    placeholder: 'Give me an argument or reasoning problem...',
    welcome: 'Give me your argument. I will tell you honestly if it holds.'
  },
  {
    id: 'mentor', emoji: '🧭', name: 'Mentor Mode', desc: 'Life, relationships & growth',
    systemPrompt: `You are Akili in Mentor Mode. Give direct, honest life and relationship advice. Tell people what they need to hear, not what they want to hear. If someone is wrong in a situation, say so kindly but clearly. Give real, practical life hacks and strategies. Be like a wise, honest friend who genuinely wants them to succeed. Never encourage harmful or illegal behavior.`,
    placeholder: 'Ask about relationships, life, goals, decisions...',
    welcome: 'Ask me about life or relationships. I will be completely honest.'
  },
  {
    id: 'research', emoji: '📡', name: 'Research Mode', desc: 'Deep research & synthesis',
    systemPrompt: `You are Akili in Research Mode. Lead with the most important findings. Be thorough but not verbose. Note when something needs verification. Never fabricate facts.`,
    placeholder: 'What topic do you want to research?',
    welcome: 'Give me a topic. I will find and explain what matters most.'
  }
]

const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const fileIcon = (name) => {
  const ext = name.split('.').pop().toLowerCase()
  const map = { pdf: '📄', doc: '📝', docx: '📝', xls: '📊', xlsx: '📊', ppt: '📑', pptx: '📑', jpg: '🖼️', jpeg: '🖼️', png: '🖼️', txt: '📃' }
  return map[ext] || '📁'
}

const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null

const getUserId = () => {
  try {
    let id = localStorage.getItem('akili_user_id')
    if (!id) { id = 'user_' + Math.random().toString(36).substr(2, 9); localStorage.setItem('akili_user_id', id) }
    return id
  } catch { return 'guest_' + Math.random().toString(36).substr(2, 9) }
}

const getStoredUser = () => {
  try { return JSON.parse(localStorage.getItem('akili_user') || 'null') } catch { return null }
}

export default function App() {
  const [activeMode, setActiveMode] = useState(MODES[0])
  const [messages, setMessages] = useState({})
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [user, setUser] = useState(() => getStoredUser())
  const [showAuth, setShowAuth] = useState(false)
  const [authEmail, setAuthEmail] = useState('')
  const [authName, setAuthName] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [speakingId, setSpeakingId] = useState(null)
  const [voiceSupported] = useState(!!SpeechRecognition)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [savedChats, setSavedChats] = useState({})
  const [userStatus, setUserStatus] = useState(null)
  const [paymentInfo, setPaymentInfo] = useState(null)
  const [phoneInput, setPhoneInput] = useState('')
  const [stkLoading, setStkLoading] = useState(false)
  const [stkMessage, setStkMessage] = useState('')
  const [userId] = useState(() => getUserId())

  const chatEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)
  const recognitionRef = useRef(null)

  const currentMessages = messages[activeMode.id] || []

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  useEffect(() => {
    const ta = textareaRef.current
    if (ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px' }
  }, [input])

  useEffect(() => {
    fetchUserStatus()
    fetchPaymentInfo()
    fetchSavedChats()
  }, [userId])

  useEffect(() => {
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript
      setInput(transcript)
    }
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)
    recognitionRef.current = recognition
  }, [])

  const fetchUserStatus = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/user-status/${userId}`)
      setUserStatus(await res.json())
    } catch (e) {}
  }

  const fetchPaymentInfo = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/payment-info`)
      setPaymentInfo(await res.json())
    } catch (e) {}
  }

  const fetchSavedChats = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/get-chats/${userId}`)
      const data = await res.json()
      setSavedChats(data.chats || {})
    } catch (e) {}
  }

  const saveCurrentChat = async () => {
    if (currentMessages.length === 0) return
    const chatId = activeMode.id + '_' + Date.now()
    const title = activeMode.name + ' — ' + new Date().toLocaleDateString()
    try {
      await fetch(`${BACKEND_URL}/save-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, chat_id: chatId, title, messages: currentMessages.map(m => ({ role: m.role, content: m.content })) })
      })
      fetchSavedChats()
      alert('Chat saved!')
    } catch (e) {}
  }

  const deleteChat = async (chatId) => {
    try {
      await fetch(`${BACKEND_URL}/delete-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, chat_id: chatId })
      })
      fetchSavedChats()
    } catch (e) {}
  }

  const loadChat = (chat) => {
    const loaded = chat.messages.map((m, i) => ({ ...m, id: Date.now() + i, time: new Date() }))
    setMessages(prev => ({ ...prev, [activeMode.id]: loaded }))
    setShowHistory(false)
  }

  const handleSTKPush = async () => {
    if (!phoneInput.trim()) { setStkMessage('Please enter your phone number.'); return }
    setStkLoading(true)
    setStkMessage('')
    try {
      const res = await fetch(`${BACKEND_URL}/stk-push`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, phone_number: phoneInput, amount: 650 })
      })
      const data = await res.json()
      setStkMessage(data.message)
    } catch (e) {
      setStkMessage('Could not send M-Pesa prompt. Please try manual payment.')
    } finally {
      setStkLoading(false)
    }
  }

  const handleManualConfirm = async () => {
    try {
      await fetch(`${BACKEND_URL}/manual-confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      })
      await fetchUserStatus()
      setShowPayment(false)
      alert('✅ Access unlocked! You now have 20 messages per day. Thank you!')
    } catch (e) { alert('Could not confirm. Please try again.') }
  }

  const handleSignIn = () => {
    const name = authName.trim()
    const email = authEmail.trim()
    if (!name) return
    const newUser = { name, email, initial: name.charAt(0).toUpperCase() }
    setUser(newUser)
    try { localStorage.setItem('akili_user', JSON.stringify(newUser)) } catch {}
    setShowAuth(false)
    setAuthName('')
    setAuthEmail('')
  }

  const handleSignOut = () => {
    setUser(null)
    try { localStorage.removeItem('akili_user') } catch {}
  }

  const startNewChat = () => {
    clearChat()
    setSidebarOpen(false)
  }

  const toggleListening = () => {
    if (!recognitionRef.current) return
    if (isListening) { recognitionRef.current.stop(); setIsListening(false) }
    else { setInput(''); recognitionRef.current.start(); setIsListening(true) }
  }

  const speakMessage = (msg) => {
    if (!window.speechSynthesis) return
    if (speakingId === msg.id) { window.speechSynthesis.cancel(); setSpeakingId(null); return }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(msg.content.replace(/[*#_`]/g, ''))
    utterance.onend = () => setSpeakingId(null)
    utterance.onerror = () => setSpeakingId(null)
    window.speechSynthesis.speak(utterance)
    setSpeakingId(msg.id)
  }

  const buildHistory = (msgs, text) => {
    const history = msgs.map(m => ({ role: m.role, content: m.content }))
    history.push({ role: 'user', content: text })
    return history
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text && attachedFiles.length === 0) return

    if (userStatus && !userStatus.can_chat && !userStatus.is_owner) {
      setShowPayment(true)
      return
    }

    const userContent = attachedFiles.length > 0
      ? `${text}\n\n[Attached: ${attachedFiles.map(f => f.name).join(', ')}]`
      : text

    const userMsg = { id: Date.now(), role: 'user', content: userContent, time: new Date() }
    const prevMsgs = messages[activeMode.id] || []

    setMessages(prev => ({ ...prev, [activeMode.id]: [...prevMsgs, userMsg] }))
    setInput('')
    setAttachedFiles([])
    setLoading(true)

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: activeMode.systemPrompt,
          messages: buildHistory(prevMsgs, userContent),
          user_id: userId
        })
      })

      const data = await response.json()

      if (data.error === 'TRIAL_ENDED' || data.error === 'DAILY_LIMIT') {
        const errMsg = { id: Date.now() + 1, role: 'assistant', content: data.message, time: new Date() }
        setMessages(prev => ({ ...prev, [activeMode.id]: [...(prev[activeMode.id] || []), errMsg] }))
        setShowPayment(true)
      } else {
        const aiText = data.reply || data.error || 'Something went wrong. Please try again.'
        const aiMsg = { id: Date.now() + 1, role: 'assistant', content: aiText, time: new Date() }
        setMessages(prev => ({ ...prev, [activeMode.id]: [...(prev[activeMode.id] || []), aiMsg] }))
        fetchUserStatus()
      }
    } catch (err) {
      const errMsg = { id: Date.now() + 1, role: 'assistant', content: '⚠️ Could not connect. Please try again.', time: new Date() }
      setMessages(prev => ({ ...prev, [activeMode.id]: [...(prev[activeMode.id] || []), errMsg] }))
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }
  const handleFiles = (files) => setAttachedFiles(prev => [...prev, ...Array.from(files).map(f => ({ name: f.name, size: f.size, file: f }))])
  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }
  const removeFile = (idx) => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))
  const clearChat = () => { setMessages(prev => ({ ...prev, [activeMode.id]: [] })); if (window.speechSynthesis) window.speechSynthesis.cancel(); setSpeakingId(null) }
  const handleModeSelect = (mode) => { setActiveMode(mode); setSidebarOpen(false) }

  const displayName = user ? user.name : 'Guest'

  const StatusBar = () => {
    if (!userStatus || userStatus.is_owner) return null
    if (!userStatus.paid && userStatus.trial_used < 2) {
      return <div className="status-bar trial">🎯 {2 - userStatus.trial_used} free message{2 - userStatus.trial_used !== 1 ? 's' : ''} remaining — <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowPayment(true)}>Upgrade</span></div>
    }
    if (userStatus.paid) {
      return <div className="status-bar paid">✨ {userStatus.daily_remaining} messages left today</div>
    }
    return null
  }

  return (
    <div className="app-shell">
      {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-mark">
            <div className="logo-icon">A</div>
            <div>
              <div className="logo-text">Akili</div>
              <div className="logo-sub">AI Knowledge Companion</div>
            </div>
          </div>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}><CloseIcon /></button>
        </div>

        <div style={{ padding: '12px 16px 4px' }}>
          <button className="new-chat-btn" onClick={startNewChat}>
            <EditIcon /> New Chat
          </button>
        </div>

        <nav className="mode-section">
          <div className="section-label">Modes</div>
          {MODES.map(mode => (
            <button key={mode.id} className={`mode-btn ${activeMode.id === mode.id ? 'active' : ''}`} onClick={() => handleModeSelect(mode)}>
              <div className="mode-icon">{mode.emoji}</div>
              <div className="mode-info">
                <span className="mode-name">{mode.name}</span>
                <span className="mode-desc">{mode.desc}</span>
              </div>
            </button>
          ))}
        </nav>

        <div style={{ padding: '0 16px 8px' }}>
          <div className="section-label" style={{ padding: '0 8px', marginBottom: '8px' }}>Files</div>
          <div className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}>
            <span className="upload-icon">📂</span>
            <span className="upload-text">Upload file</span>
            <span className="upload-hint">PDF, Word, Excel, Images</span>
          </div>
          <input ref={fileInputRef} type="file" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
        </div>

        <div style={{ padding: '0 16px 8px' }}>
          <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '10px', gap: '8px' }}
            onClick={() => { setShowHistory(true); setSidebarOpen(false) }}>
            <HistoryIcon /> Chat History
          </button>
        </div>

        <div className="sidebar-bottom">
          {user ? (
            <div>
              <div className="user-chip">
                <div className="user-avatar">{user.initial}</div>
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">{user.email || (userStatus?.paid ? '✨ Subscribed' : 'Free trial')}</div>
                </div>
                <div className="online-dot" />
              </div>
              <button className="signout-btn" onClick={handleSignOut}>Sign out</button>
            </div>
          ) : (
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '11px' }} onClick={() => setShowAuth(true)}>
              Sign in / Create account
            </button>
          )}
          <button className="upgrade-btn" onClick={() => setShowPayment(true)}>
            <StarIcon /> Upgrade
          </button>
          <div className="creator-credit">Created by <span>Brian Juma</span></div>
        </div>
      </aside>

      <main className="main-area">
        <div className="topbar">
          <div className="topbar-left">
            <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}><MenuIcon /></button>
            <div>
              <div className="topbar-title">{activeMode.emoji} {activeMode.name}</div>
              <div className="topbar-subtitle">{activeMode.welcome}</div>
            </div>
          </div>
          <div className="topbar-actions">
            {currentMessages.length > 0 && (
              <>
                <button className="icon-btn" onClick={saveCurrentChat} title="Save chat"><SaveIcon /></button>
                <button className="btn-ghost" onClick={clearChat}><TrashIcon /> <span className="btn-text">Clear</span></button>
              </>
            )}
            <button className="btn-primary" onClick={() => fileInputRef.current?.click()}><PlusIcon /> <span className="btn-text">Upload</span></button>
          </div>
        </div>

        <StatusBar />

        <div className="chat-area">
          {currentMessages.length === 0 ? (
            <div className="welcome-screen">
              <div className="welcome-glow">A</div>
              <h1 className="welcome-title">Hello, <span>{displayName}</span> 👋</h1>
              <p className="welcome-sub">Ask me anything — exams, letters, math, relationships, life advice, documents. Straight honest answers in any language.</p>
              <div className="ai-disclaimer">⚠️ Akili is AI and can make mistakes. Verify important information.</div>
            </div>
          ) : (
            <>
              {currentMessages.map(msg => (
                <div key={msg.id} className={`message-row ${msg.role === 'user' ? 'user' : ''}`}>
                  <div className={`msg-avatar ${msg.role === 'user' ? 'user' : 'akili'}`}>
                    {msg.role === 'user' ? (user ? user.initial : 'G') : 'A'}
                  </div>
                  <div style={{ maxWidth: '78%' }}>
                    <div className={`msg-bubble ${msg.role === 'user' ? 'user' : 'akili'}`}>
                      {msg.content.split('\n').map((line, i, arr) => (
                        <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
                      ))}
                    </div>
                    <div className={`msg-meta ${msg.role === 'user' ? 'user' : ''}`}>
                      <span className="msg-time">{formatTime(msg.time)}</span>
                      {msg.role === 'assistant' && (
                        <button className={`speak-btn ${speakingId === msg.id ? 'speaking' : ''}`} onClick={() => speakMessage(msg)}>
                          {speakingId === msg.id ? <SpeakerOffIcon /> : <SpeakerIcon />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="message-row">
                  <div className="msg-avatar akili">A</div>
                  <div className="msg-bubble akili">
                    <div className="typing-indicator">
                      <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={chatEndRef} />
        </div>

        {currentMessages.length > 0 && <div className="ai-disclaimer-bar">⚠️ Akili can make mistakes. Verify important information.</div>}

        {attachedFiles.length > 0 && (
          <div className="file-chips">
            {attachedFiles.map((f, i) => (
              <div key={i} className="file-chip">
                <span>{fileIcon(f.name)}</span>{f.name}
                <button className="file-chip-remove" onClick={() => removeFile(i)}>×</button>
              </div>
            ))}
          </div>
        )}

        <div className="input-bar-wrap">
          <div className="input-bar">
            <div className="input-row">
              <textarea ref={textareaRef} className="chat-input"
                placeholder={isListening ? '🎤 Listening...' : activeMode.placeholder}
                value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} rows={1} />
              <div className="input-actions">
                {voiceSupported && (
                  <button className={`icon-btn ${isListening ? 'mic-active' : ''}`} onClick={toggleListening}><MicIcon /></button>
                )}
                <button className="icon-btn" onClick={() => fileInputRef.current?.click()}><PaperclipIcon /></button>
                <button className="send-btn" onClick={handleSend} disabled={loading || (!input.trim() && attachedFiles.length === 0)}><SendIcon /></button>
              </div>
            </div>
            <div className="input-footer">
              <span className="input-hint">Enter to send · Shift+Enter for new line</span>
              <span className="lang-badge"><GlobeIcon /> <span className="btn-text">All languages & slang</span></span>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Modal */}
      {showPayment && (
        <div className="modal-overlay" onClick={() => setShowPayment(false)}>
          <div className="modal-card payment-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPayment(false)}><CloseIcon /></button>
            <div className="payment-header">
              <div className="welcome-glow" style={{ width: 52, height: 52, fontSize: 20, marginBottom: 12 }}>A</div>
              <h2 className="modal-title">Upgrade Akili</h2>
              <p className="modal-sub">20 messages per day. Resets every midnight.</p>
            </div>
            <div className="payment-price">
              <span className="price-amount">$5</span>
              <span className="price-period">/ month</span>
            </div>

            <div className="payment-options">
              <div className="payment-option">
                <div className="payment-option-title">📱 M-Pesa STK Push (Auto)</div>
                <div className="payment-option-body">
                  <p>Enter your M-Pesa number and we'll send a payment prompt directly to your phone:</p>
                  <input
                    className="modal-input" style={{ marginTop: 10, textAlign: 'left' }}
                    placeholder="e.g. 0712345678"
                    value={phoneInput}
                    onChange={e => setPhoneInput(e.target.value)}
                  />
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px', marginTop: 10 }}
                    onClick={handleSTKPush} disabled={stkLoading}>
                    {stkLoading ? 'Sending...' : '📲 Send M-Pesa Prompt (KSh 650)'}
                  </button>
                  {stkMessage && <p style={{ fontSize: '12.5px', color: 'var(--accent-green)', marginTop: 8, textAlign: 'center' }}>{stkMessage}</p>}
                </div>
              </div>

              <div className="payment-option">
                <div className="payment-option-title">📱 M-Pesa / Airtel Manual</div>
                <div className="payment-option-body">
                  <p>Send <strong>KSh 650</strong> via Send Money to:</p>
                  <div className="payment-detail-box">{paymentInfo?.mpesa_number || '0795400348'}</div>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: 6 }}>Works for both Safaricom M-Pesa and Airtel Money</p>
                </div>
              </div>

              <div className="payment-option">
                <div className="payment-option-title">💳 PayPal</div>
                <div className="payment-option-body">
                  <p>Send <strong>$5 USD</strong> via PayPal:</p>
                  <a href={paymentInfo?.paypal_link || 'https://paypal.me/brianjuma501/5'} target="_blank" rel="noopener noreferrer"
                    className="btn-primary" style={{ display: 'flex', justifyContent: 'center', padding: '11px', marginTop: 10, textDecoration: 'none' }}>
                    💳 Pay with PayPal ($5)
                  </a>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: 6 }}>Select "Friends & Family" to avoid fees</p>
                </div>
              </div>

              <div className="payment-option">
                <div className="payment-option-title">🌍 International (WorldRemit / Remitly)</div>
                <div className="payment-option-body">
                  <p>Send <strong>$5 USD</strong> to M-Pesa number:</p>
                  <div className="payment-detail-box">{paymentInfo?.mpesa_number || '0795400348'}</div>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: 6 }}>Use WorldRemit or Remitly — goes straight to M-Pesa</p>
                </div>
              </div>
            </div>

            <div className="payment-confirm-section">
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 10, textAlign: 'center' }}>
                After paying, tap below. Access unlocks within minutes.
              </p>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }} onClick={handleManualConfirm}>
                ✅ I Have Paid — Unlock Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat History Modal */}
      {showHistory && (
        <div className="modal-overlay" onClick={() => setShowHistory(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setShowHistory(false)}><CloseIcon /></button>
            <h2 className="modal-title" style={{ marginBottom: 16 }}>Chat History</h2>
            {Object.keys(savedChats).length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>No saved chats yet. Use the 💾 button during a chat.</p>
            ) : (
              Object.entries(savedChats).map(([chatId, chat]) => (
                <div key={chatId} className="history-item">
                  <div className="history-item-info" onClick={() => loadChat(chat)}>
                    <div className="history-item-title">{chat.title}</div>
                    <div className="history-item-date">{chat.saved_at?.slice(0, 16)}</div>
                  </div>
                  <button className="history-delete-btn" onClick={() => deleteChat(chatId)}><TrashIcon /></button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuth && (
        <div className="modal-overlay" onClick={() => setShowAuth(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAuth(false)}><CloseIcon /></button>
            <h2 className="modal-title">Sign in to Akili</h2>
            <p className="modal-sub">Enter your details to personalize your experience.</p>
            <input className="modal-input" placeholder="Your name" value={authName}
              onChange={e => setAuthName(e.target.value)} style={{ marginBottom: 10 }} />
            <input className="modal-input" placeholder="Email (optional)" value={authEmail}
              onChange={e => setAuthEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSignIn()} />
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '14px' }} onClick={handleSignIn}>
              Continue
            </button>
            <button className="modal-cancel" onClick={() => setShowAuth(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}