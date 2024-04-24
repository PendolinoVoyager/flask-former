"use client";
import { notFound } from "next/navigation";
import FormCard from "./FormCard";
interface FormListProps {
  title?: string;
  forms: Form[];
}

export default function FormList({ forms, title }: FormListProps) {
  if (!forms || forms.length === 0) {
    notFound();
  }
  return (
    <>
      {title && <h2>{title}</h2>}
      <ul>
        {forms.map((form) => (
          <FormCard key={form.ido} form={form} />
        ))}
      </ul>
    </>
  );
}
