"use client";
import { ChangeEventHandler } from "react";
interface SearchBarProps {
  onChange: ChangeEventHandler;
}
export default function SearchBar({ onChange }: SearchBarProps) {
  return (
    <div>
      <input type="text" placeholder="Search..." onChange={onChange} />
    </div>
  );
}
