import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './components/Landing'
import Chat from './components/Chat'
import LanguageToggle from './components/LanguageToggle'

function ChatPage({ lang, setLang }) {
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col h-full max-w-lg mx-auto"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FAF5EB 100%)' }}
    >
      {/* Header */}
      <header className="bg-white border-b border-saffron-100 px-4 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Back button */}
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

      {/* Agent chips */}
      <div className="bg-white border-b border-saffron-50 px-3 py-2 flex gap-2 overflow-x-auto flex-shrink-0">
        {[
          { emoji: '🤝', name: 'Saathi', desc: 'Guide' },
          { emoji: '🔍', name: 'Khoji', desc: 'Schools' },
          { emoji: '📄', name: 'Kagzi', desc: 'Docs' },
          { emoji: '⏰', name: 'Nazar', desc: 'Deadlines' },
        ].map(a => (
          <div key={a.name} className="flex items-center gap-1.5 bg-saffron-50 border border-saffron-100 rounded-full px-2.5 py-1 flex-shrink-0">
            <span className="text-xs">{a.emoji}</span>
            <span className="text-xs font-medium text-saffron-700">{a.name}</span>
            <span className="text-xs text-gray-400">{a.desc}</span>
          </div>
        ))}
      </div>

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
