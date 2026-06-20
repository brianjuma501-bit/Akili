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

const MODES = [
  {
    id: 'teacher',
    emoji: '🎓',
    name: 'Teacher Mode',
    desc: 'Explain anything simply',
    systemPrompt: `You are Akili in Teacher Mode. You explain concepts in simple, clear language anyone can understand — like a patient friendly teacher. Break complex ideas into small steps. When solving math or calculations, show your working step by step clearly. Use real-life examples. If someone uses slang or informal language, respond naturally in a similar tone while still being helpful. Always be encouraging. Never teach anything illegal or immoral.`,
    placeholder: 'Ask me to explain anything... "explain photosynthesis like I am 10"',
    welcome: 'Ready to explain anything! Ask me in any language or slang — I understand you.'
  },
  {
    id: 'analyst',
    emoji: '🔍',
    name: 'Analyst Mode',
    desc: 'Break down documents & data',
    systemPrompt: `You are Akili in Analyst Mode. You analyze documents, reports, contracts, data, and research papers deeply. You identify key findings, red flags, important clauses, trends, and insights. Present findings clearly. Never assist with anything illegal.`,
    placeholder: 'Paste a document, contract, or report to analyze...',
    welcome: 'Paste any document, contract, report, or research — I will break it down for you.'
  },
  {
    id: 'logic',
    emoji: '🧠',
    name: 'Logic Mode',
    desc: 'Sharpen your reasoning',
    systemPrompt: `You are Akili in Logic Mode. You help users think clearly and critically. You identify logical fallacies, weak arguments, and flawed reasoning. You can debate ideas and help users strengthen their arguments. Never help with misleading reasoning for harmful purposes.`,
    placeholder: 'Give me an argument to analyze, or a reasoning puzzle...',
    welcome: 'Give me an argument to dissect or challenge me with a logic puzzle!'
  },
  {
    id: 'mentor',
    emoji: '🧭',
    name: 'Mentor Mode',
    desc: 'Learning roadmaps & growth',
    systemPrompt: `You are Akili in Mentor Mode. You are a career coach, life mentor, and skill development guide. You create personalized learning roadmaps, give study tips, recommend resources, and help users set realistic goals. Be empathetic, motivating, and practical. Never give advice that encourages harmful or illegal behavior.`,
    placeholder: 'Tell me your goals or what skill you want to develop...',
    welcome: 'Tell me your goals — I will help you create a roadmap to get there.'
  },
  {
    id: 'research',
    emoji: '📡',
    name: 'Research Mode',
    desc: 'Deep research & synthesis',
    systemPrompt: `You are Akili in Research Mode. You synthesize information, compare sources, identify patterns, summarize research, and help users understand complex topics. You are thorough and note when something needs verification. Never fabricate facts.`,
    placeholder: 'What topic do you want to research deeply?',
    welcome: 'What would you like to research? Give me a topic and I will go deep on it.'
  }
]

const QUICK_ACTIONS = [
  { icon: '📄', title: 'Summarize a document', prompt: 'Can you help me summarize a document? I will paste the content below.' },
  { icon: '📝', title: 'Generate quiz questions', prompt: 'Generate 5 quiz questions from this topic: Introduction to Accounting and Finance.' },
  { icon: '🌍', title: 'Translate content', prompt: 'Translate this to Swahili: "Knowledge is power and the key to a better future."' },
  { icon: '🗺️', title: 'Create a learning roadmap', prompt: 'Create a 3-month learning roadmap for a university student.' }
]

const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const fileIcon = (name) => {
  const ext = name.split('.').pop().toLowerCase()
  const map = { pdf: '📄', doc: '📝', docx: '📝', xls: '📊', xlsx: '📊', ppt: '📑', pptx: '📑', jpg: '🖼️', jpeg: '🖼️', png: '🖼️', txt: '📃' }
  return map[ext] || '📁'
}

const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null

