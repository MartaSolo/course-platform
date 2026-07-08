import type { CourseProgress } from "~~/shared/types/course";

export const useCourseProgress = defineStore("courseProgress", () => {
  const progress = ref<CourseProgress>({});

  const initialized = ref(false);

  const initialize = async () => {
    // if the course has already been initialized, return
    if (initialized.value) return;
    initialized.value = true;

    // Fetch user's progress from database
    const { data: userProgress } = await useFetch<CourseProgress>(
      "/api/user/progress",
      {
        headers: useRequestHeaders(["cookie"]),
      }
    );

    if (userProgress.value) {
      progress.value = userProgress.value as CourseProgress;
    }
  };

  const toggleComplete = async (chapter: string, lesson: string) => {
    const user = useSupabaseUser();
    if (!user.value) return;

    // fallback for chapter and lesson if they are not provided
    if (!chapter || !lesson) {
      const {
        params: { chapterSlug, lessonSlug },
      } = useRoute();
      chapter = chapterSlug as string;
      lesson = lessonSlug as string;
    }

    // Get the current progress from the lesson
    const currentProgress = progress.value[chapter]?.[lesson];

    // Optimistically update the progress in the UI
    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: !currentProgress,
    };

    // Update the progress in the database
    try {
      await $fetch(`/api/course/chapter/${chapter}/lesson/${lesson}/progress`, {
        method: "POST",
        // Automatically stringified by ofetch
        body: {
          completed: !currentProgress,
        },
      });
    } catch (error) {
      console.error(error);

      // If the request fails, revert the progress in the UI
      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: currentProgress ?? false,
      };
    }
  };

  const percentageCompleted = computed(() => {
    const chapters = Object.values(progress.value).map((chapter) => {
      const lessons = Object.values(chapter);
      const completedLessons = lessons.filter((lesson) => lesson);
      return Number((completedLessons.length / lessons.length) * 100).toFixed(
        0
      );
    }, []);

    const totalLessons = Object.values(progress.value).reduce(
      (number, chapter) => {
        return number + Object.values(chapter).length;
      },
      0
    );

    const totalCompletedLessons = Object.values(progress.value).reduce(
      (number, chapter) => {
        return (
          number + Object.values(chapter).filter((lesson) => lesson).length
        );
      },
      0
    );

    const course = Number(
      (totalCompletedLessons / totalLessons) * 100 || 0
    ).toFixed(0);

    return {
      chapters,
      course,
    };
  });

  return {
    progress,
    initialize,
    toggleComplete,
    percentageCompleted,
    initialized,
  };
});
