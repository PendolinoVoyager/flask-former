import { notFound } from "next/navigation";
const BASE_URL = "http://localhost:8080/api/v1";
export async function fetchAll(): Promise<Form[]> {
  const res = await fetch(`${BASE_URL}/forms`);
  if (!res.ok) throw new Error("Failed to fetch forms");
  if (res.status === 404) notFound();
  const json = await res.json();
  if (json.status === "fail") throw new Error("Something went wrong");

  return json.data;
}
