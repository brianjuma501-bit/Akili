import React, { useState, useRef, useEffect } from 'react'

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
  </svg>
)
const PaperclipIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
  </svg>
)
const GlobeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
  </svg>
)
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
  </svg>
)
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)
const MicIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
    <path d="M19 10v2a7 7 0 01-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
)
const SpeakerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
  </svg>
)
const SpeakerOffIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
)
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
)
const HistoryIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const BACKEND_URL = 'https://akili-backend.onrender.com'

const MODES = [
  {
    id: 'teacher',
    emoji: '🎓',
    name: 'Teacher Mode',
    desc: 'Explain anything simply',
    systemPrompt: `You are Akili in Teacher Mode. Be direct and clear — give the answer first, explain after if needed. Never over-explain. Answer exam questions directly and fully. Help write any kind of letter when asked. Solve math step by step but concisely. Use slang naturally if the user does. Be honest even if the truth is uncomfortable. You know a lot — share it confidently. Never refuse to answer something legal. Always note that Akili can make mistakes.`,
    placeholder: 'Ask me anything — exams, letters, math, explanations...',
    welcome: 'Ask me anything. I will give you straight answers.'
  },
  {
    id: 'analyst',
    emoji: '🔍',
    name: 'Analyst Mode',
    desc: 'Break down documents & data',
    systemPrompt: `You are Akili in Analyst Mode. Analyze documents, reports, contracts, and data. Get straight to the key points — findings first, details after. Be objective and honest even if findings are uncomfortable. Flag red flags clearly. Never assist with anything illegal.`,
    placeholder: 'Paste a document, contract, or report to analyze...',
    welcome: 'Paste anything — I will break it down fast and honestly.'
  },
  {
    id: 'logic',
    emoji: '🧠',
    name: 'Logic Mode',
    desc: 'Sharpen your reasoning',
    systemPrompt: `You are Akili in Logic Mode. Help users think clearly. Point out logical flaws directly without softening. If someone's argument is weak, say so clearly and explain why. If they're right, confirm it. Be a sharp, honest thinking partner. Never help with harmful manipulation.`,
    placeholder: 'Give me an argument or reasoning puzzle...',
    welcome: 'Give me your argument. I will tell you honestly if it holds up.'
  },
  {
    id: 'mentor',
    emoji: '🧭',
    name: 'Mentor Mode',
    desc: 'Life, relationships & growth',
    systemPrompt: `You are Akili in Mentor Mode. Give honest, direct life advice — not comfortable lies. If someone is wrong in a relationship situation, tell them clearly but kindly. Give real relationship advice, life hacks, and strategies for success. Create learning roadmaps. Tell people what they need to hear, not what they want to hear. Be like a wise, honest friend who genuinely wants them to succeed.`,
    placeholder: 'Ask about relationships, life decisions, goals, success...',
    welcome: 'Ask me anything about life, relationships, or your goals. I will be honest with you.'
  },
  {
    id: 'research',
    emoji: '📡',
    name: 'Research Mode',
    desc: 'Deep research & synthesis',
    systemPrompt: `You are Akili in Research Mode. Synthesize information clearly and directly. Lead with the most important findings. Be thorough but not verbose. Note when something needs verification. Never fabricate facts or sources.`,
    placeholder: 'What topic do you want to research?',
    welcome: 'Give me a topic. I will go deep and give you what matters most.'
  }
]

const QUICK_ACTIONS = [
  { icon: '📄', title: 'Summarize a document', prompt: 'Summarize this document for me. I will paste it below:' },
  { icon: '📝', title: 'Write me a letter', prompt: 'Write me a professional letter. Here is what I need:' },
  { icon: '🧮', title: 'Solve a math problem', prompt: 'Solve this step by step:' },
  { icon: '💡', title: 'Life advice', prompt: 'I need honest advice about this situation:' }
]

const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const fileIcon = (name) => {
  const ext = name.split('.').pop().toLowerCase()
  const map = { pdf: '📄', doc: '📝', docx: '📝', xls: '📊', xlsx: '📊', ppt: '📑', pptx: '📑', jpg: '🖼️', jpeg: '🖼️', png: '🖼️', txt: '📃' }
  return map[ext] || '📁'
}

