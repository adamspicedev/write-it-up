"use server";

import { requireUser } from "@/app/require-user";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";

export async function createSubscriptionAction() {
  const user = await requireUser();

  let stripeUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      customerId: true,
      email: true,
      firstName: true,
    },
  });

  if (!stripeUser?.customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: stripeUser?.email,
      name: stripeUser?.firstName,
    });

    stripeUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        customerId: stripeCustomer.id,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeUser.customerId as string,
    mode: "subscription",
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    success_url:
      process.env.NODE_ENV === "production"
        ? `${process.env.PRODUCTION_URL}/dashboard/payment/success`
        : `${process.env.DEVELOPMENT_URL}/dashboard/payment/success`,
    cancel_url:
      process.env.NODE_ENV === "production"
        ? `${process.env.PRODUCTION_URL}/dashboard/payment/cancelled`
        : `${process.env.DEVELOPMENT_URL}/dashboard/payment/cancelled`,
  });

  return redirect(session.url as string);
}
