<script setup lang="ts">
const isOpen = ref(true);

const accordionId = useId();
const buttonId = `accordion-button-${accordionId}`;
const panelId = `accordion-panel-${accordionId}`;
</script>

<template>
  <div>
    <button
      :id="buttonId"
      type="button"
      class="p-4 bg-gray-100 rounded-md cursor-pointer w-full flex justify-between items-center"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      @click="isOpen = !isOpen"
    >
      <slot name="header" />
      <IconsChevron
        class="shrink-0 transition-transform duration-200 ease-in-out"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>
    <div
      :id="panelId"
      role="region"
      :aria-labelledby="buttonId"
      class="grid transition-[grid-template-rows] duration-200 ease-in-out"
      :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
    >
      <div class="overflow-hidden">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
