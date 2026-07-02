# ElderAI Lead Systems — Landing Page

React + TypeScript (Vite) frontend + Node.js/TypeScript (Express) backend,
styled with Tailwind CSS from the Google Stitch "Clinical Clarity" design
(navy + gold, senior living B2B).

```
senior-living-landing/
  frontend/     React + TypeScript + Tailwind landing page
  backend/      Express (TypeScript) API that forwards form submissions to n8n
  design-reference/   the original Stitch export (screen.png, code.html, DESIGN.md) — for reference only, not part of the running app
```

## 1. Install & run

Open two terminals.

**Terminal 1 — backend**
```
cd backend
cp .env.example .env
npm install
npm run dev
```
Runs on http://localhost:3001

**Terminal 2 — frontend**
```
cd frontend
cp .env.example .env
npm install
npm run dev
```
Runs on http://localhost:5173 — open this in your browser.

Nothing will actually send anywhere yet until you complete step 3 below.

## 2. Where to add your Zapier chatbot

Open **`frontend/index.html`**. Near the bottom, inside `<body>`, you'll see:

```html
<!-- ZAPIER_CHATBOT_EMBED_GOES_HERE -->
```

Paste the `<script>` snippet Zapier gives you for your chatbot right below
that comment, still inside `<body>`, still before `</body>`. Almost all
chat-widget embeds are self-mounting `<script>` tags that inject their own
floating bubble — so pasting it in as-is is normally the whole job. If Zapier
instead gives you an `<iframe>` or a custom element tag, paste that the same
way, in the same spot.

That's the only file you need to touch for the chatbot.

## 3. Link the contact form to your n8n automation

The contact form doesn't talk to n8n directly — it posts to your own
Express backend, which forwards it to n8n. That's intentional: it keeps your
webhook URL out of the browser and lets you validate/reshape data before it
hits your automation.

Steps:

1. In n8n, open (or create) the workflow that should receive landing-page
   leads. Add a **Webhook** trigger node if it doesn't have one, set its
   method to `POST`, and copy the **Production URL** (not the Test URL —
   the test one only works while the workflow editor is open and listening).

2. Open **`backend/.env`** (the file you created from `.env.example` in step 1)
   and set:
   ```
   N8N_WEBHOOK_URL=<paste your n8n Production Webhook URL here>
   ```

3. Restart the backend (`npm run dev` again if it's running) so it picks up
   the new value.

4. Submit the form on the landing page once as a test. Your backend will
   POST this JSON shape to n8n:
   ```json
   {
     "name": "...",
       "firstName": "...",
       "lastName": "...",
     "email": "...",
     "phone": "...",
     "careType": "Independent Living | Assisted Living | Memory Care",
    "moveInTimeline": "Immediate | Within 30 Days | 1-3 Months | Researching",
       "tourDate": "YYYY-MM-DD",
       "tourTime": "8:00 AM | 8:30 AM | ... | 8:00 PM",
     "message": "...",
     "leadSource": "Landing Page",
     "timestamp": "2026-07-01T12:00:00.000Z"
   }
   ```
   In n8n, map those fields into your existing Google Sheets CRM columns
   (Name, Email, Phone, Lead Source, Care Type, Timestamp, etc.) the same
   way you already do for your chatbot leads.

5. Check the n8n execution log to confirm the webhook fired and your
   Google Sheet / email / SMS / staff-notification steps ran as expected.

One thing worth deciding now: since your Zapier chatbot and this landing
page form will both feed leads into the same CRM, make sure they're writing
to the same sheet with the same column structure — otherwise you'll end up
reconciling two lead lists by hand.

## 4. Going to production

- Build the frontend: `cd frontend && npm run build` → outputs `frontend/dist`.
  Deploy that as a static site (Vercel, Netlify, or served by the backend).
- Deploy the backend anywhere that runs Node.js (Vercel, DigitalOcean, Render,
  Railway). Set `N8N_WEBHOOK_URL` and `CORS_ORIGIN` (your live frontend URL)
  as real environment variables there — don't commit `.env` files.
- Update `frontend/.env` (`VITE_API_URL`) to point at your deployed backend
  URL before rebuilding for production.
