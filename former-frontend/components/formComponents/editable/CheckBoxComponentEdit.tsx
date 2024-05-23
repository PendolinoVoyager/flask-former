import { ForwardedRef, Ref, forwardRef } from "react";
import { CheckboxComponent, ComponentType } from "@/misc/types";
import styles from "../FormComponent.module.css";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { useEditableRHF } from "@/misc/hooks";
import EditablePreamble from "../editableHelpers/EditablePreamble";
import ChoicesFieldArray from "../editableHelpers/ChoicesFieldArray";
interface _Props {
  component: CheckboxComponent;
}
const CheckBoxComponentEdit = forwardRef(function CheckBoxComponentEdit(
  { component }: _Props,
  ref: ForwardedRef<EditComponentHandleInterface<ComponentType.CheckBox>>
) {
  const formState = useEditableRHF(ref, component);
  const { register, isValid, getValues, control, errors } = formState;

  return (
    <form
      className={`${styles.component} ${styles.editing}`}
      ref={ref as Ref<HTMLFormElement>}
    >
      <EditablePreamble component={component} formState={formState as any}>
        CheckBox (multiple choice) component
      </EditablePreamble>
      <ChoicesFieldArray name="choices" control={control} />
    </form>
  );
});

export default CheckBoxComponentEdit;
