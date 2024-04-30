"use client";
import { ChangeEventHandler, useState } from "react";
import FormLoader from "./FormLoader";
import SearchBar from "./SearchBar";

export default function FormExplorer() {
  const [searchPhrase, setSearchPhrase] = useState("");
  function handleChange<ChangeEventHandler>(e: any) {
    console.log(e.target.value);
  }
  return (
    <>
      <SearchBar onChange={handleChange} />
      <FormLoader query_str={searchPhrase} />
    </>
  );
}
