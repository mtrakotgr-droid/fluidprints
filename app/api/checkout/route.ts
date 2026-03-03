import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

export async function POST(req: Request) {
  const { planName } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `Fluidprints ${planName} Plan` },
          unit_amount: planName === "Pro" ? 900 : 1900,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/pricing?success=true",
    cancel_url: "http://localhost:3000/pricing?canceled=true",
  });

  return NextResponse.json({ url: session.url });
}