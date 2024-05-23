"use server";
import { redirect } from "next/navigation";
import { setTimeoutRequest, BASE_URL, cleanData } from "./http";
import { Form, FormComponentType } from "./types";
import { AvailablePaths, constructPath } from "@/app/paths";
import { revalidatePath } from "next/cache";

export async function fetchForms(query?: string): Promise<Form[]> {
  let res: Response;
  if (!query)
    res = await setTimeoutRequest(
      fetch(`${BASE_URL}/forms`, { method: "GET" })
    );
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
interface SubmittedFormData {
  components: FormComponentType[],
  details: { name: string; key?: string; image?: File }
}
export async function submitForm(
  components: FormComponentType[],
  details: { name: string; key?: string; image?: File }
) {
  const formData = new FormData();
  components.forEach((c) => {
    formData.append("components", JSON.stringify(c));
  });
  Object.keys(details).forEach((key) => {
    if (key !== "image") {
      //@ts-ignore
      formData.append(key, details[key]);
    } else if (details.image) {
      formData.append("image", details.image, details.image.name);
    }
  });

  const res = await fetch(`${BASE_URL}/forms`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Ooops! Couldn't create the form...");
  const json = await res.json();
  revalidatePath(constructPath(AvailablePaths.ALL_FORMS));
  redirect(constructPath(AvailablePaths.FORM, json.data.id));
}
