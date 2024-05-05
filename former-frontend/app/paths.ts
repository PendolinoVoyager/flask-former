export enum AvailablePaths {
  HOME = "HOME",
  ALL_FORMS = "ALL_FORMS",
  FORM = "FORM",
  ANSWER = "ANSWER",
  ANALYTICS = "ANALYTICS",
  BOOKMARKS = "BOOKMARKS",
  CREATE = "CREATE",
}

export interface PathMap {
  [AvailablePaths.HOME]: string;
  [AvailablePaths.ALL_FORMS]: string;
  [AvailablePaths.FORM]: string;
  [AvailablePaths.ANSWER]: string;
  [AvailablePaths.ANALYTICS]: string;
  [AvailablePaths.BOOKMARKS]: string;
  [AvailablePaths.CREATE]: string;
}

export const PATH: PathMap = {
  [AvailablePaths.HOME]: "/",
  [AvailablePaths.ALL_FORMS]: "/explore",
  [AvailablePaths.FORM]: "/form/<SLUG1>",
  [AvailablePaths.ANSWER]: "/form/<SLUG1>/answer",
  [AvailablePaths.ANALYTICS]: "/form/<SLUG1>/analytics",
  [AvailablePaths.BOOKMARKS]: "/bookmarks",
  [AvailablePaths.CREATE]: "/create",
};

export const constructPath = function (
  path: AvailablePaths,
  ...slugs: string[]
): string {
  let newPath: string = PATH[path]; // Access the string path from the PATH object
  slugs.forEach((slug, i) => {
    newPath = newPath.replace(`<SLUG${i + 1}>`, slug);
  });
  return newPath;
};
