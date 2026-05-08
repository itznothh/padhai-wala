const BASE = 'https://padhai-wala-backend.onrender.com'

// ── Session management ──────────────────────────────────────────────────────

export async function newSession() {
  const res = await fetch(`${BASE}/session`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to create session')
  return res.json()   // expects { session_id: string }
}

export async function resetSession(sessionId) {
  const res = await fetch(`${BASE}/session/${sessionId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to reset session')
  return res.json()
}

// ── Chat ────────────────────────────────────────────────────────────────────

export async function sendMessage(text, sessionId, lang = 'English') {
  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message:    text,
      session_id: sessionId,
      language:   lang,
    }),
  })
  if (!res.ok) throw new Error(`Chat request failed: ${res.status}`)
  return res.json()
}
