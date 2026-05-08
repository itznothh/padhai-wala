export default function LanguageToggle({ lang, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-saffron-50 rounded-full p-0.5 border border-saffron-200">
      {['Hindi', 'English'].map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`text-xs px-3 py-1 rounded-full transition-all font-medium ${
            lang === l
              ? 'bg-saffron-500 text-white shadow-sm'
              : 'text-saffron-600 hover:bg-saffron-100'
          }`}
        >
          {l === 'Hindi' ? 'हिंदी' : 'Eng'}
        </button>
      ))}
    </div>
  )
}
