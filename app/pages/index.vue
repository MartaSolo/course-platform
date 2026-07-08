<script setup lang="ts">
const course = await useCourse();

const firstLesson = await useFirstLesson();
</script>

<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Welcome to {{ course.title }}</h1>
    <NuxtLink :to="firstLesson?.path ?? '/'" class="underline font-medium">
      Go to first lesson
    </NuxtLink>
  </div>
</template>
