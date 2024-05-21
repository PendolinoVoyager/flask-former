"use client";
import { fetchForms } from "@/misc/actions";
import FormList from "./FormList";
import { useCallback, useEffect, useState } from "react";
import Spinner from "../UI/Spinner";
import { Form } from "@/misc/types";
import { useAsyncLoad } from "@/misc/hooks";
interface FormLoaderProps {
  query_str?: string;
}
export default function FormLoader({ query_str }: FormLoaderProps) {
  //TODO: Cache them results
  let fetchFunction = useCallback(() => fetchForms(query_str), [query_str]);
  const { error, isLoading, data } = useAsyncLoad<Form[]>(fetchFunction, [
    query_str,
  ]);
  if (error)
    return (
      <div className="error">
        <h1>Ooops! Shitty Python server is down again.</h1>
        <p>{error.message}</p>
      </div>
    );
  return isLoading ? <Spinner /> : <FormList forms={data} />;
}
