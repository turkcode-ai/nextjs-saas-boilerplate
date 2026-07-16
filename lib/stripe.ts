import Stripe from "stripe"
import { prisma } from "./db"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
})

export const PLANS = {
  free: {
    name: "Free",
    description: "For personal projects",
    price: 0,
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Community support",
      "1GB storage",
    ],
  },
  pro: {
    name: "Pro",
    description: "For growing businesses",
    price: 29,
    priceId: process.env.STRIPE_PRICE_ID_PRO,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "10GB storage",
      "Custom domain",
      "Team collaboration",
    ],
  },
  enterprise: {
    name: "Enterprise",
    description: "For large teams",
    price: 99,
    priceId: process.env.STRIPE_PRICE_ID_ENTERPRISE,
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Dedicated support",
      "SSO authentication",
      "Custom integrations",
      "SLA guarantee",
      "Advanced security",
    ],
  },
}

export async function createCheckoutSession(userId: string, priceId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, stripeCustomerId: true },
  })

  if (!user) throw new Error("User not found")

  let customerId = user.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      metadata: { userId },
    })

    await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customer.id },
    })

    customerId = customer.id
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
    metadata: { userId },
  })

  return session.url
}

export async function createBillingPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/dashboard/billing`,
  })

  return session.url
}
