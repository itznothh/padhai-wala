const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function sendMessage(message, sessionId) {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId }),
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function newSession() {
  const res = await fetch(`${BASE_URL}/session/new`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to create session')
  return res.json()
}

export async function resetSession(sessionId) {
  await fetch(`${BASE_URL}/session/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId }),
  })
}
