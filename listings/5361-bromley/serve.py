from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import importlib
import sys
import os

# Import the leads server
sys.path.insert(0, os.path.dirname(__file__))
import importlib
leads_mod = importlib.import_module("leads_server")

app = FastAPI()

# Mount the leads API routes
app.include_router(leads_mod.app.router)

# Serve static files
static_dir = os.path.dirname(__file__)
app.mount("/images", StaticFiles(directory=os.path.join(static_dir, "images")), name="images")

@app.get("/thank-you.html")
async def thank_you():
    return FileResponse(os.path.join(static_dir, "thank-you.html"))

@app.get("/")
@app.get("/index.html")
async def index():
    return FileResponse(os.path.join(static_dir, "index.html"))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8891)
