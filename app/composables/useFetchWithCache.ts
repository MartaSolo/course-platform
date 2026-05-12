import { StorageSerializers } from "@vueuse/core";

export const useFetchWithCache = async <T>(url: string) => {
  // Use session storage to cache the lesson
  const cached = useSessionStorage<T>(
    url,
    null,
    // By passing null as default it can't automatically determine which serializer to use, so we need to specify it manually
    {
      serializer: StorageSerializers.object,
    }
  );

  if (!cached.value) {
    const { data, error } = await useFetch<T>(url, {
      headers: useRequestHeaders(["cookie"]),
    });

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch data from cache`,
      });
    }
    // Store the lesson in session storage
    cached.value = data.value as T;
  } else {
    console.log(`Getting value from cache ${url}`);
  }

  return cached;
};
