import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './components/Landing'
import Chat from './components/Chat'
import LanguageToggle from './components/LanguageToggle'
import Logo from './components/Logo'

function ChatPage({ lang, setLang }) {
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col h-full w-full max-w-2xl mx-auto"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FAF5EB 100%)' }}
    >
      {/* Header */}
      <header
        className="px-5 py-3 flex items-center justify-between flex-shrink-0 sticky top-0 z-10 w-full"
        style={{
          background: 'rgba(15, 10, 5, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(251, 146, 60, 0.25)',
          boxShadow: '0 1px 30px rgba(251, 146, 60, 0.08)',
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-orange-400 hover:bg-white/10 transition-colors"
            aria-label="Back to home"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>

          {/* Logo replaces emoji avatar */}
          <Logo size={40} className="rounded-2xl shadow-sm" />

          <div>
            <h1 className="font-display font-bold text-orange-300 text-base leading-tight">
              PathGuide AI
            </h1>
            <p className="text-xs leading-tight" style={{ color: 'rgba(254, 215, 170, 0.5)' }}>
              Navigating the future of learning
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs" style={{ color: 'rgba(254, 215, 170, 0.4)' }}>Online</span>
          </div>
          <LanguageToggle lang={lang} onChange={setLang} />
        </div>
      </header>

      {/* Chat */}
      <Chat lang={lang} />
    </div>
  )
}

export default function App() {
  const [lang, setLang] = useState('English')
  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<Landing onEnter={() => navigate('/chat')} />} />
      <Route path="/chat" element={<ChatPage lang={lang} setLang={setLang} />} />
    </Routes>
  )
}