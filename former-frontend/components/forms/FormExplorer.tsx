"use client";
import { ChangeEventHandler, useState, useRef } from "react";
import FormLoader from "./FormLoader";
import SearchBar from "./SearchBar";

export default function FormExplorer() {
  const [searchPhrase, setSearchPhrase] = useState("");

  const timeout = useRef<NodeJS.Timeout | null>(null); // Variable to store the timeout ID

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    const query = e.target.value;

    timeout.current = setTimeout(() => {
      setSearchPhrase(query);
    }, 300);
  }

  return (
    <>
      <SearchBar onChange={handleChange} />
      <FormLoader query_str={searchPhrase} />
    </>
  );
}
