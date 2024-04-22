"use client";
import { notFound } from "next/navigation";
import FormCard from "./FormCard";
interface FormListProps {
  forms: Form[];
}

export default function FormList({ forms }: FormListProps) {
  if (!forms || forms.length === 0) {
    notFound();
  }
  return (
    <ul>
      {forms.map((form) => (
        <FormCard key={form._id.$oid} form={form} />
      ))}
    </ul>
  );
}
