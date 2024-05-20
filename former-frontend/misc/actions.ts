"use server";
import { redirect } from "next/navigation";
import { setTimeoutRequest, BASE_URL, cleanData } from "./http";
import { Form, FormComponentType } from "./types";
import { AvailablePaths, PATH, constructPath } from "@/app/paths";
import { revalidatePath } from "next/cache";

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
export async function submitForm(
  components: FormComponentType[],
  details: { name: string; key?: string; image?: string; description?: string }
) {
  cleanData(details);
  components.forEach((c) => cleanData(c));
  const body = JSON.stringify({
    form: {
      components,
      ...details,
    },
  });
  const res = await fetch(`${BASE_URL}/forms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (!res.ok) throw new Error("Ooops! Couldn't create the form...");
  const json = await res.json();
  revalidatePath(constructPath(AvailablePaths.ALL_FORMS));
  redirect(constructPath(AvailablePaths.FORM, json.data.id));
}
