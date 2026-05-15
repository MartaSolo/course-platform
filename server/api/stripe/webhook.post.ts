import { PrismaClient } from "~~/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import stripe from "./stripe";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

type PaymentIntent = {
  id: string;
};

const STRIPE_WEBHOOK_SECRET: string = useRuntimeConfig().stripeWebhookSecret;

export default defineEventHandler(async (event) => {
  const signature = getHeader(event, "stripe-signature") as string;
  const body = (await readRawBody(event)) as string;

  // Verify the webhook signature
  let stripeEvent;

  try {
    stripeEvent = await stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid signature",
    });
  }

  if (stripeEvent.type === "payment_intent.succeeded") {
    await handlePaymentIntentSucceeded(stripeEvent.data.object);
  } else if (stripeEvent.type === "payment_intent.payment_failed") {
    await handlePaymentIntentFailed(stripeEvent.data.object);
  }

  return 200;
});

async function handlePaymentIntentSucceeded(paymentIntent: PaymentIntent) {
  // Verify the related course purchase
  try {
    await prisma.coursePurchase.update({
      where: {
        paymentId: paymentIntent.id,
      },
      data: {
        verified: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error verifying purchase",
    });
  }
}

async function handlePaymentIntentFailed(paymentIntent: PaymentIntent) {
  // Clean up the course purchase
  try {
    await prisma.coursePurchase.delete({
      where: {
        paymentId: paymentIntent.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error removing purchase",
    });
  }
}
