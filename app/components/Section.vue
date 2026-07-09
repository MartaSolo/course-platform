<script setup lang="ts">
defineProps<{
  title?: string;
}>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="section bg-white px-8 py-12 lg:p-24 flex flex-col items-center">
    <div class="w-full">
      <h2 v-if="title" class="text-2xl lg:text-4xl font-bold pb-8 text-center">
        {{ title }}
      </h2>
      <div v-bind="$attrs">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.section:nth-of-type(even) {
  @apply bg-blue-500 text-white;
}
</style>
