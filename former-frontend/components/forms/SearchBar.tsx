"use client";
import { ChangeEventHandler } from "react";
import classes from "./SearchBar.module.css";
interface SearchBarProps {
  onChange: ChangeEventHandler;
}
export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={onChange}
      className={classes["form-searchbar"]}
    />
  );
}
