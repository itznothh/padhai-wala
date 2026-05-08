import logging
import os
import uuid

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from agents.saathi import chat, reset_session

app = FastAPI(
    title="Padhai Wala API",
    description="AI neighbour helping low-income families find free schools in India",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"


class ResetRequest(BaseModel):
    session_id: str = "default"


@app.get("/")
def root():
    return {
        "status": "Padhai Wala API is running 🎓",
        "version": "1.0.0",
        "agents": ["Saathi", "Khoji", "Kagzi", "Nazar"]
    }


@app.api_route("/health", methods=["GET", "HEAD"])
def health():
    gemini_ok = bool(os.getenv("GEMINI_API_KEY"))
    serper_ok = bool(os.getenv("SERPER_API_KEY"))
    return {
        "status": "ok",
        "gemini_configured": gemini_ok,
        "serper_configured": serper_ok
    }


@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    try:
        result = chat(req.message, req.session_id)
        return result
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/session/new")
def new_session():
    """Generate a new session ID for a fresh conversation."""
    session_id = str(uuid.uuid4())
    return {"session_id": session_id}


@app.post("/session/reset")
def reset_session_endpoint(req: ResetRequest):
    reset_session(req.session_id)
    return {"status": "reset", "session_id": req.session_id}
