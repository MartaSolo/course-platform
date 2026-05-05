<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <label
    class="rounded text-white font-bold py-2 px-4 cursor-pointer"
    :class="{
      'bg-green-500': modelValue,
      'bg-gray-500': !modelValue,
    }"
  >
    <input
      type="checkbox"
      class="hidden"
      :value="modelValue"
      @input="() => $emit('update:modelValue', !modelValue)"
    />
    {{ modelValue ? "Completed!" : "Mark as complete" }}
  </label>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

::selection {
  display: none;
}
</style>
