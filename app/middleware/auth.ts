export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();

  if (user.value || to.params.chapterSlug === "1-chapter-1") return;

  return navigateTo({
    path: "/login",
    query: { redirectTo: to.fullPath },
  });
});
