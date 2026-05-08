export default function LanguageToggle({ lang, onChange }) {
  const LANGS = [
    { id: 'Hindi',   label: 'हिंदी' },
    { id: 'English', label: 'Eng'   },
    { id: 'Kannada', label: 'ಕನ್ನಡ' },
  ]

  return (
    <div
      className="flex items-center gap-0.5 rounded-full p-0.5"
      style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-mid)' }}
    >
      {LANGS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className="text-xs px-2.5 py-1 rounded-full transition-all font-medium whitespace-nowrap"
          style={
            lang === id
              ? { background: 'var(--orange-glow)', color: '#fff', boxShadow: '0 0 12px rgba(247,97,10,0.4)' }
              : { color: 'var(--text-secondary)', background: 'transparent' }
          }
        >
          {label}
        </button>
      ))}
    </div>
  )
}