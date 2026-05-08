import { useState } from 'react'
import Chat from './components/Chat'
import LanguageToggle from './components/LanguageToggle'

export default function App() {
  const [lang, setLang] = useState('Hindi')

  return (
    <div
      className="flex flex-col h-full max-w-lg mx-auto"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FAF5EB 100%)' }}
    >
      {/* Header */}
      <header className="bg-white border-b border-saffron-100 px-4 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-saffron-500 flex items-center justify-center text-xl shadow-sm">
            🧑‍👧
          </div>
          <div>
            <h1 className="font-display font-bold text-saffron-800 text-base leading-tight">
              Padhai Wala
            </h1>
            <p className="text-xs text-gray-500 leading-tight">
              Aapke bachche ka free school saathi
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
