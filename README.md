# Dentistry  
A full-stack SaaS application built for a dental clinic to manage appointments and patient interactions with **AI voice assistance** and **subscription-based access**.

---
## Preview
[Live demo](https://dentistryy.vercel.app/)

## Screen Recorded Video
https://github.com/user-attachments/assets/f7291bd0-945a-4321-ab7e-65d7abe7d805

---

## Tech Stack  

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Prisma
- PostgreSQL (Neon)
- Clerk Authentication
- Resend (Email)
- Vapi AI (Voice)
- Vercel (Deployment)

---

## Project Structure

```
src
├── app
│ ├── admin        # Admin routes & pages
│ ├── appointments # Appointment pages & logic
│ ├── dashboard    # Clinic dashboard
│ ├── voice        # Voice-assisted features
│ ├── api          # Next.js route handlers (backend APIs)
│ └── layout.tsx   # Root layout
│
├── components
│ ├── admin        # Admin UI components
│ ├── appointments # Appointment UI components
│ ├── dashboard    # Dashboard components
│ ├── emails       # Email templates
│ ├── landing      # Landing page components
│ └── ui           # Shared UI components
│
├── hooks          # Custom React hooks
├── lib
│ └── actions      # Next.js Server Actions
├── types          # TypeScript types
└── providers.tsx  # App-level providers
```

## Screenshots and Walkthrough

**Admin dashboard** – manage doctors, view, update, and edit appointments.
<img width="1898" height="1050" alt="image" src="https://github.com/user-attachments/assets/12ea4857-81af-43c9-9719-6f6ef430a00c" />

**User dashboard** – view upcoming appointments, subscription status, and personal activity.
<img width="1911" height="1043" alt="image" src="https://github.com/user-attachments/assets/19759632-e2a0-4ac2-80da-9af8069c5719" />

**Book appointments** – schedule and modify appointments before final confirmation.
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/f10152cd-a520-434c-9a84-22af10ca5686" />

**Subscription plans** – only subscribed users can access premium dental services.  
<img width="1919" height="961" alt="image" src="https://github.com/user-attachments/assets/07a53d18-b865-44d1-b217-d72688536a66" />

**Email confirmation** – appointment and subscription confirmations sent via email to signed-in users.  
<img width="1165" height="798" alt="image" src="https://github.com/user-attachments/assets/5fe14f72-ac7d-48cc-a48b-d1f6e5bb6979" />
<img width="1679" height="851" alt="image" src="https://github.com/user-attachments/assets/d732ba45-a14e-4a8e-a7d8-f3042c086960" />

**Voice assistant** – voice assistant available for signed-in users with real time transcripts.
<img width="1897" height="1070" alt="image" src="https://github.com/user-attachments/assets/d9c5cf28-80b8-484b-88e5-7a3c55ce82f5" />

---

## Features

- Appointment booking and management
- Role-based access (Admin / Users)
- Voice-assisted features using Vapi AI
- Secure authentication using Clerk
- Automated email workflows with Resend
- Admin dashboard for clinic operations
- Subscription-based feature access
- Responsive and modern UI
