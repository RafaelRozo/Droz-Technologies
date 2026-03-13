"""
Bromley Road Leads Server
Receives form submissions via Formspree webhook or direct POST
Sends email notification to Yousef + logs to CSV + Google Sheets (optional)
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
import csv
import os
import json
from datetime import datetime
import subprocess

app = FastAPI(title="Bromley Leads Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

LEADS_DIR = os.path.expanduser("~/Droz-Technologies/listings/5361-bromley/leads")
LEADS_CSV = os.path.join(LEADS_DIR, "leads.csv")
os.makedirs(LEADS_DIR, exist_ok=True)

# Yousef's contact — UPDATE THIS
REALTOR_EMAIL = "YOUSEF_EMAIL_HERE"  # TODO: Get from Ricardo
REALTOR_PHONE = "416-602-4524"

def init_csv():
    if not os.path.exists(LEADS_CSV):
        with open(LEADS_CSV, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([
                'timestamp', 'first_name', 'last_name', 'email', 'phone',
                'contact_method', 'buyer_intent', 'has_realtor', 'message',
                'source', 'notified'
            ])

init_csv()

def send_email_notification(lead: dict):
    """Send email to Yousef via MS Graph (Arnold's email agent)"""
    subject = f"🏠 NEW SHOWING REQUEST — 5361 Bromley Road — {lead.get('first_name', '')} {lead.get('last_name', '')}"
    
    body = f"""
NEW SHOWING REQUEST FOR 5361 BROMLEY ROAD, BURLINGTON

Lead Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:           {lead.get('first_name', '')} {lead.get('last_name', '')}
Email:          {lead.get('email', '')}
Phone:          {lead.get('phone', '')}
Contact Via:    {lead.get('contact_method', 'Email')}
Intent:         {lead.get('buyer_intent', 'Not specified')}
Has Realtor:    {lead.get('has_realtor', 'Not specified')}
Message:        {lead.get('message', 'No message')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted:      {lead.get('timestamp', datetime.now().isoformat())}
Source:         {lead.get('source', 'Landing Page')}

Property:       5361 Bromley Road, Burlington ON L7L3G6
MLS:            W12874272
Price:          $1,199,999

— Droz Technologies Lead System
"""
    
    # Send via MS Graph email agent
    try:
        email_script = os.path.expanduser("~/.openclaw/secrets/ms-graph-email.py")
        if os.path.exists(email_script):
            proc = subprocess.run(
                ["python3", email_script, "send-stdin",
                 "--to", REALTOR_EMAIL,
                 "--subject", subject],
                input=body,
                capture_output=True,
                text=True,
                timeout=30
            )
            return proc.returncode == 0
    except Exception as e:
        print(f"Email send failed: {e}")
    
    return False

def log_lead(lead: dict, notified: bool = False):
    """Append lead to CSV"""
    with open(LEADS_CSV, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([
            lead.get('timestamp', datetime.now().isoformat()),
            lead.get('first_name', ''),
            lead.get('last_name', ''),
            lead.get('email', ''),
            lead.get('phone', ''),
            lead.get('contact_method', ''),
            lead.get('buyer_intent', ''),
            lead.get('has_realtor', ''),
            lead.get('message', ''),
            lead.get('source', 'landing_page'),
            'yes' if notified else 'no'
        ])


@app.post("/api/lead")
async def receive_lead(request: Request):
    """Receive a lead submission"""
    try:
        data = await request.json()
    except:
        form = await request.form()
        data = dict(form)
    
    lead = {
        'timestamp': datetime.now().isoformat(),
        'first_name': data.get('first_name', data.get('name', '')),
        'last_name': data.get('last_name', ''),
        'email': data.get('email', ''),
        'phone': data.get('phone', ''),
        'contact_method': data.get('contact_method', 'Email'),
        'buyer_intent': data.get('buyer_intent', ''),
        'has_realtor': data.get('has_realtor', ''),
        'message': data.get('message', ''),
        'source': data.get('_source', 'landing_page')
    }
    
    # Send notification
    notified = send_email_notification(lead)
    
    # Log to CSV
    log_lead(lead, notified)
    
    # Save as individual JSON too
    lead_file = os.path.join(LEADS_DIR, f"{datetime.now().strftime('%Y%m%d-%H%M%S')}-{lead['first_name']}.json")
    with open(lead_file, 'w') as f:
        json.dump(lead, f, indent=2)
    
    return JSONResponse({
        "status": "ok",
        "message": "Lead received",
        "notified": notified
    })


@app.post("/api/formspree-webhook")
async def formspree_webhook(request: Request):
    """Receive Formspree webhook notification"""
    data = await request.json()
    # Formspree sends form data in the body
    lead = {
        'timestamp': datetime.now().isoformat(),
        'first_name': data.get('first_name', ''),
        'last_name': data.get('last_name', ''),
        'email': data.get('email', ''),
        'phone': data.get('phone', ''),
        'contact_method': data.get('contact_method', 'Email'),
        'buyer_intent': data.get('buyer_intent', ''),
        'has_realtor': data.get('has_realtor', ''),
        'message': data.get('message', ''),
        'source': 'formspree_webhook'
    }
    
    notified = send_email_notification(lead)
    log_lead(lead, notified)
    
    return JSONResponse({"status": "ok"})


@app.get("/api/leads")
async def list_leads():
    """View all leads (dashboard)"""
    leads = []
    if os.path.exists(LEADS_CSV):
        with open(LEADS_CSV, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                leads.append(row)
    return JSONResponse({"total": len(leads), "leads": leads})


@app.get("/dashboard")
async def dashboard():
    """Simple HTML dashboard"""
    leads = []
    if os.path.exists(LEADS_CSV):
        with open(LEADS_CSV, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                leads.append(row)
    
    rows_html = ""
    for l in reversed(leads):
        rows_html += f"""
        <tr>
            <td>{l.get('timestamp','')[:16]}</td>
            <td><strong>{l.get('first_name','')} {l.get('last_name','')}</strong></td>
            <td>{l.get('email','')}</td>
            <td>{l.get('phone','')}</td>
            <td>{l.get('buyer_intent','')}</td>
            <td>{l.get('has_realtor','')}</td>
            <td>{'✅' if l.get('notified')=='yes' else '❌'}</td>
        </tr>"""
    
    return HTMLResponse(f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Bromley Leads Dashboard</title>
        <style>
            body {{ font-family: -apple-system, sans-serif; background: #111; color: #f5f5f0; padding: 2rem; }}
            h1 {{ color: #C9A96E; }}
            table {{ width: 100%; border-collapse: collapse; margin-top: 1rem; }}
            th, td {{ padding: 0.75rem; text-align: left; border-bottom: 1px solid #333; font-size: 0.9rem; }}
            th {{ color: #C9A96E; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; }}
            .stat {{ display: inline-block; background: rgba(201,169,110,0.1); border: 1px solid rgba(201,169,110,0.2); padding: 1rem 2rem; margin-right: 1rem; }}
            .stat-value {{ font-size: 2rem; color: #C9A96E; font-weight: bold; }}
            .stat-label {{ font-size: 0.75rem; color: #999; text-transform: uppercase; }}
        </style>
    </head>
    <body>
        <h1>🏠 5361 Bromley Road — Lead Dashboard</h1>
        <div style="margin: 1.5rem 0;">
            <div class="stat"><div class="stat-value">{len(leads)}</div><div class="stat-label">Total Leads</div></div>
            <div class="stat"><div class="stat-value">{sum(1 for l in leads if l.get('notified')=='yes')}</div><div class="stat-label">Notified</div></div>
        </div>
        <table>
            <tr><th>Time</th><th>Name</th><th>Email</th><th>Phone</th><th>Intent</th><th>Has Realtor</th><th>Notified</th></tr>
            {rows_html}
        </table>
    </body>
    </html>
    """)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8892)
