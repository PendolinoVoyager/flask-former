export const PATH: Record<string, string> = {
  HOME: "/",
  ALL_FORMS: "/explore",
  FORM: "/form/<SLUG1>",
  ANSWER: "/form/<SLUG1>/answer",
  ANALYTICS: "/form/<SLUG1>/analytics",
  BOOKMARKS: "/bookmarks",
  CREATE: "/create",
};

export const constructPath = function (
  path: keyof typeof PATH,
  ...slugs: string[]
) {
  let newPath = path;
  slugs.forEach((slug, i) => {
    newPath = newPath.replace(`<SLUG${i + 1}>`, slug);
  });
  return newPath;
};
