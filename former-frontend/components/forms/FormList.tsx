import { Form } from "@/misc/types";
import FormCard from "./FormCard";
import classes from "./FormCard.module.css";
interface FormListProps {
  title?: string;
  forms: Form[];
}

export default function FormList({ forms, title }: FormListProps) {
  if (forms.length === 0) return <h2>No results found!</h2>;
  return (
    <>
      {title && <h2>{title}</h2>}
      <ul className={classes["form-list"]}>
        {forms.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </ul>
    </>
  );
}
