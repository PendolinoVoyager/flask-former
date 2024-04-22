import { fetchAll } from "@/misc/http";
import FormList from "./FormList";

export default async function AllForms() {
  const forms = await fetchAll();
  return <FormList forms={forms} />;
}
