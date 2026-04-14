# ReplyAI

ReplyAI is a Next.js app for generating email replies with AI. It accepts an incoming email message, lets you choose a tone, and produces multiple ready-to-copy reply drafts using Google Gemini.

## Features

- AI-powered response generation using Google Gemini (`gemini-3-flash-preview`)
- Choose from multiple reply tones like professional, friendly, apologetic, assertive, sales, and more
- Copy generated replies with a single click
- Server-side API route for prompt-based reply creation

## Project structure

- `app/page.tsx` – main client-side React component and UI layout
- `app/api/generate/route.ts` – Next.js route that handles reply generation requests
- `lib/gemini.ts` – Gemini integration and prompt logic
- `app/layout.tsx` – app shell metadata and global layout
- `app/globals.css` – global styles

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root and add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
```

3. Run the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```text
http://localhost:3000
```

