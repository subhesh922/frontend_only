from asyncio.log import logger
import json
from typing import Literal
from fastapi import FastAPI, HTTPException, Security
from fastapi.security import HTTPBearer
from pydantic import BaseModel
import httpx
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()


app = FastAPI()
bearer_scheme = HTTPBearer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
class MarkdownAnalysisRequest(BaseModel):
    markdown_text: str
    product: Literal["WST", "TM"]
    #auth: str  # Add this field

# Load API key from environment variable
API_KEY = os.getenv("API_KEY")
BACKEND_URL = os.getenv("BACKEND_URL")

@app.get("/")
def read_root():
    return {"BACKEND_URL": BACKEND_URL}



@app.post("/proxy/analyze_markdown")
async def proxy_analyze_markdown(
    request: MarkdownAnalysisRequest,
):
    async with httpx.AsyncClient(timeout=900) as client:
        try:
            response = await client.post(
                f"{BACKEND_URL}/analyze_markdown",
                headers={
                    "Authorization": f"Bearer {API_KEY}", 
                },
                json={"markdown_text": request.markdown_text,
                      "product": request.product
                      }
            )
            response.raise_for_status()
            with open("response.json", 'w') as file:
                json.dump(response.json(), file, indent=4)

            return response.json()
        except httpx.HTTPStatusError as exc:
            raise HTTPException(status_code=exc.response.status_code, detail=str(exc))
        except Exception as e:
            logger.exception("Unexpected error during markdown analysis.")
            raise HTTPException(status_code=500, detail=str(e))
