"use server";
import { Form } from "@/misc/types";
import RawHTMLComponentFactory from "../formComponents/RawHTMLComponentFactory";
import SquareButton from "../UI/SquareButton";

interface RawHTMLFormProps {
  form: Form;
  onSubmit?: () => any;
  hidden?: boolean;
}
const RawHTMLForm = function ({
  form,
  hidden = false,
  onSubmit,
  ...props
}: RawHTMLFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      style={hidden ? { display: "none" } : {}}
      {...props}
    >
      {form.components.map((c) => (
        <RawHTMLComponentFactory component={c} key={c.label} />
      ))}
      <SquareButton>Submit answers</SquareButton>
    </form>
  );
};
export default RawHTMLForm;
