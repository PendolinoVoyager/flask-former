import { notFound } from "next/navigation";
export const BASE_URL = "http://localhost:8080/api/v1";
export const IMAGE_URL = "http://localhost:8080/images";
export async function fetchForms(query?: string): Promise<Form[]> {
  let res: Response;
  if (!query) res = await fetch(`${BASE_URL}/forms`);
  else res = await fetch(`${BASE_URL}/forms/search?name=${query}`);

  if (!res.ok) throw new Error("Failed to fetch forms");
  if (res.status === 404) notFound();
  const json = await res.json();
  if (json.status === "fail") throw new Error("Something went wrong");

  return json.data;
}
