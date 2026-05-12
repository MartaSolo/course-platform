import type { Prisma } from "~~/prisma/generated/client";
import { PrismaClient } from "~~/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const lessonSelect = {
  title: true,
  slug: true,
  number: true,
} satisfies Prisma.LessonSelect;

const chapterSelect = {
  title: true,
  slug: true,
  number: true,
  lessons: {
    select: lessonSelect,
  },
} satisfies Prisma.ChapterSelect;

const courseSelect = {
  title: true,
  chapters: {
    select: chapterSelect,
  },
} satisfies Prisma.CourseSelect;

const getCourse = async () => {
  const course = await prisma.course.findFirst({ select: courseSelect });
  if (!course) return null;
  return {
    ...course,
    chapters: course.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
        path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
      })),
    })),
  };
};

export type CourseOutline = NonNullable<Awaited<ReturnType<typeof getCourse>>>;
export type ChapterOutline = CourseOutline["chapters"][number];
export type LessonOutline = ChapterOutline["lessons"][number];

export default defineEventHandler(async () => {
  const course = await getCourse();

  if (!course) {
    throw createError({
      statusCode: 404,
      message: "Course not found",
    });
  }

  return course;
});
