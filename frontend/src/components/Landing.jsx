import { useEffect, useRef } from 'react'
import Logo from './Logo'

// ── Data ────────────────────────────────────────────────────────────────────

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
  { value: '28',    label: 'States covered'  },
  { value: '100%',  label: 'Free to use'     },
]

const PROMPT_CHIPS = [
  'My child is 6 years old',
  'Which documents are needed?',
  'Explain RTE quota',
  'Find free schools near me',
  'What is Samagra Shiksha?',
  'Admission deadline for class 1',
]

const PAIN_CARDS = [
  {
    icon: '📋',
    problem: 'Document confusion',
    solve: 'We tell you exactly which documents are needed — in plain language, no guesswork.',
  },
  {
    icon: '⏳',
    problem: 'Missed deadlines',
    solve: 'AI tracks every admission window and scheme deadline so you never miss a date.',
  },
  {
    icon: '💸',
    problem: 'Expensive private schools',
    solve: 'We surface RTE quota seats and government-funded schools near you, completely free.',
  },
  {
    icon: '🗺️',
    problem: 'No one to guide you',
    solve: 'PathGuide walks you through every step — like a knowledgeable friend, always available.',
  },
  {
    icon: '📖',
    problem: 'RTE Act is confusing',
    solve: 'We explain your legal rights in simple Hindi or English so you can act with confidence.',
  },
  {
    icon: '🏫',
    problem: 'Don\'t know which school is right',
    solve: 'AI matches your child\'s age, location, and needs to the best available options.',
  },
]

const HOW_STEPS = [
  {
    n: '01',
    title: 'Share child details',
    desc: 'Tell us your child\'s age, class, and city. Takes under a minute.',
  },
  {
    n: '02',
    title: 'AI finds schools & schemes',
    desc: 'We scan government schools, RTE seats, and free schemes in your area.',
  },
  {
    n: '03',
    title: 'Get a clear action plan',
    desc: 'Documents list, deadlines, and step-by-step guidance — all in one place.',
  },
]

const TRUST_ITEMS = [
  { icon: '🔓', label: 'No signup required'         },
  { icon: '₹0', label: 'Always free'                },
  { icon: '🗣️', label: 'Hindi, English & Kannada'   },
  { icon: '🏛️', label: 'Government schemes included' },
  { icon: '🔒', label: 'Private & secure'            },
  { icon: '📱', label: 'Works on any device'         },
]

// ── Component ────────────────────────────────────────────────────────────────

