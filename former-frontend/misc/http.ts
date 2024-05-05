import type { Form } from "@/misc/types";
export const BASE_URL = "http://localhost:8080/api/v1";
export const IMAGE_URL = "http://localhost:8080/images";
export const DEF_TIMEOUT = 15_000;
export async function setTimeoutRequest(
  promise: Promise<any>,
  ms: number = DEF_TIMEOUT
) {
  const t = new Promise((res, rej) => setTimeout(rej, ms));
  return Promise.race([t, promise]);
}
export async function fetchForms(query?: string): Promise<Form[]> {
  let res: Response;
  if (!query) res = await setTimeoutRequest(fetch(`${BASE_URL}/forms`));
  else
    res = await setTimeoutRequest(
      fetch(`${BASE_URL}/forms/search?name=${query}`)
    );

  if (!res.ok) throw new Error("The server didn't respond. Please try again.");

  const json = await res.json();
  if (json.status === "fail") throw new Error("Something went wrong.");

  return json.data;
}
export async function fetchForm(id: string): Promise<Form | Error> {
  try {
    const res = await setTimeoutRequest(fetch(`${BASE_URL}/forms/${id}`));
    if (!res.ok) throw new Error("Failed to fetch form.");
    const json = await res.json();
    if (json.status === "fail") throw new Error(json.message);
    return json.data as Form;
  } catch (err) {
    return err as Error;
  }
}
