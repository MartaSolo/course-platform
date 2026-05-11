import type { LessonWithPath } from "~~/shared/types/course";

export const useLesson = async (chapterSlug: string, lessonSlug: string) => {
  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;

  return useFetchWithCache<LessonWithPath>(url);
};
