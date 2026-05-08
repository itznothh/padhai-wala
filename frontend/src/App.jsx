import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './components/Landing'
import Chat from './components/Chat'
import LanguageToggle from './components/LanguageToggle'

function ChatPage({ lang, setLang }) {
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col h-full w-full max-w-2xl mx-auto"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FAF5EB 100%)' }}
    >
      {/* Header */}
      <header className="bg-white border-b border-saffron-100 px-4 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-saffron-500 hover:bg-saffron-50 transition-colors"
            aria-label="Back to home"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>
          <div className="w-10 h-10 rounded-2xl bg-saffron-500 flex items-center justify-center text-xl shadow-sm">
            🧑‍👧
          </div>
          <div>
            <h1 className="font-display font-bold text-saffron-800 text-base leading-tight">
              PathGuide AI
            </h1>
            <p className="text-xs text-gray-500 leading-tight">
              Navigating the future of learning
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400">Online</span>
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
