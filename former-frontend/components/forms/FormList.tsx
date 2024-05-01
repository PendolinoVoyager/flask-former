import Spinner from "../UI/Spinner";
import FormCard from "./FormCard";
interface FormListProps {
  title?: string;
  forms: Form[];
}

export default function FormList({ forms, title }: FormListProps) {
  if (!forms || forms.length === 0) {
    return <Spinner />;
  }
  return (
    <>
      {title && <h2>{title}</h2>}
      <ul>
        {forms.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </ul>
    </>
  );
}
