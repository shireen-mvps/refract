# AI Content Repurposer

> Turn one piece of content into 5 ready-to-post formats — instantly.

A full-stack AI web app that takes any piece of content (recipe, product description, promo, blog post) and generates platform-optimized copy for **Instagram, Facebook, WhatsApp, Email, and LinkedIn** — all in one click.

Built with **Next.js 15**, **Vercel AI SDK**, and **Claude AI (claude-sonnet-4-6)**.

**Live demo:** [ai-content-repurposer-nu.vercel.app](https://ai-content-repurposer-nu.vercel.app)

---

## What it does

1. Enter your business name, business type, content type, and tone
2. Paste your original content
3. Hit **Repurpose Content**
4. Get 5 platform-ready posts with one-click copy buttons

Each output is tailored to the native culture of that platform — not just the same text resized.

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | Next.js 15 (App Router)           |
| AI         | Claude claude-sonnet-4-6 via Anthropic API |
| AI SDK     | Vercel AI SDK v4 + @ai-sdk/anthropic |
| Styling    | Tailwind CSS v3                   |
| Language   | TypeScript                        |
| Deployment | Vercel (free tier)                |

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/shireen-mvps/ai-content-repurposer.git
cd ai-content-repurposer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API keys

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_anthropic_key_here
```

Get your Anthropic key at [console.anthropic.com](https://console.anthropic.com).

#### Image Generation (Optional)

To enable AI image generation, add your Gemini API key:

```
GEMINI_API_KEY=your_gemini_key_here
```

Get your free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

- Uses Gemini 2.5 Flash — supports uploading your product photo as a reference
- Free tier available with generous limits (~$0.001–0.003/image on paid tier)
- Upload your product image for best results; works without one too
- Supports Square (1:1), Landscape (16:9), and Portrait (9:16) formats
- If key is not set, the image section shows a setup prompt

> **Security note:** Never commit `.env.local` to GitHub. It is already listed in `.gitignore`. Only `.env.local.example` (with placeholder values) is safe to commit.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repo
4. In **Environment Variables**, add `ANTHROPIC_API_KEY` with your key
5. Click **Deploy**

That's it. Live in under 2 minutes.

---

## Project Structure

```
ai-content-repurposer/
├── app/
│   ├── api/
│   │   └── repurpose/
│   │       └── route.ts     # API route — Claude call + response
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Full UI — form + output cards
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

## Demo Use Case

Pre-loaded with **Sunny Homemade** — a real homemade food business. But works for any business type: fashion, coaching, SaaS, retail, services, and more.

---

Built by [Shireen](https://github.com/shireen-mvps)