export default function Landing({ onEnter, onChipClick }) {
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

  const handleChip = (text) => {
    if (onChipClick) onChipClick(text)
    else onEnter()
  }

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: 'var(--bg-void)' }}
    >
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 600, height: 600, background: 'rgba(247,97,10,0.08)', top: -150, right: -200, animationDelay: '0s' }} />
      <div className="orb" style={{ width: 400, height: 400, background: 'rgba(247,97,10,0.05)', bottom: 300, left: -120, animationDelay: '3s' }} />
      <div className="orb" style={{ width: 250, height: 250, background: 'rgba(247,97,10,0.04)', top: '40%', left: '50%', animationDelay: '1.5s' }} />

      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 py-5 relative z-10"
        style={{ borderBottom: '1px solid var(--border-dim)' }}
      >
        <div className="flex items-center gap-2.5">
          <Logo size={32} />
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
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(247,97,10,0.2)'; e.currentTarget.style.borderColor = 'var(--orange-glow)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--orange-muted)'; e.currentTarget.style.borderColor = 'var(--orange-border)' }}
        >
          Open Chat →
        </button>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="flex flex-col items-center text-center px-6 pt-24 pb-16 relative z-10 max-w-3xl mx-auto w-full">
        <div
          data-delay="100"
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-10"
          style={{ background: 'var(--orange-muted)', border: '1px solid var(--orange-border)', color: 'var(--orange-soft)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" style={{ boxShadow: '0 0 6px var(--orange-glow)' }} />
          Free · AI-powered · Made for India
        </div>

        <h1
          data-delay="200"
          className="font-display font-800 leading-none mb-6"
          style={{ fontSize: 'clamp(2.6rem, 8vw, 4.5rem)', letterSpacing: '-0.03em' }}
        >
          Every child deserves{' '}
          <span className="shimmer-text">the right school.</span>
        </h1>

        <p
          data-delay="350"
          className="text-base leading-relaxed mb-10 max-w-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          PathGuide AI helps Indian parents navigate government schools,
          RTE quotas, and free schemes — in Hindi, English, or Kannada, completely free.
        </p>

        {/* CTA — single primary button */}
        <div data-delay="500">
          <button
            onClick={onEnter}
            className="relative px-8 py-4 rounded-2xl text-sm font-medium text-white transition-all overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--orange-glow), var(--orange-deep))', boxShadow: '0 0 30px rgba(247,97,10,0.35)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 50px rgba(247,97,10,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(247,97,10,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Find your child's school — free →
          </button>
        </div>

        <div data-delay="700" className="flex items-center gap-10 mt-14">
          {STATS.map((s, i) => (
            <div key={i} className="text-center relative">
              {i > 0 && (
                <span className="absolute -left-5 top-1/2 -translate-y-1/2 h-6 w-px" style={{ background: 'var(--border-mid)' }} />
              )}
              <div className="font-display font-700 text-2xl" style={{ color: 'var(--orange-soft)' }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 1 — Prompt chips ─────────────────────────────────────── */}
      <section className="px-6 pb-20 max-w-2xl mx-auto w-full relative z-10">
        <p className="text-xs text-center mb-5 tracking-wide" style={{ color: 'var(--text-muted)' }}>
          People ask us things like…
        </p>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {PROMPT_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChip(chip)}
              className="text-xs px-4 py-2 rounded-full transition-all"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-mid)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--orange-border)'
                e.currentTarget.style.color = 'var(--orange-soft)'
                e.currentTarget.style.background = 'var(--bg-raised)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-mid)'
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'var(--bg-surface)'
              }}
            >
              "{chip}"
            </button>
          ))}
        </div>
      </section>

      {/* ── Chat preview mockup ───────────────────────────────────────────── */}
      <section className="px-6 pb-20 max-w-xl mx-auto w-full relative z-10">
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(247,97,10,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }}
        />
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            border: '1px solid var(--border-mid)',
            background: 'var(--bg-surface)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(247,97,10,0.08), inset 0 1px 0 rgba(255,255,255,0.04)'
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--border-dim)' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-red-700/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-700/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-700/70" />
            <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>PathGuide AI</span>
          </div>
          <div className="p-5 space-y-4 text-sm">
            <div className="flex gap-2 items-end">
              <Logo size={28} className="flex-shrink-0 rounded-full" />
              <div className="bubble-bot">
                Namaste! 🙏 Tell me your child's age and I'll find the best free school options near you.
              </div>
            </div>
            <div className="bubble-user" style={{ maxWidth: '60%' }}>My son is 6 years old</div>
            <div className="flex gap-2 items-end">
              <Logo size={28} className="flex-shrink-0 rounded-full" />
              <div className="bubble-bot">
                Perfect age for <strong>RTE admission</strong> 🎉 Under Right to Education Act, 25% seats in private schools are <strong>free</strong>. Which city are you in?
              </div>
            </div>
            <div className="flex gap-2 items-center pl-9">
              <div className="dot-pulse px-4 py-3 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-mid)' }}>
                <span /><span /><span />
              </div>
            </div>
          </div>
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

      {/* ── SECTION 2 — Problems we solve ────────────────────────────────── */}
      <section className="px-6 pb-24 max-w-2xl mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs font-display font-600 tracking-widest uppercase mb-3" style={{ color: 'var(--orange-glow)' }}>
            Built for real challenges
          </p>
          <h2 className="font-display font-700 text-3xl" style={{ letterSpacing: '-0.02em' }}>
            We know what parents go through
          </h2>
          <p className="text-sm mt-3 max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
            Admission season is stressful. PathGuide is designed around the real problems families face.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PAIN_CARDS.map((c, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl transition-all"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-dim)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange-border)'; e.currentTarget.style.background = 'var(--bg-raised)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dim)'; e.currentTarget.style.background = 'var(--bg-surface)' }}
            >
              <div className="text-xl mb-3">{c.icon}</div>
              <div className="font-medium text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{c.problem}</div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{c.solve}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3 — How it works ──────────────────────────────────────── */}
      <section className="px-6 pb-24 max-w-2xl mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs font-display font-600 tracking-widest uppercase mb-3" style={{ color: 'var(--orange-glow)' }}>
            Simple process
          </p>
          <h2 className="font-display font-700 text-3xl" style={{ letterSpacing: '-0.02em' }}>
            How it works
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-stretch">
          {HOW_STEPS.map((s, i) => (
            <div key={i} className="flex sm:flex-col flex-1 items-start sm:items-center gap-4 sm:gap-0 sm:text-center relative">
              {/* connector line (desktop only) */}
              {i < HOW_STEPS.length - 1 && (
                <div
                  className="hidden sm:block absolute top-5 left-1/2 w-full h-px"
                  style={{ background: 'var(--border-dim)' }}
                />
              )}
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-display font-700 flex-shrink-0 relative z-10"
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--orange-border)', color: 'var(--orange-soft)' }}
              >
                {s.n}
              </div>
              <div className="sm:mt-5 sm:px-4">
                <div className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{s.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4 — Trust indicators ─────────────────────────────────── */}
      <section className="px-6 pb-24 max-w-2xl mx-auto w-full relative z-10">
        <div
          className="rounded-2xl px-8 py-8"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-dim)' }}
        >
          <p className="text-xs text-center mb-6 tracking-wide" style={{ color: 'var(--text-muted)' }}>
            Designed with families in mind
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TRUST_ITEMS.map((t, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="text-base">{t.icon}</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — Features (renamed) ───────────────────────────────── */}
      <section className="px-6 pb-24 max-w-2xl mx-auto w-full relative z-10">
        <div className="text-center mb-12">
          <p className="text-xs font-display font-600 tracking-widest uppercase mb-3" style={{ color: 'var(--orange-glow)' }}>
            All-in-one
          </p>
          <h2 className="font-display font-700 text-3xl" style={{ letterSpacing: '-0.02em' }}>
            Everything you need for admissions
          </h2>
          <p className="text-sm mt-3 max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
            From finding the right school to submitting documents — we've got every step covered.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl transition-all cursor-default"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-dim)', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange-border)'; e.currentTarget.style.background = 'var(--bg-raised)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(247,97,10,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dim)'; e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.3)' }}
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="font-display font-700 text-sm mb-0.5" style={{ color: 'var(--orange-soft)' }}>{f.name}</div>
              <div className="font-medium text-xs mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 max-w-lg mx-auto w-full text-center relative z-10">
        <div
          className="rounded-3xl px-8 py-12"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--orange-border)', boxShadow: '0 0 60px rgba(247,97,10,0.08), inset 0 1px 0 rgba(255,255,255,0.04)' }}
        >
          <div className="flex justify-center mb-5">
            <Logo size={56} />
          </div>
          <h3 className="font-display font-700 text-2xl mb-3" style={{ letterSpacing: '-0.02em' }}>
            Your child's future starts here
          </h3>
          <p className="text-sm mb-8 max-w-xs mx-auto" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Free. Private. Available 24/7 in Hindi, English, and Kannada.
          </p>
          <button
            onClick={onEnter}
            className="px-10 py-4 rounded-2xl text-sm font-medium text-white transition-all"
            style={{ background: 'linear-gradient(135deg, var(--orange-glow), var(--orange-deep))', boxShadow: '0 0 30px rgba(247,97,10,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 50px rgba(247,97,10,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(247,97,10,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Begin your journey →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pb-10 text-xs relative z-10" style={{ color: 'var(--text-muted)' }}>
        PathGuide AI · Free school guidance · Made with ❤️ for India
      </footer>
    </div>
  )
}