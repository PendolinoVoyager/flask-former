"use client";
import { fetchForms } from "@/misc/http";
import FormList from "./FormList";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";
interface FormLoaderProps {
  query_str?: string;
}
export default function FormLoader({ query_str }: FormLoaderProps) {
  //TODO: Cache them results
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function load(query: string) {
      setIsLoading(true);
      try {
        const forms = await fetchForms(query);
        setForms(forms);
      } catch (err) {
        console.error(err);
        setForms([]);
      }
      setIsLoading(false);
    }
    load(query_str ?? "");
  }, [query_str]);
  return (
    <>
      {isLoading && <Spinner />}
      <FormList forms={forms} />
    </>
  );
}
