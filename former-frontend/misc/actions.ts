"use server";
import { redirect } from "next/navigation";
import { setTimeoutRequest, BASE_URL, cleanData, fileToBase64 } from "./http";
import { Form, FormComponentType } from "./types";
import { AvailablePaths, constructPath } from "@/app/paths";
import { revalidatePath } from "next/cache";
import { filterXSS } from "xss";
import { AnalysisRequest } from "./types";
const xss = require("xss");
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

export async function submitForm(
  components: FormComponentType[],
  details: { name: string; key?: string; image?: string; description?: string }
) {
  console.log(components);
  cleanData(details);
  Object.values(details).forEach((v) => filterXSS(v));
  components.forEach((c) => {
    cleanData(c);
    Object.values(c).forEach((cv) => filterXSS(cv));
  });

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
  const json = await res.json();
  if (json.status === "fail") throw new Error(json.message);
  revalidatePath(constructPath(AvailablePaths.ALL_FORMS));
  redirect(constructPath(AvailablePaths.FORM, json.data.id));
}

export async function answerForm(form: Form["id"], answers: any[]) {
  const res = await fetch(`${BASE_URL}/answers/${form}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  });
  console.log(res);
  if (!res.ok) throw new Error("Your answer didn't get through.");
  const data = await res.json();
  console.log(data);
  if (data.status === "fail")
    throw new Error("Something went wrong: " + data.message);
  revalidatePath(constructPath(AvailablePaths.ANALYTICS, form));
  redirect(constructPath(AvailablePaths.ANALYTICS, form));
}
export async function analyticsByCriteria(
  form: Form["id"],
  request: AnalysisRequest[]
) {
  const body = {
    analysis_requests: request,
  };
  console.log(body);
  const res = await fetch(`${BASE_URL}/analysis/${form}/by_criteria`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
    body: JSON.stringify(body),
  });
  const res_json = await res.json();
  console.log(res_json);
  if (res_json.status === "fail")
    throw new Error(res_json.message ?? "Something went wrong!");
  return res_json.data;
}
