<script setup>
const user = useSupabaseUser();
const route = useRoute();

watchEffect(async () => {
  if (user.value) {
    // cookies are sent automatically by the browser for same-origin requests
    await $fetch(`/api/user/linkWithPurchase/${route.params.paymentId}`);

    await navigateTo("/", {
      replace: true,
    });
  }
});
</script>

<template>
  <div />
</template>
