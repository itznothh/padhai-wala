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
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY is not set in environment variables!")
        _client = Groq(api_key=api_key)
    return _client

# FIX: use the correct current model name
MODEL = "llama-3.3-70b-versatile"

def chat_completion(messages: list, temperature: float = 0.7, max_tokens: int = 600) -> str:
    """Simple wrapper around Groq chat completion."""
    client = get_client()
    try:
        print(f"Calling Groq model: {MODEL} | max_tokens={max_tokens} | messages={len(messages)}")
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        print("Groq response received")
        return response.choices[0].message.content
    except Exception as e:
        print(f"Groq API error: {e}")
        raise
