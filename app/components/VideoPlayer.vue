<script setup lang="ts">
const props = defineProps<{
  videoId: number;
}>();
</script>

<template>
  <div class="video-wrapper">
    <iframe
      :src="`https://player.vimeo.com/video/${props.videoId}`"
      title="Video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
