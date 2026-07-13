import { PrismaClient } from "~~/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

type User = {
  email: string;
};

export default defineEventHandler(async (event) => {
  const user = event.context.user as User;

  // No user is logged in
  if (!user) return false;

  const course = await prisma.course.findFirstOrThrow();

  const coursePurchases = await prisma.coursePurchase.findMany({
    where: {
      userEmail: user.email,
      verified: true,
      courseId: course.id,
    },
  });

  // This user has purchased the course
  return coursePurchases.length > 0;
});
