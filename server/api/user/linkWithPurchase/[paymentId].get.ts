import { PrismaClient } from "~~/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default defineEventHandler(async (event) => {
  // Get PaymentIntent ID from route
  const { paymentId } = getRouterParams(event);
  const user = event.context.user;

  // Update course purchase record
  try {
    await prisma.coursePurchase.update({
      where: {
        paymentId,
      },
      data: {
        userEmail: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error linking course purchase",
    });
  }

  return 200;
});
