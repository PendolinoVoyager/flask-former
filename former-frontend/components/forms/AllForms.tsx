import { fetchAll } from "@/misc/http";
import FormList from "./FormList";
interface FormLoaderProps {
  query_str?: string;
}
export default async function FormLoader({ query_str }: FormLoaderProps) {
  const forms = await fetchAll();
  if (query_str)
    console.log(
      "\x1b[0;41mFIX ME IMMEDIATELY - ALLFORMS.tsx COMPONENT \x1b[0m"
    );
  return <FormList forms={forms} />;
}
