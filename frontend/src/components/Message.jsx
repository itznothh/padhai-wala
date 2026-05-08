import { useEffect, useRef } from 'react'

function parseMarkdown(text) {
  // Convert basic markdown to HTML for display
  return text
    // Bold **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic *text*
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // ### Heading
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // ## Heading
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    // Bullet lines starting with - or •
    .replace(/^[-•] (.+)$/gm, '<li>$1</li>')
    // Numbered list
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
}

function LoadingDots() {
  return (
    <div className="message-bubble bubble-bot flex items-center gap-1 py-3 px-4">
      <div className="dot-pulse">
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

  if (loading) {
    return (
      <div className="flex items-end gap-2 mb-3">
        <Avatar />
        <LoadingDots />
      </div>
    )
  }

  const isUser = role === 'user'

  return (
    <div ref={ref} className={`flex items-end gap-2 mb-3 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && <Avatar />}
      <div className={`message-bubble ${isUser ? 'bubble-user' : 'bubble-bot'}`}>
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
    <div className="w-8 h-8 rounded-full bg-saffron-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow">
      G
    </div>
  )
}
