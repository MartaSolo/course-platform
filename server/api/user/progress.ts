import { PrismaClient } from "~~/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import type {
  CourseOutline,
  ChapterOutline,
  LessonOutline,
} from "../course/meta.get";
import type { CourseProgress, ChapterProgress } from "~~/shared/types/course";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Endpoint that updates the progress of a lesson
export default defineEventHandler(async (event) => {
  // Throw 401 if there is no user logged in
  protectRoute(event);

  // Get user email from the supabase user if there is one.
  const {
    user: { email: userEmail },
  } = event.context;

  // Get the progress from DB
  const userProgress = await prisma.lessonProgress.findMany({
    where: {
      userEmail,
      // We want progress only for the first course for now
      Lesson: {
        chapter: {
          course: {
            id: 1,
          },
        },
      },
    },
    select: {
      completed: true,
      Lesson: {
        select: {
          slug: true,
          chapter: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  // Get Course outline from meta endpoint
  const courseOutline = await $fetch<CourseOutline>("/api/course/meta");

  if (!courseOutline) {
    throw createError({
      statusCode: 404,
      statusMessage: "Course outline not found",
    });
  }

  // Use the course outline and user progress to create a nested object
  // with the progress for each lesson

  const progress = courseOutline.chapters.reduce(
    (courseProgress: CourseProgress, chapter: ChapterOutline) => {
      // Collect the progress for each chapter in the course
      courseProgress[chapter.slug] = chapter.lessons.reduce(
        (chapterProgress: ChapterProgress, lesson: LessonOutline) => {
          // Collect the progress for each lesson in the chapter
          chapterProgress[lesson.slug] =
            userProgress.find(
              (progress) =>
                progress.Lesson.slug === lesson.slug &&
                progress.Lesson.chapter.slug === chapter.slug
            )?.completed || false;

          return chapterProgress;
        },
        {}
      );
      return courseProgress;
    },
    {}
  );

  return progress;
});
