<script setup lang="ts">
defineProps<{
  videoSrc: string;
  title: string;
}>();
</script>

<template>
  <div class="aspect-video">
    <iframe
      class="h-full w-full"
      :src="videoSrc"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  </div>
</template>
