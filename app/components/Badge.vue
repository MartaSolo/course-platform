<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
  }>(),
  {
    color: "bg-emerald-400",
  }
);
</script>

<template>
  <span
    class="text-xl w-8 h-8 text-white rounded-full inline-flex items-center justify-center mr-4"
    :class="`${color}`"
  >
    <slot>&#10003;</slot>
  </span>
</template>
