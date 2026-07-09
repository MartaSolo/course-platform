<script setup lang="ts">
const course = await useCourse();

const firstLesson = await useFirstLesson();

const handleClearError = () => {
  clearError({ redirect: firstLesson?.path ?? "/" });
};

const user = useSupabaseUser();

const courseProgressStore = useCourseProgress();

const { percentageCompleted, initialized, progress } =
  storeToRefs(courseProgressStore);

if (user.value && !initialized.value) {
  await courseProgressStore.initialize();
}
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div
      class="mb-4 flex flex-col gap-6 justify-between items-center w-full"
      :class="user ? 'md:flex-row-reverse' : 'md:flex-row'"
    >
      <UserCard v-if="user" class="self-end" />
      <h1 class="text-2xl mb-6 md:text-3xl">
        <span class="font-medium">
          Course:
          <span class="font-bold">{{ course.title }}</span>
        </span>
      </h1>
    </div>
    <div class="flex gap-6 flex-col lg:flex-row w-full">
      <div class="p-4 bg-white rounded-md w-full grow lg:p-8">
        <NuxtErrorBoundary>
          <NuxtPage />
          <template #error="{ error }">
            <div>
              <p>Oh sth went wrong with the lesson</p>
              <code>{{ error }}</code>
              <p>{{ error.message }}</p>
              <button
                class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
                @click="handleClearError()"
              >
                Clear Error
              </button>
            </div>
          </template>
        </NuxtErrorBoundary>
      </div>

      <div
        class="p-4 bg-white rounded-md w-full flex flex-col lg:max-w-[300px] lg:p-8"
      >
        <h3 class="text-2xl mb-4 font-medium">Chapters</h3>

        <Accordion
          v-for="(chapter, index) in course.chapters"
          :key="chapter.slug"
          class="mb-4"
        >
          <template #header>
            <div class="flex flex-col">
              <h4 class="text-left text-xl font-medium">
                {{ chapter.title }}
              </h4>
              <span
                v-if="percentageCompleted && user"
                class="text-emerald-500 text-sm"
              >
                Completed: {{ percentageCompleted.chapters[index] }}%
              </span>
            </div>
          </template>
          <template #content>
            <ul class="list-none p-4">
              <li v-for="lesson in chapter.lessons" :key="lesson.slug">
                <NuxtLink
                  v-if="'path' in lesson"
                  :to="lesson.path"
                  class="flex flex-row space-x-1 no-underline prose-sm py-1"
                  :class="
                    $route.fullPath === lesson.path
                      ? 'font-normal text-green-700'
                      : 'font-normal text-gray-600'
                  "
                >
                  <span>{{ lesson.number }}.</span>
                  <span>{{ lesson.title }}</span>
                  <IconsTick
                    v-if="progress?.[chapter.slug]?.[lesson.slug]"
                    class="shrink-0 text-emerald-500"
                  />
                </NuxtLink>
              </li>
            </ul>
          </template>
        </Accordion>

        <div
          v-if="percentageCompleted && user"
          class="mt-8 text-sm font-medium text-gray-500 flex justify-between items-center"
        >
          Course completion:
          <span> {{ percentageCompleted.course }}% </span>
        </div>
      </div>
    </div>
  </div>
</template>
