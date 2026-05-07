export const useFirstLesson = () => {
  const { chapters } = useCourse();

  const firstLesson = `/course/chapter/${chapters[0]?.slug}/lesson/${
    chapters[0]?.lessons[0]?.slug ?? ""
  }`;

  return {
    firstLesson,
  };
};
