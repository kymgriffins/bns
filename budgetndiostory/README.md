# Budget Ndio Story — Email System Setup

## Install dependencies

```bash
npm install nodemailer mysql2
```

---

## 1. Set up the database

Go to **cPanel → phpMyAdmin**, select your database, and run the contents of:

```
sql/schema.sql
```

This creates 5 tables: `contacts`, `subscribers`, `donations`, `tips`, `report_requests`.

---

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Value |
|---|---|
| `DB_HOST` | Your cPanel server IP (from cPanel → Server Information) |
| `DB_USER` | cPanel MySQL username (cPanel → MySQL Databases) |
| `DB_PASSWORD` | Your MySQL password |
| `DB_NAME` | Your database name |
| `SMTP_PASSWORD` | `@budgetndiostory.org` |
| `ADMIN_EMAIL` | Where tip/request notifications go |

**Important:** `DB_HOST` must be your server's **public IP**, not `localhost`.  
Vercel runs in a different network — it can't reach cPanel's `localhost`.

To allow Vercel to connect, go to **cPanel → Remote MySQL** and add:
- `%` (wildcard) to allow connections from Vercel's dynamic IPs, OR
- Add Vercel's IP range (check your Vercel project → Settings → Network)

Add all variables to **Vercel → Project → Settings → Environment Variables**.

---

## 3. Drop the files into your Next.js project

```
lib/
  db.js              → MySQL connection pool
  mailer.js          → Nodemailer + cPanel SMTP
  emailLayout.js     → Shared HTML email wrapper

app/api/
  subscribe/
    route.js                    → POST: newsletter signup
    confirm/route.js            → GET:  confirm token link (email click)
  unsubscribe/route.js          → GET:  one-click unsubscribe
  donate/route.js               → POST: save donation + send receipt
  tip/route.js                  → POST: submit tip + send ack + admin alert
  report-request/
    route.js                    → POST: submit report request
    [id]/notify/route.js        → POST: admin fires "report ready" email

sql/
  schema.sql                    → Run once in phpMyAdmin
```

---

## 4. API reference

### Newsletter signup
```
POST /api/subscribe
{ "email": "user@example.com", "name": "Jane" }
```
→ Sends double opt-in confirmation email.

### Confirm subscription (link in email)
```
GET /api/subscribe/confirm?token=xxx
```
→ Redirects to `/?sub=confirmed` and sends welcome email.

### Unsubscribe (link in every email)
```
GET /api/unsubscribe?email=user@example.com
```
→ Redirects to `/?unsub=success`.

### Donation receipt
```
POST /api/donate
{
  "donor_email": "donor@example.com",
  "donor_name": "John",
  "amount_kes": 5000,
  "payment_method": "mpesa",
  "payment_type": "one_time",
  "reference": "QB4GXXXXXX",
  "status": "confirmed"
}
```
→ Saves record + sends itemised receipt email.

### Tip submission
```
POST /api/tip
{
  "submitter_email": "citizen@example.com",
  "submitter_name": "Mary",
  "title": "Road project stalled in Kisumu",
  "category": "roads",
  "county": "Kisumu",
  "description": "The road marked as delivered is still a dirt track..."
}
```
→ Sends ack to submitter + internal admin notification.

### Report request
```
POST /api/report-request
{
  "requester_email": "user@example.com",
  "county": "Mombasa",
  "sector": "Health",
  "doc_type": "County Budget Estimates"
}
```
→ Sends confirmation to requester + admin notification.

### Notify requester when report is published (admin action)
```
POST /api/report-request/42/notify
{
  "report_title": "Mombasa County Health Budget 2025",
  "report_url": "https://budgetndiostory.org/reports/mombasa-health-2025"
}
```
→ Emails the original requester that their report is live.

---

## 5. Show success/error messages from URL params

In your homepage or layout, read URL params and show a toast:

```javascript
// app/page.js (or a client component)
const params = new URLSearchParams(window.location.search);

const messages = {
  'sub=confirmed':         '✅ Subscribed! Check your inbox for a welcome email.',
  'sub=already_subscribed':'You are already subscribed.',
  'sub=expired':           'That confirmation link expired. Please sign up again.',
  'sub=invalid':           'Invalid confirmation link.',
  'unsub=success':         'You have been unsubscribed.',
};
```
