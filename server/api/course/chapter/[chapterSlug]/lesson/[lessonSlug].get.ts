import { PrismaClient } from "~~/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import protectRoute from "~~/server/utils/protectRoute";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default defineEventHandler(async (event) => {
  // Allow unauthenticated users to access the first chapter's lessons
  if (event.context.params?.chapterSlug !== "1-chapter-1") {
    protectRoute(event);
  }

  const { chapterSlug, lessonSlug } = getRouterParams(event);

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      chapter: {
        slug: chapterSlug,
      },
    },
  });

  if (!lesson) {
    throw createError({
      statusCode: 404,
      message: "Lesson not found",
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
});
