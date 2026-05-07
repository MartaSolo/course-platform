export default defineNuxtRouteMiddleware((to, _from) => {
  const navigationHistory = useLocalStorage<string[]>("history", []);
  navigationHistory.value.push(to.fullPath);
});
