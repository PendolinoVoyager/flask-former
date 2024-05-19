import { FormComponentType } from "./types";

export const BASE_URL = "http://localhost:8080/api/v1";
export const IMAGE_URL = "http://localhost:8080/images";
export const FILE_SIZE_LIMIT = 2097152; //around 2MB
export const DEF_TIMEOUT = 15_000;
export async function setTimeoutRequest(
  promise: Promise<any>,
  ms: number = DEF_TIMEOUT
) {
  const t = new Promise((res, rej) => setTimeout(rej, ms));
  return Promise.race([t, promise]);
}
export async function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

export function cleanData(obj: Object) {
  Object.entries(obj).forEach(([key, val]) => {
    if (!val) {
      //@ts-ignore
      delete obj[key];
    }
  });
}
