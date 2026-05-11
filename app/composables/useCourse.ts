import type { CourseMeta } from "~~/shared/types/course";

export const useCourse = () =>
  useFetchWithCache<CourseMeta>("/api/course/meta");
