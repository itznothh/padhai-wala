import { useEffect, useRef } from 'react'

function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^[-•] (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
}

function LoadingDots() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <Avatar />
      <div
        className="dot-pulse px-4 py-3 rounded-2xl"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-mid)' }}
      >
        <span /><span /><span />
      </div>
    </div>
  )
}

export default function Message({ role, text, loading, isNew }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isNew && ref.current) {
      ref.current.classList.add('animate-slide-up')
    }
  }, [isNew])

  if (loading) return <LoadingDots />

  const isUser = role === 'user'

  return (
    <div
      ref={ref}
      className={`flex items-end gap-2 mb-3 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {!isUser && <Avatar />}
      <div className={isUser ? 'bubble-user' : 'bubble-bot'}>
        {isUser ? (
          <p className="m-0 whitespace-pre-wrap">{text}</p>
        ) : (
          <div
            className="bot-prose"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }}
          />
        )}
      </div>
    </div>
  )
}

function Avatar() {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold flex-shrink-0"
      style={{ background: 'var(--orange-glow)', color: '#fff', boxShadow: '0 0 12px rgba(247,97,10,0.35)' }}
    >
      G
    </div>
  )
}
