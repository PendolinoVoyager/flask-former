import { notFound } from "next/navigation";

export async function fetchAll(): Promise<Form[]> {
  try {
    const res = await fetch("http://localhost:8080/api/v1/forms");
    if (!res.ok) throw new Error("Failed to fetch forms");
    if (res.status === 404) notFound();
    const json = await res.json();
    if (json.status === "fail") throw new Error("Something went wrong");

    return json.data;
  } catch (err) {
    throw new Error("Failed to fetch forms");
  }
}
