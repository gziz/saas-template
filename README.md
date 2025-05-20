# SAAS Template

A modern, full-stack SAAS web application template to kickstart your next project.\
This repo is a fork of [Mckay's SaaS boilerplate](https://github.com/mckaywrigley/o1-pro-template-system) with some minor fixes.

## Tech Stack

- Frontend: [Next.js](https://nextjs.org/docs), [Tailwind](https://tailwindcss.com/docs/guides/nextjs), [Shadcn](https://ui.shadcn.com/docs/installation), [Framer Motion](https://www.framer.com/motion/introduction/)
- Backend: [PostgreSQL](https://www.postgresql.org/about/), [Drizzle](https://orm.drizzle.team/docs/get-started-postgresql), [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- Auth: [Clerk](https://clerk.com/)
- Payments: [Stripe](https://stripe.com/)

## Features

- 🔐 Authentication & Authorization with Clerk
- 💳 Payment processing with Stripe
- 🗃️ Database integration with PostgreSQL and Drizzle ORM
- 🎨 Beautiful UI components from Shadcn UI
- 🚀 Server-side rendering with Next.js
- 📱 Responsive design with Tailwind CSS
- 🔄 Server actions for data mutations
- 🌓 Light and dark mode support

## Getting Started

### Prerequisites

You will need accounts for the following services:

- [Clerk](https://clerk.com/) for authentication
- [Supabase](https://supabase.com/) or any PostgreSQL database
- [Stripe](https://stripe.com/) for payment processing
- [Vercel](https://vercel.com/) (optional, for deployment)

### Installation

1. Clone this repository

```bash
git clone https://github.com/gziz/saas-template
cd saas-template
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Copy the `.env.example` file to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

This boilerplate uses Drizzle ORM with PostgreSQL. To set up your database:

1. Create a PostgreSQL database
2. Update your database connection string in `.env.local`
3. Generate and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

## Deployment

This application can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fsaas-boilerplate)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