const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null

const generateUserId = () => {
  let id = localStorage.getItem('akili_user_id')
  if (!id) { id = 'user_' + Math.random().toString(36).substr(2, 9); localStorage.setItem('akili_user_id', id) }
  return id
}

export default function App() {
  const [activeMode, setActiveMode] = useState(MODES[0])
  const [messages, setMessages] = useState({})
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [user, setUser] = useState(null)
  const [signInName, setSignInName] = useState('')
  const [showSignIn, setShowSignIn] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [speakingId, setSpeakingId] = useState(null)
  const [voiceSupported] = useState(!!SpeechRecognition)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [savedChats, setSavedChats] = useState({})
  const [userStatus, setUserStatus] = useState(null)
  const [paymentInfo, setPaymentInfo] = useState(null)
  const [userId] = useState(() => generateUserId())

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
      const data = await res.json()
      setUserStatus(data)
    } catch (e) {}
  }

  const fetchPaymentInfo = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/payment-info`)
      const data = await res.json()
      setPaymentInfo(data)
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
    const msgs = currentMessages
    if (msgs.length === 0) return
    const chatId = activeMode.id + '_' + Date.now()
    const title = activeMode.name + ' — ' + new Date().toLocaleDateString()
    try {
      await fetch(`${BACKEND_URL}/save-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, chat_id: chatId, title, messages: msgs.map(m => ({ role: m.role, content: m.content })) })
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

  const toggleListening = () => {
    if (!recognitionRef.current) return
    if (isListening) { recognitionRef.current.stop(); setIsListening(false) }
    else { setInput(''); recognitionRef.current.start(); setIsListening(true) }
  }

  const speakMessage = (msg) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    if (speakingId === msg.id) { window.speechSynthesis.cancel(); setSpeakingId(null); return }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(msg.content.replace(/[*#_`]/g, ''))
    utterance.onend = () => setSpeakingId(null)
    utterance.onerror = () => setSpeakingId(null)
    window.speechSynthesis.speak(utterance)
    setSpeakingId(msg.id)
  }

  const handleSignIn = () => {
    const name = signInName.trim()
    if (!name) return
    setUser({ name, initial: name.charAt(0).toUpperCase() })
    setShowSignIn(false)
    setSignInName('')
  }

  const buildHistory = (msgs, newUserText) => {
    const history = msgs.map(m => ({ role: m.role, content: m.content }))
    history.push({ role: 'user', content: newUserText })
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
      ? `${text}\n\n[Attached files: ${attachedFiles.map(f => f.name).join(', ')}]`
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
  const handleQuickAction = (prompt) => { setInput(prompt); textareaRef.current?.focus() }
  const handleModeSelect = (mode) => { setActiveMode(mode); setSidebarOpen(false) }

  const displayName = user ? user.name : 'Guest'

  const StatusBar = () => {
    if (!userStatus || userStatus.is_owner) return null
    if (!userStatus.paid && userStatus.trial_used < 2) {
      return (
        <div className="status-bar trial">
          🎯 {2 - userStatus.trial_used} free message{2 - userStatus.trial_used !== 1 ? 's' : ''} remaining
        </div>
      )
    }
    if (userStatus.paid) {
      return (
        <div className="status-bar paid">
          ✨ {userStatus.daily_remaining} messages remaining today
        </div>
      )
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
          <div className="section-label" style={{ padding: '0 8px', marginBottom: '8px' }}>Upload Files</div>
          <div className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}>
            <span className="upload-icon">📂</span>
            <span className="upload-text">Drop files here</span>
            <span className="upload-hint">PDF, Word, Excel, Images</span>
          </div>
          <input ref={fileInputRef} type="file" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
        </div>

        <div style={{ padding: '0 16px 8px' }}>
          <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '10px', gap: '8px' }} onClick={() => { setShowHistory(true); setSidebarOpen(false) }}>
            <HistoryIcon /> Chat History
          </button>
        </div>

        <div className="sidebar-bottom">
          {user ? (
            <div className="user-chip" onClick={() => setUser(null)} style={{ cursor: 'pointer' }} title="Click to sign out">
              <div className="user-avatar">{user.initial}</div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-role">{userStatus?.paid ? '✨ Subscribed' : 'Free trial'}</div>
              </div>
              <div className="online-dot" />
            </div>
          ) : (
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '11px' }} onClick={() => setShowSignIn(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Sign in with Google
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
              <p className="welcome-sub">Ask me anything — exams, letters, relationships, life advice, documents. I will give you straight, honest answers.</p>
              <div className="quick-grid">
                {QUICK_ACTIONS.map((action, i) => (
                  <button key={i} className="quick-card" onClick={() => handleQuickAction(action.prompt)}>
                    <span className="quick-card-icon">{action.icon}</span>
                    <span className="quick-card-title">{action.title}</span>
                    Click to try this
                  </button>
                ))}
              </div>
              <div className="ai-disclaimer">⚠️ Akili is AI and can make mistakes. Always verify important information.</div>
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
                placeholder={isListening ? 'Listening... speak now' : activeMode.placeholder}
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
              <div className="welcome-glow" style={{ width: 56, height: 56, fontSize: 22, marginBottom: 14 }}>A</div>
              <h2 className="modal-title">Upgrade Akili</h2>
              <p className="modal-sub">Get 20 messages per day. Resets every midnight.</p>
            </div>

            <div className="payment-price">
              <span className="price-amount">$5</span>
              <span className="price-period">/ month</span>
            </div>

            <div className="payment-options">
              <div className="payment-option">
                <div className="payment-option-title">📱 M-Pesa / Airtel Money</div>
                <div className="payment-option-body">
                  <p>Send <strong>KSh 650</strong> via Send Money to:</p>
                  <div className="payment-detail-box">
                    {paymentInfo?.mpesa_number || '0795400348'}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: 6 }}>Works for both Safaricom M-Pesa and Airtel Money</p>
                </div>
              </div>

              <div className="payment-option">
                <div className="payment-option-title">💳 PayPal</div>
                <div className="payment-option-body">
                  <p>Send <strong>$5 USD</strong> via PayPal to:</p>
                  <div className="payment-detail-box">
                    {paymentInfo?.paypal_email || 'brianjuma501@gmail.com'}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: 6 }}>Use "Friends & Family" to avoid fees</p>
                </div>
              </div>

              <div className="payment-option">
                <div className="payment-option-title">🌍 International (Global Pay)</div>
                <div className="payment-option-body">
                  <p>Send <strong>$5 USD</strong> directly to M-Pesa:</p>
                  <div className="payment-detail-box">
                    {paymentInfo?.mpesa_number || '0795400348'}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: 6 }}>Works via WorldRemit, Remitly, or Western Union</p>
                </div>
              </div>
            </div>

            <div className="payment-confirm-section">
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 10, textAlign: 'center' }}>
                After paying, tap below to confirm. Your access unlocks within minutes.
              </p>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
                onClick={async () => {
                  try {
                    await fetch(`${BACKEND_URL}/verify-payment`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ user_id: userId, payment_method: 'manual', amount: 5 })
                    })
                    await fetchUserStatus()
                    setShowPayment(false)
                    alert('✅ Payment confirmed! You now have 20 messages per day. Thank you!')
                  } catch (e) { alert('Could not confirm. Please try again.') }
                }}>
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
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>No saved chats yet. Use the save button during a chat.</p>
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

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="modal-overlay" onClick={() => setShowSignIn(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Sign in to Akili</h2>
            <p className="modal-sub">Enter your name to continue.</p>
            <input className="modal-input" placeholder="Your name" value={signInName}
              onChange={e => setSignInName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSignIn()} autoFocus />
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '14px' }} onClick={handleSignIn}>
              Continue
            </button>
            <button className="modal-cancel" onClick={() => setShowSignIn(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}