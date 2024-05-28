import { TimeComponent } from "@/misc/types";
import styles from "../FormComponent.module.css";
import { ForwardedRef, Ref, forwardRef } from "react";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { useEditableRHF } from "@/misc/hooks";
import EditablePreamble from "../editableHelpers/EditablePreamble";
interface _Props {
  component: TimeComponent;
}
const TimeEdit = forwardRef(function TimeEdit(
  { component }: _Props,
  ref: ForwardedRef<EditComponentHandleInterface<TimeComponent>>
) {
  const formState = useEditableRHF(ref, component);

  return (
    <form
      className={`${styles.component} ${styles.editing}`}
      ref={ref as Ref<HTMLFormElement>}
    >
      <EditablePreamble component={component} formState={formState as any}>
        Time field
      </EditablePreamble>
    </form>
  );
});
export default TimeEdit;
