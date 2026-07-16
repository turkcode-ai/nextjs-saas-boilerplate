<div align="center">

# ⚡ Next.js SaaS Boilerplate

[![Stars](https://img.shields.io/github/stars/turkcode-ai/nextjs-saas-boilerplate?style=social)](https://github.com/turkcode-ai/nextjs-saas-boilerplate)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)

**Production-ready Next.js 15 SaaS starter kit with everything you need**

Auth • Payments • Dashboard • Email • Database • Deployment

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=18&pause=1000&color=0369A1&center=true&vCenter=true&width=500&lines=Ship+your+SaaS+in+days%2C+not+months;Auth+%2B+Payments+%2B+Dashboard+included;Next.js+15+%7C+TypeScript+%7C+Tailwind" alt="Typing SVG" />

</div>

---

## ✨ Features

### 🔐 Authentication
- **NextAuth.js v5** with multiple providers
- Email/Password, Google, GitHub, Magic Link
- Session management with JWT
- Protected routes & middleware
- Role-based access control (RBAC)

### 💳 Payments
- **Stripe** integration ready
- Subscription plans (Free, Pro, Enterprise)
- One-time payments
- Customer portal
- Webhook handling
- Usage-based billing support

### 📊 Dashboard
- Modern admin dashboard
- Analytics widgets
- User management
- Settings pages
- Dark/Light mode
- Mobile responsive

### 📧 Email
- **Resend** integration
- Transactional emails
- Email templates (React Email)
- Welcome, verification, password reset
- Team invitations

### 🗄️ Database
- **Prisma** ORM
- PostgreSQL ready
- Type-safe queries
- Migration system
- Seed scripts

### 🚀 DevOps
- **Vercel** deployment ready
- GitHub Actions CI/CD
- Docker support
- Environment management

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Auth** | NextAuth.js v5 |
| **Database** | PostgreSQL + Prisma |
| **Payments** | Stripe |
| **Email** | Resend + React Email |
| **Validation** | Zod |
| **State** | Zustand |
| **Testing** | Vitest + Playwright |
| **Deployment** | Vercel / Docker |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/turkcode-ai/nextjs-saas-boilerplate.git
cd nextjs-saas-boilerplate

# Install dependencies
pnpm install
```

### 2. Environment Setup

```bash
# Copy environment file
cp .env.example .env.local
```

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/saas"

# Auth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_PRICE_ID_PRO=""
STRIPE_PRICE_ID_ENTERPRISE=""

# Resend
RESEND_API_KEY=""
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Seed database (optional)
pnpm prisma db seed
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/           # Auth pages (login, register, etc.)
│   ├── (dashboard)/      # Protected dashboard pages
│   ├── (marketing)/      # Public pages (landing, pricing)
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   ├── stripe/       # Stripe webhooks
│   │   └── trpc/         # tRPC endpoints (optional)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard components
│   ├── forms/            # Form components
│   └── marketing/        # Marketing components
├── lib/
│   ├── auth.ts           # Auth configuration
│   ├── db.ts             # Prisma client
│   ├── stripe.ts         # Stripe utilities
│   └── email.ts          # Email utilities
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
├── emails/               # React Email templates
└── public/
```

---

## 📖 Documentation

### Authentication

```typescript
// Protect a page
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }
  
  return <Dashboard user={session.user} />
}
```

```typescript
// Protect an API route
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  return NextResponse.json({ data: "Protected data" })
}
```

### Payments

```typescript
// Create checkout session
import { stripe } from "@/lib/stripe"

export async function createCheckoutSession(priceId: string, userId: string) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    metadata: { userId }
  })
  
  return session.url
}
```

### Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  password      String?
  role          Role      @default(USER)
  plan          Plan      @default(FREE)
  stripeCustomerId String? @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
  subscriptions Subscription[]
}

enum Role {
  USER
  ADMIN
}

enum Plan {
  FREE
  PRO
  ENTERPRISE
}
```

---

## 🎨 Customization

### Adding a New Page

```bash
# Create a new dashboard page
touch app/(dashboard)/settings/page.tsx
```

```typescript
// app/(dashboard)/settings/page.tsx
export default function SettingsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold">Settings</h1>
      {/* Your content */}
    </div>
  )
}
```

### Adding UI Components

```bash
# Add shadcn/ui component
pnpm dlx shadcn@latest add button card dialog
```

### Adding New Auth Provider

```typescript
// lib/auth.ts
import { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter" // Add new provider

export const authConfig: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
  ],
  // ...
}
```

---

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Type check
pnpm typecheck

# Lint
pnpm lint
```

---

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/turkcode-ai/nextjs-saas-boilerplate)

1. Click the button above
2. Add environment variables
3. Deploy!

### Docker

```bash
# Build image
docker build -t nextjs-saas .

# Run container
docker run -p 3000:3000 nextjs-saas
```

### Self-hosted

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

---

## 📋 Roadmap

- [x] Next.js 15 App Router
- [x] NextAuth.js v5
- [x] Stripe Subscriptions
- [x] Prisma + PostgreSQL
- [x] shadcn/ui Components
- [x] Dark Mode
- [ ] Team/Organization support
- [ ] Multi-tenancy
- [ ] Internationalization (i18n)
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] AI features (OpenAI)

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 💖 Support

If this helped you ship faster:

- ⭐ Star this repo
- 🐦 [Follow on Twitter](https://twitter.com/ersindorlak)
- ☕ [Buy me a coffee](https://buymeacoffee.com/ersindorlak)

---

<div align="center">

[![GitHub](https://img.shields.io/badge/Made%20by-Ersin%20Dorlak-0369A1?style=for-the-badge)](https://ersindorlak.com)

**Built with ❤️ by [TurkCode](https://turkcode.net)**

</div>
