# backend/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn
from datetime import datetime, timedelta
import random

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock database
roads_db = []

@app.post("/api/roads/analyze")
async def analyze_road(
    name: str,
    location: str,
    images: List[UploadFile] = File(...)
):
    # Mock AI analysis results
    conditions = ["good", "medium", "critical"]
    wear_levels = ["Low", "Medium", "High"]
    
    analysis_result = {
        "id": len(roads_db) + 1,
        "name": name,
        "location": location,
        "condition": random.choice(conditions),
        "lastInspection": datetime.now().strftime("%Y-%m-%d"),
        "nextMaintenance": (datetime.now() + timedelta(days=random.randint(30, 180))).strftime("%Y-%m-%d"),
        "wearLevel": random.choice(wear_levels),
        "riskFactor": f"{random.randint(10, 90)}%"
    }
    
    roads_db.append(analysis_result)
    return analysis_result

@app.get("/api/roads")
async def get_roads():
    return roads_db

@app.get("/api/roads/critical")
async def get_critical_roads():
    return [road for road in roads_db if road["condition"] == "critical"]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)