import type { Lesson } from "~~/prisma/generated/client";

export type LessonWithPath = Lesson & {
  path: string;
};
