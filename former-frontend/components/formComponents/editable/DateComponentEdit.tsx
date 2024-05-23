import { DateComponent } from "@/misc/types";
import styles from "../FormComponent.module.css";
import { ForwardedRef, Ref, forwardRef } from "react";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { useEditableRHF } from "@/misc/hooks";
import EditablePreamble from "../editableHelpers/EditablePreamble";
interface _Props {
  component: DateComponent;
}
const DateEdit = forwardRef(function DateEdit(
  { component }: _Props,
  ref: ForwardedRef<EditComponentHandleInterface<DateComponent>>
) {
  const formState = useEditableRHF(ref, component);

  return (
    <form
      className={`${styles.component} ${styles.editing}`}
      ref={ref as Ref<HTMLFormElement>}
    >
      <EditablePreamble component={component} formState={formState as any}>
        Date field
      </EditablePreamble>
    </form>
  );
});
export default DateEdit;
