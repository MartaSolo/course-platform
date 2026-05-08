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
  <div>Waiting for login...</div>
</template>
