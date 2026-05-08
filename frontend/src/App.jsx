import { useState } from 'react'
import Landing from './components/Landing'
import Chat from './components/Chat'
import LanguageToggle from './components/LanguageToggle'

export default function App() {
  const [page, setPage] = useState('landing') // 'landing' | 'chat'
  const [lang, setLang] = useState('Hindi')

  if (page === 'landing') {
    return <Landing onEnter={() => setPage('chat')} />
  }

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto" style={{ background: 'var(--bg-void)' }}>

      {/* Header */}
      <header
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-dim)' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage('landing')}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all"
            style={{ background: 'var(--orange-muted)', border: '1px solid var(--orange-border)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(247,97,10,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--orange-muted)'}
            title="Back to home"
          >
            🧑‍👧
          </button>
          <div>
            <h1 className="font-display font-700 text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>
              PathGuide AI
            </h1>
            <p className="text-xs leading-tight" style={{ color: 'var(--text-muted)' }}>
              Navigating the future of learning
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#4ADE80', boxShadow: '0 0 6px rgba(74,222,128,0.6)' }}
            />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Online</span>
          </div>
          <LanguageToggle lang={lang} onChange={setLang} />
        </div>
      </header>

      {/* Agent chips */}
      <div
        className="px-3 py-2 flex gap-2 overflow-x-auto flex-shrink-0"
        style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-dim)' }}
      >
        {[
          { emoji: '🤝', name: 'Saathi', desc: 'Guide' },
          { emoji: '🔍', name: 'Khoji', desc: 'Schools' },
          { emoji: '📄', name: 'Kagzi', desc: 'Docs' },
          { emoji: '⏰', name: 'Nazar', desc: 'Deadlines' },
        ].map(a => (
          <div
            key={a.name}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 flex-shrink-0 cursor-default"
            style={{ background: 'var(--orange-muted)', border: '1px solid var(--orange-border)' }}
          >
            <span className="text-xs">{a.emoji}</span>
            <span className="text-xs font-medium" style={{ color: 'var(--orange-soft)' }}>{a.name}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{a.desc}</span>
          </div>
        ))}
      </div>

      {/* Chat */}
      <Chat lang={lang} />
    </div>
  )
}
