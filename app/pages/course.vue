<script setup lang="ts">
const { chapters } = useCourse();
</script>

<template>
  <div
    class="p-12 bg-gray-100 w-full h-full min-h-screen flex flex-col items-center"
  >
    <div class="prose mb-12">
      <h1>
        <span class="font-medium">
          Course:
          <span class="font-bold">Mastering Nuxt 3</span>
        </span>
      </h1>
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col"
      >
        <h3>Chapters</h3>
        <div
          v-for="chapter in chapters"
          :key="chapter.slug"
          class="space-y-1 mb-4 flex-col"
        >
          <h4>{{ chapter.title }}</h4>
          <NuxtLink
            v-for="lesson in chapter.lessons"
            :key="lesson.slug"
            :to="lesson.path"
            class="flex flex-row space-x-1 no-underline prose-sm py-1"
            :class="
              $route.fullPath === lesson.path
                ? 'font-bold text-blue-600'
                : 'font-normal text-gray-600'
            "
          >
            <span class="text-gray-500">{{ lesson.number }}</span>
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="prose p-12 bg-white rounded-md w-full max-w-[75ch]">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";
</style>
