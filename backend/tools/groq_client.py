"""
Shared Groq client for all agents.
Model: llama-3.3-70b-versatile (fast, free, high quality)
"""
import os
from groq import Groq

_client = None

def get_client() -> Groq:
    global _client
    if _client is None:
        _client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    return _client

MODEL = "llama-3.3-70b-versatile"

def chat_completion(messages: list, temperature: float = 0.7, max_tokens: int = 2048) -> str:
    """Simple wrapper around Groq chat completion."""
    client = get_client()
    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens,
    )
    return response.choices[0].message.content
