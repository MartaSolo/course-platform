<script setup lang="ts">
const route = useRoute();

const user = useSupabaseUser();

const safeRedirectTarget = computed(() =>
  safeRedirectPath(route.query.redirectTo)
);

watch(
  user,
  async () => {
    if (!user.value) return;
    await navigateTo(safeRedirectTarget.value, {
      replace: true,
    });
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="prose w-full mt-20 mx-auto max-w-2xl flex flex-col items-center justify-center"
  >
    <h1>Waiting for login...</h1>
  </div>
</template>
