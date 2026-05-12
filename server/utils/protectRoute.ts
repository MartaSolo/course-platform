import type { H3Event } from "h3";

// If the user does not exist, throw a 401 error
export default (event: H3Event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
};
