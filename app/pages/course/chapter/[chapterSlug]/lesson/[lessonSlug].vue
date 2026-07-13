<script setup lang="ts">
import { sanitize } from "isomorphic-dompurify";

const course = await useCourse();

definePageMeta({
  middleware: [
    async function ({ params }, _from) {
      const course = await useCourse();

      const chapter = course.value.chapters.find(
        (chapter) => chapter.slug === params.chapterSlug
      );

      if (!chapter) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Chapter not found",
          })
        );
      }

      const lesson = chapter.lessons.find(
        (lesson) => lesson.slug === params.lessonSlug
      );

      if (!lesson) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Lesson not found",
          })
        );
      }
    },
    "auth",
  ],
});

const route = useRoute();
const { chapterSlug, lessonSlug } = route.params;

const lesson = await useLesson(chapterSlug as string, lessonSlug as string);

const chapter = computed(() => {
  return course.value?.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  );
});

const title = computed(() => {
  return `${lesson.value?.title} - ${course.value?.title}`;
});

useHead({
  title: title.value,
});

const user = useSupabaseUser();

const courseProgressStore = useCourseProgress();
const { progress, initialized } = storeToRefs(courseProgressStore);

const { toggleComplete, initialize } = courseProgressStore;

if (user.value && !initialized.value) {
  await initialize();
}

// Check if the lesson is complete
const isCompleted = computed<boolean>(() => {
  return (
    progress.value?.[chapterSlug as string]?.[lessonSlug as string] || false
  );
});

const sanitizedText = computed(() => {
  return sanitize(lesson.value?.text || "", {
    ALLOWED_TAGS: ["p", "ul", "ol", "li", "strong", "em", "code", "a"],
    ALLOWED_ATTR: ["href"],
  });
});
</script>

<template>
  <div class="w-full">
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter?.number }} - {{ lesson?.number }}
    </p>
    <h2 class="my-6 text-2xl font-bold">{{ lesson?.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson?.youtubeUrl"
        class="font-normal text-md text-gray-500 hover:text-green-700"
        :to="lesson?.youtubeUrl"
      >
        Watch on Youtube
      </NuxtLink>
    </div>
    <VideoPlayer
      v-if="lesson?.sourceUrl"
      :video-src="lesson.sourceUrl"
      :title="lesson?.title"
    />
    <div class="my-6" v-html="sanitizedText" />

    <LessonCompleteButton
      v-if="user"
      :model-value="isCompleted"
      @update:model-value="
        toggleComplete(chapterSlug as string, lessonSlug as string)
      "
    />
  </div>
</template>

<style scoped></style>
