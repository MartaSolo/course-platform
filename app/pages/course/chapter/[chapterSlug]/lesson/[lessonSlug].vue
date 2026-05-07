<script setup lang="ts">
const course = useCourse();

const route = useRoute();

definePageMeta({
  validate({ params }) {
    const course = useCourse();

    const chapter = course.chapters.find(
      (chapter) => chapter.slug === params.chapterSlug
    );

    if (!chapter) {
      return createError({
        statusCode: 404,
        message: "Chapter not found",
      });
    }

    const lesson = chapter.lessons.find(
      (lesson) => lesson.slug === params.lessonSlug
    );

    if (!lesson) {
      return createError({
        statusCode: 404,
        message: "Lesson not found",
      });
    }

    return true;
  },
});

const chapter = computed(() => {
  return course.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  );
});

const lesson = computed(() => {
  return chapter.value?.lessons.find(
    (lesson) => lesson.slug === route.params.lessonSlug
  );
});

const title = computed(() => {
  return `${lesson.value?.title} - ${course.title}`;
});

useHead({
  title: title.value,
});

const progress = useLocalStorage<boolean[][]>("progress", []);

const isLessonComplete = computed<boolean>(() => {
  if (!chapter.value?.number || !lesson.value?.number) return false;

  if (!progress.value[chapter.value.number - 1]) return false;

  if (!progress.value[chapter.value?.number - 1]?.[lesson.value?.number - 1]) {
    return false;
  }

  return (
    progress.value[chapter.value?.number - 1]?.[lesson.value?.number - 1] ??
    false
  );
});

const toggleComplete = () => {
  if (!chapter.value?.number || !lesson.value?.number) return;

  if (!progress.value[chapter.value?.number - 1]) {
    progress.value[chapter.value?.number - 1] = [];
  }

  progress.value[chapter.value?.number - 1]![lesson.value?.number - 1] =
    !isLessonComplete.value;
};
</script>

<template>
  <div class="w-full">
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter?.number }} - {{ lesson?.number }}
    </p>
    <h2 class="mt-0 mb-0">{{ lesson?.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson?.sourceUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson?.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        v-if="lesson?.downloadUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson?.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer v-if="lesson?.videoId" :video-id="lesson.videoId" />
    <p>{{ lesson?.text }}</p>

    <LessonCompleteButton
      :model-value="isLessonComplete"
      @update:model-value="toggleComplete"
    />
  </div>
</template>

<style scoped></style>
