<script setup lang="ts">
const course = await useCourse();

const route = useRoute();

const supabase = useSupabaseClient();

const user = useSupabaseUser();

const postLoginPath = computed(() => safeRedirectPath(route.query.redirectTo));

watchEffect(async () => {
  if (!user.value) return;
  await navigateTo(postLoginPath.value, { replace: true });
});

const login = async () => {
  const redirectTo = `${
    window.location.origin
  }/confirm?redirectTo=${encodeURIComponent(postLoginPath.value)}`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  });

  if (error) console.error(error);
};
</script>

<template>
  <div
    class="prose w-full mt-20 mx-auto max-w-2xl flex flex-col items-center justify-center"
  >
    <h1>Log in to {{ course.title }}</h1>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="login"
    >
      Log in with Github
    </button>
  </div>
</template>
