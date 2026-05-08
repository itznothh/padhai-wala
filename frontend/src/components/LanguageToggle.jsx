export default function LanguageToggle({ lang, onChange }) {
  return (
    <div
      className="flex items-center gap-0.5 rounded-full p-0.5"
      style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-mid)' }}
    >
      {['Hindi', 'English'].map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className="text-xs px-3 py-1 rounded-full transition-all font-medium"
          style={
            lang === l
              ? { background: 'var(--orange-glow)', color: '#fff', boxShadow: '0 0 12px rgba(247,97,10,0.4)' }
              : { color: 'var(--text-secondary)', background: 'transparent' }
          }
        >
          {l === 'Hindi' ? 'हिंदी' : 'Eng'}
        </button>
      ))}
    </div>
  )
}
