<script setup lang="ts">
const { title } = useCourse();

const { firstLesson } = useFirstLesson();
</script>

<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Welcome to {{ title }}</h1>
    <NuxtLink :to="firstLesson" class="underline font-medium"
      >Go to first lesson</NuxtLink
    >
  </div>
</template>
