<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <NuxtLayout>
    <div class="prose flex flex-col items-center">
      <h2>{{ error?.status }}</h2>
      <p>{{ error?.message }}</p>
      <button @click="clearError({ redirect: '/' })">Clear errors</button>
    </div>
  </NuxtLayout>
</template>
