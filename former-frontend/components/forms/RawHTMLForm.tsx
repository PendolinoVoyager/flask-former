"use server";
import { Form } from "@/misc/types";
import RawHTMLComponentFactory from "../formComponents/RawHTMLComponentFactory";

interface RawHTMLFormProps {
  form: Form;
  hidden?: boolean;
}
const RawHTMLForm = function ({ form, hidden = false }: RawHTMLFormProps) {
  return (
    <form style={hidden ? { display: "none" } : {}}>
      {form.components.map((c) => (
        <RawHTMLComponentFactory component={c} key={c.label} />
      ))}
    </form>
  );
};
export default RawHTMLForm;
