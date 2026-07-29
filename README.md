# G3W Homes CRM

A property management and client relationship dashboard built for G3W Homes, a Nigerian real estate company. Designed to help their team manage property listings, track leads, and follow up with clients.

## Live Demo

[View Live →](https://g3whomes-crm.vercel.app)

## Features

- **Property listings management** — add, edit, and categorise properties by type, location, and availability
- **Lead tracking** — log new enquiries and track them through the sales pipeline
- **Client profiles** — store contact details, interaction history, and notes per client
- **Follow-up management** — flag clients for follow-up and track outstanding actions
- **Authentication** — secure login powered by Supabase Auth
- **Dashboard overview** — at-a-glance summary of active listings, open leads, and recent activity
- **Fully responsive** — works on desktop, tablet, and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Database & Auth | [Supabase](https://supabase.com/) (PostgreSQL) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Getting Started

### Prerequisites

Make sure you have these installed before continuing:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://npmjs.com/) or [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/TundeAwogbami/g3whomes-crm.git
cd g3whomes-crm
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Then open `.env.local` and add your Supabase credentials (see [Environment Variables](#environment-variables) below).

### 4. Run the development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file at the root of the project. You'll find the values in your [Supabase project settings](https://app.supabase.com/) under **Project Settings → API**.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Never commit your `.env.local` file.** It is already listed in `.gitignore`.

---

## Project Structure

```
g3whomes-crm/
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Dashboard home
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
├── lib/                  # Supabase client and helper functions
├── public/               # Static assets
├── .env.example          # Environment variable template
└── README.md
```

## Deployment

This project is deployed on [Vercel](https://vercel.com/). To deploy your own copy:

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com/) and import the repository
3. Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**
4. Click **Deploy**

Vercel auto-detects Next.js. There is no extra configuration needed.

---

## About G3W Homes

G3W Homes is a Nigerian real estate company helping clients find and secure residential and commercial properties. This CRM was built to replace their manual tracking process and give their team a faster, more organised way to manage their business.

---

## Author

**Tunde Awogbami** I am a Freelance Web Developer in Lagos, Nigeria

- [Portfolio](https://awogbamitunde.vercel.app)
- [GitHub](https://github.com/TundeAwogbami)
- [LinkedIn](https://linkedin.com/in/tundeawogbami)

---

## License

This project is private work built for a client. Not open for redistribution.
