import Link from "next/link"
import { ArrowRight, Check, Star, Zap, Shield, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SaaS Kit</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/login" className="text-muted-foreground hover:text-foreground">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm mb-6">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>Built with Next.js 15 & React 19</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Ship your SaaS
            <span className="text-primary"> in days</span>, not months
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Production-ready starter kit with authentication, payments, dashboard,
            and everything you need to launch your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90"
            >
              Start Building <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/turkcode-ai/nextjs-saas-boilerplate"
              className="inline-flex items-center justify-center gap-2 border px-8 py-3 rounded-lg font-medium hover:bg-muted"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Authentication",
                description: "NextAuth.js v5 with multiple providers, JWT sessions, and role-based access control.",
              },
              {
                icon: Zap,
                title: "Stripe Payments",
                description: "Subscription billing, one-time payments, customer portal, and webhook handling.",
              },
              {
                icon: Users,
                title: "Dashboard",
                description: "Modern admin dashboard with analytics widgets, user management, and settings.",
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-background p-6 rounded-xl border">
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple pricing</h2>
          <p className="text-center text-muted-foreground mb-12">
            Choose the plan that works best for you
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Free",
                price: "$0",
                description: "For side projects",
                features: ["3 projects", "Basic analytics", "Community support"],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$29",
                description: "For growing businesses",
                features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domain"],
                cta: "Start Free Trial",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$99",
                description: "For large teams",
                features: ["Everything in Pro", "SSO", "Dedicated support", "SLA guarantee"],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-xl border ${
                  plan.popular ? "border-primary ring-2 ring-primary" : ""
                }`}
              >
                {plan.popular && (
                  <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold mt-4">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
                <div className="my-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-medium ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border hover:bg-muted"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-semibold">SaaS Kit</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built by{" "}
            <a href="https://turkcode.net" className="text-primary hover:underline">
              TurkCode
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