const BACKEND_URL = 'https://akili-backend.onrender.com'

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
  const [voiceSupported, setVoiceSupported] = useState(!!SpeechRecognition)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const chatEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)
  const recognitionRef = useRef(null)

  const currentMessages = messages[activeMode.id] || []

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    const ta = textareaRef.current
    if (ta) { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px' }
  }, [input])

  useEffect(() => {
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setInput(transcript)
    }
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognitionRef.current = recognition
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) return
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setInput('')
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const speakMessage = (msg) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    if (speakingId === msg.id) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
      return
    }

    window.speechSynthesis.cancel()
    const cleanText = msg.content.replace(/[*#_`]/g, '')
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 1
    utterance.pitch = 1
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

  const handleSignOut = () => setUser(null)

  const buildHistory = (msgs, newUserText) => {
    const history = msgs.map(m => ({ role: m.role, content: m.content }))
    history.push({ role: 'user', content: newUserText })
    return history
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text && attachedFiles.length === 0) return

    const userContent = attachedFiles.length > 0
      ? `${text}\n\n[Attached files: ${attachedFiles.map(f => f.name).join(', ')}]\n\nNote: Please paste the text content of your file and I will analyze it.`
      : text

    const userMsg = { id: Date.now(), role: 'user', content: userContent, time: new Date() }
    const prevMsgs = messages[activeMode.id] || []
    const updatedMsgs = [...prevMsgs, userMsg]

    setMessages(prev => ({ ...prev, [activeMode.id]: updatedMsgs }))
    setInput('')
    setAttachedFiles([])
    setLoading(true)

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: activeMode.systemPrompt,
          messages: buildHistory(prevMsgs, userContent)
        })
      })

      const data = await response.json()
      const aiText = data.reply || data.error || 'Something went wrong. Please try again.'
      const aiMsg = { id: Date.now() + 1, role: 'assistant', content: aiText, time: new Date() }
      setMessages(prev => ({ ...prev, [activeMode.id]: [...(prev[activeMode.id] || []), aiMsg] }))
    } catch (err) {
      const errMsg = { id: Date.now() + 1, role: 'assistant', content: '⚠️ Could not connect to the Akili backend. Please try again in a moment.', time: new Date() }
      setMessages(prev => ({ ...prev, [activeMode.id]: [...(prev[activeMode.id] || []), errMsg] }))
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(f => ({ name: f.name, size: f.size, file: f }))
    setAttachedFiles(prev => [...prev, ...newFiles])
  }

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const removeFile = (idx) => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))
  const clearChat = () => {
    setMessages(prev => ({ ...prev, [activeMode.id]: [] }))
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
    setSpeakingId(null)
  }
  const handleQuickAction = (prompt) => { setInput(prompt); textareaRef.current?.focus() }
  const handleModeSelect = (mode) => { setActiveMode(mode); setSidebarOpen(false) }

  const displayName = user ? user.name : 'Guest'

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
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <CloseIcon />
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

        <div style={{ padding: '0 16px 16px' }}>
          <div className="section-label" style={{ padding: '0 8px', marginBottom: '8px' }}>Upload Files</div>
          <div
            className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="upload-icon">📂</span>
            <span className="upload-text">Drop files here</span>
            <span className="upload-hint">PDF, Word, Excel, Images</span>
          </div>
          <input ref={fileInputRef} type="file" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
        </div>

        <div className="sidebar-bottom">
          {user ? (
            <div className="user-chip" onClick={handleSignOut} style={{ cursor: 'pointer' }} title="Click to sign out">
              <div className="user-avatar">{user.initial}</div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-role">Signed in with Google</div>
              </div>
              <div className="online-dot" />
            </div>
          ) : (
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', padding: '11px' }} onClick={() => setShowSignIn(true)}>
              <GoogleIcon /> Sign in with Google
            </button>
          )}
          <div className="creator-credit">Created by <span>Brian Juma</span></div>
        </div>
      </aside>

      <main className="main-area">
        <div className="topbar">
          <div className="topbar-left">
            <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </button>
            <div>
              <div className="topbar-title">{activeMode.emoji} {activeMode.name}</div>
              <div className="topbar-subtitle">{activeMode.welcome}</div>
            </div>
          </div>
          <div className="topbar-actions">
            {currentMessages.length > 0 && (
              <button className="btn-ghost" onClick={clearChat}><TrashIcon /> <span className="btn-text">Clear chat</span></button>
            )}
            <button className="btn-primary" onClick={() => fileInputRef.current?.click()}><PlusIcon /> <span className="btn-text">Upload</span></button>
          </div>
        </div>

        <div className="chat-area">
          {currentMessages.length === 0 ? (
            <div className="welcome-screen">
              <div className="welcome-glow">A</div>
              <h1 className="welcome-title">Hello, <span>{displayName}</span> 👋</h1>
              <p className="welcome-sub">Welcome to Akili — your personal AI knowledge companion. Choose a mode, upload files, or speak/type in any language.</p>
              <div className="quick-grid">
                {QUICK_ACTIONS.map((action, i) => (
                  <button key={i} className="quick-card" onClick={() => handleQuickAction(action.prompt)}>
                    <span className="quick-card-icon">{action.icon}</span>
                    <span className="quick-card-title">{action.title}</span>
                    Click to try this
                  </button>
                ))}
              </div>
              <div className="ai-disclaimer">⚠️ Akili is AI and can make mistakes. Please double-check important information.</div>
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
                        <button
                          className={`speak-btn ${speakingId === msg.id ? 'speaking' : ''}`}
                          onClick={() => speakMessage(msg)}
                          title={speakingId === msg.id ? 'Stop speaking' : 'Listen to this reply'}
                        >
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

        {currentMessages.length > 0 && (
          <div className="ai-disclaimer-bar">⚠️ Akili is AI and can make mistakes. Please double-check important information.</div>
        )}

        {attachedFiles.length > 0 && (
          <div className="file-chips">
            {attachedFiles.map((f, i) => (
              <div key={i} className="file-chip">
                <span>{fileIcon(f.name)}</span>
                {f.name}
                <button className="file-chip-remove" onClick={() => removeFile(i)}>×</button>
              </div>
            ))}
          </div>
        )}

        <div className="input-bar-wrap">
          <div className="input-bar">
            <div className="input-row">
              <textarea
                ref={textareaRef}
                className="chat-input"
                placeholder={isListening ? 'Listening... speak now' : activeMode.placeholder}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <div className="input-actions">
                {voiceSupported && (
                  <button
                    className={`icon-btn ${isListening ? 'mic-active' : ''}`}
                    title={isListening ? 'Stop listening' : 'Speak to Akili'}
                    onClick={toggleListening}
                  >
                    <MicIcon />
                  </button>
                )}
                <button className="icon-btn" onClick={() => fileInputRef.current?.click()}><PaperclipIcon /></button>
                <button className="send-btn" onClick={handleSend} disabled={loading || (!input.trim() && attachedFiles.length === 0)}><SendIcon /></button>
              </div>
            </div>
            <div className="input-footer">
              <span className="input-hint">Enter to send · Shift+Enter for new line</span>
              <span className="lang-badge"><GlobeIcon /> <span className="btn-text">Understands all languages & slang</span></span>
            </div>
          </div>
        </div>
      </main>

      {showSignIn && (
        <div className="modal-overlay" onClick={() => setShowSignIn(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-icon"><GoogleIcon /></div>
            <h2 className="modal-title">Sign in to Akili</h2>
            <p className="modal-sub">Enter your name to continue. (Full Google sign-in will be connected soon.)</p>
            <input
              className="modal-input"
              placeholder="Your name"
              value={signInName}
              onChange={e => setSignInName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSignIn()}
              autoFocus
            />
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