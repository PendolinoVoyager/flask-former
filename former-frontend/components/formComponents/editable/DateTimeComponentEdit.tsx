import { DateTimeComponent } from "@/misc/types";
import styles from "../FormComponent.module.css";
import { ForwardedRef, Ref, forwardRef } from "react";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { useEditableRHF } from "@/misc/hooks";
import EditablePreamble from "../editableHelpers/EditablePreamble";
interface _Props {
  component: DateTimeComponent;
}
const DateTimeEdit = forwardRef(function DateEdit(
  { component }: _Props,
  ref: ForwardedRef<EditComponentHandleInterface<DateTimeComponent>>
) {
  const formState = useEditableRHF(ref, component);

  return (
    <form
      className={`${styles.component} ${styles.editing}`}
      ref={ref as Ref<HTMLFormElement>}
    >
      <EditablePreamble component={component} formState={formState as any}>
        Date and time field
      </EditablePreamble>
    </form>
  );
});
export default DateTimeEdit;
