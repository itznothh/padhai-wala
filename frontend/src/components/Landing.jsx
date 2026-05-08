import { useEffect, useRef } from 'react'

const FEATURES = [
  {
    icon: '🤝',
    name: 'Saathi',
    title: 'Your Guide',
    desc: 'Step-by-step companion through every admission and scheme.',
  },
  {
    icon: '🔍',
    name: 'Khoji',
    title: 'School Finder',
    desc: 'Discover government and free schools near you instantly.',
  },
  {
    icon: '📄',
    name: 'Kagzi',
    title: 'Document Helper',
    desc: 'Know exactly which documents you need — no surprises.',
  },
  {
    icon: '⏰',
    name: 'Nazar',
    title: 'Deadline Tracker',
    desc: 'Never miss an application window or scheme deadline.',
  },
]

const STATS = [
  { value: '1000+', label: 'Families helped' },
  { value: '28', label: 'States covered' },
  { value: '100%', label: 'Free to use' },
]

export default function Landing({ onEnter }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('[data-delay]')
    els?.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, parseInt(el.dataset.delay))
    })
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: 'var(--bg-void)' }}
    >
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: 'rgba(247,97,10,0.07)', top: -100, right: -150, animationDelay: '0s' }} />
      <div className="orb" style={{ width: 350, height: 350, background: 'rgba(247,97,10,0.05)', bottom: 200, left: -100, animationDelay: '3s' }} />

      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-5 relative z-10"
        style={{ borderBottom: '1px solid var(--border-dim)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
            style={{ background: 'var(--orange-glow)', boxShadow: '0 0 20px rgba(247,97,10,0.4)' }}
          >
            🧑‍👧
          </div>
          <span className="font-display font-700 text-white text-base tracking-tight">PathGuide AI</span>
        </div>
        <button
          onClick={onEnter}
          className="text-sm font-medium px-4 py-2 rounded-full transition-all"
          style={{
            border: '1px solid var(--orange-border)',
            color: 'var(--orange-soft)',
            background: 'var(--orange-muted)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(247,97,10,0.2)'
            e.currentTarget.style.borderColor = 'var(--orange-glow)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--orange-muted)'
            e.currentTarget.style.borderColor = 'var(--orange-border)'
          }}
        >
          Open Chat →
        </button>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="flex flex-col items-center text-center px-6 pt-20 pb-16 relative z-10 max-w-2xl mx-auto w-full">
        {/* Badge */}
        <div
          data-delay="100"
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-8"
          style={{
            background: 'var(--orange-muted)',
            border: '1px solid var(--orange-border)',
            color: 'var(--orange-soft)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" style={{ boxShadow: '0 0 6px var(--orange-glow)' }} />
          Free · AI-powered · Made for India
        </div>

        {/* Headline */}
        <h1
          data-delay="200"
          className="font-display font-800 leading-none mb-5"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 4rem)', letterSpacing: '-0.03em' }}
        >
          Every child deserves{' '}
          <span className="shimmer-text">the right school.</span>
        </h1>

        <p
          data-delay="350"
          className="text-base leading-relaxed mb-10 max-w-md"
          style={{ color: 'var(--text-secondary)' }}
        >
          PathGuide AI helps Indian parents navigate government schools,
          RTE quotas, and free schemes — in Hindi or English, completely free.
        </p>

        {/* CTA */}
        <div data-delay="500" className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={onEnter}
            className="relative px-7 py-3.5 rounded-2xl text-sm font-medium text-white transition-all overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, var(--orange-glow), var(--orange-deep))', boxShadow: '0 0 30px rgba(247,97,10,0.35)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(247,97,10,0.55)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(247,97,10,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Start for free — find your school
          </button>
          <button
            className="px-7 py-3.5 rounded-2xl text-sm font-medium transition-all"
            style={{ border: '1px solid var(--border-mid)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange-border)'; e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            onClick={onEnter}
          >
            हिंदी में बात करें
          </button>
        </div>

        {/* Stats */}
        <div data-delay="700" className="flex items-center gap-8 mt-14">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display font-700 text-xl" style={{ color: 'var(--orange-soft)' }}>{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Chat preview mockup */}
      <section className="px-6 pb-16 max-w-lg mx-auto w-full relative z-10">
        <div
          className="rounded-3xl overflow-hidden"
          style={{ border: '1px solid var(--border-mid)', background: 'var(--bg-surface)', boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(247,97,10,0.05)' }}
        >
          {/* Mock header */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--border-dim)' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-red-700/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-700/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-700/70" />
            <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>PathGuide AI</span>
          </div>
          {/* Mock chat */}
          <div className="p-4 space-y-3 text-sm">
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-700 flex-shrink-0" style={{ background: 'var(--orange-glow)', color: 'white' }}>G</div>
              <div className="bubble-bot">
                Namaste! 🙏 Tell me your child's age and I'll find the best free school options near you.
              </div>
            </div>
            <div className="bubble-user" style={{ maxWidth: '60%' }}>My son is 6 years old</div>
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-700 flex-shrink-0" style={{ background: 'var(--orange-glow)', color: 'white' }}>G</div>
              <div className="bubble-bot">
                Perfect age for <strong>RTE admission</strong> 🎉 Under Right to Education Act, 25% seats in private schools are <strong>free</strong>. Which city are you in?
              </div>
            </div>
            {/* Typing indicator */}
            <div className="flex gap-2 items-center pl-9">
              <div className="dot-pulse px-4 py-3 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-mid)' }}>
                <span /><span /><span />
              </div>
            </div>
          </div>
          {/* Mock input */}
          <div className="px-4 py-3" style={{ borderTop: '1px solid var(--border-dim)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-mid)' }}>
              <span className="text-xs flex-1" style={{ color: 'var(--text-muted)' }}>Type your question…</span>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: 'var(--orange-glow)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-20 max-w-2xl mx-auto w-full relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs font-display font-600 tracking-widest uppercase mb-3" style={{ color: 'var(--orange-glow)' }}>
            Our AI Agents
          </p>
          <h2 className="font-display font-700 text-2xl" style={{ letterSpacing: '-0.02em' }}>
            Four agents, one mission
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl transition-all cursor-default"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-dim)',
                animationDelay: `${i * 80}ms`
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange-border)'; e.currentTarget.style.background = 'var(--bg-raised)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dim)'; e.currentTarget.style.background = 'var(--bg-surface)' }}
            >
              <div className="text-xl mb-3">{f.icon}</div>
              <div className="font-display font-700 text-sm mb-0.5" style={{ color: 'var(--orange-soft)' }}>{f.name}</div>
              <div className="font-medium text-xs mb-1.5" style={{ color: 'var(--text-primary)' }}>{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 pb-16 max-w-lg mx-auto w-full text-center relative z-10">
        <div
          className="rounded-3xl px-8 py-10"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--orange-border)' }}
        >
          <div className="text-3xl mb-4">🧑‍👧</div>
          <h3 className="font-display font-700 text-xl mb-2" style={{ letterSpacing: '-0.02em' }}>
            Your child's future starts here
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Free. Private. Available 24/7 in Hindi and English.
          </p>
          <button
            onClick={onEnter}
            className="px-8 py-3.5 rounded-2xl text-sm font-medium text-white transition-all"
            style={{ background: 'linear-gradient(135deg, var(--orange-glow), var(--orange-deep))', boxShadow: '0 0 30px rgba(247,97,10,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(247,97,10,0.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(247,97,10,0.3)'}
          >
            Begin your journey →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-8 text-xs relative z-10" style={{ color: 'var(--text-muted)' }}>
        PathGuide AI · Free school guidance · Made with ❤️ for India
      </footer>
    </div>
  )
}
