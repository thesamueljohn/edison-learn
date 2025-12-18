# AI Tutor – Voice-First Learning Platform for Nigerian Education

## Project Description

AI Tutor is a **voice-first, AI-powered tutoring platform** designed to tackle the persistent challenges of **quality, access, and personalization** in the Nigerian education system.

Most existing EdTech solutions rely heavily on static content such as videos and PDFs, which do not replicate the effectiveness of one-on-one tutoring. AI Tutor bridges this gap by combining **generative AI, real-time voice interaction, and structured curriculum data** to deliver **interactive and personalized learning experiences at scale**.

The platform supports learners from **Primary 1 through Junior Secondary School (JSS3)** and aligns with the Nigerian curriculum. Students learn by **speaking directly with an AI tutor**, receiving explanations adapted to their class level and subject, while their progress is automatically tracked and stored.

This project directly supports **Sustainable Development Goal (SDG) 4 – Quality Education**, by making high-quality tutoring accessible, scalable, and affordable.

---

## Installation / Run Instructions

### Prerequisites

* Node.js (v18 or higher)
* npm or pnpm
* Supabase account
* Clerk account (authentication)
* Vapi account (voice AI)

---

### 1. Clone the Repository

```bash
git clone https://github.com/thesamueljohn/edison-learn.git
cd ai-tutor
```

---

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

---

### 3. Environment Variables

Create a `.env.local` file in the root directory and add:

```env
# Sentry
SENTRY_AUTH_TOKEN =


# VapiS
NEXT_PUBLIC_VAPI_WEB_TOKEN = 
NEXT_PUBLIC_VAPI_ASSISTANT_ID= 

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL = /auth/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL = /auth/dashboard

CLERK_WEBHOOK_SECRET= to sync users to supabase /api/webooks/clerk

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
```

---

### 4. Database Setup

Ensure the following tables and constraints exist in Supabase:

* `classes`
* `class_subjects`
* `topics`
* `lesson_embeddings`
* `lessons`
* `profiles`
* `questions`
* `sessions`
* `subjects`
* `student_progress`

---

### 5. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

---

## Tech Stack Used

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* React Context & Hooks

### Backend / Infrastructure

* Supabase (PostgreSQL, Row Level Security)
* Supabase pgvector (AI embeddings & semantic search)
* Clerk (authentication and user management)

### AI & Voice

* Vapi – real-time voice AI and call orchestration
* OpenAI models – lesson generation, explanations, and adaptive tutoring

### Architecture Highlights

* Event-driven progress tracking via webhooks
* AI-assisted lesson completion detection
* Scalable relational curriculum data model

---

## Team Members

* **[David]** – Project Lead 
* **[Caleb]** – Backend & Database Architecture
* **[Samuel]** – AI Prompt Engineering & Curriculum Design
* **[Samuel]** – UI/UX & Frontend Development

---

## Impact

AI Tutor is built to:

* Improve learning outcomes through personalized instruction
* Reduce dependence on expensive human tutors
* Scale quality education to underserved communities
* Support long-term educational development in Nigeria

---

## License
This project was developed for an SDG Hackathon and is intended for educational and research purposes.
