import { ForwardedRef, Ref, forwardRef, useImperativeHandle } from "react";
import { ComponentType, RadioComponent } from "@/misc/types";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import styles from "../FormComponent.module.css";
import { useEditableRHF, useExposeHandle } from "@/misc/hooks";
import EditablePreamble from "../editableHelpers/EditablePreamble";
import ChoicesFieldArray from "../editableHelpers/ChoicesFieldArray";
interface _Props {
  component: RadioComponent;
}
const RadioEdit = forwardRef(function RadioEdit(
  { component }: _Props,
  ref: ForwardedRef<EditComponentHandleInterface<ComponentType.Radio>>
) {
  const formState = useEditableRHF<RadioComponent>(ref, component);
  const { control, errors } = formState;

  return (
    <form
      className={`${styles.component} ${styles.editing}`}
      ref={ref as Ref<HTMLFormElement>}
    >
      <EditablePreamble component={component} formState={formState as any}>
        Radio (single choice) component
      </EditablePreamble>
      <div className={styles.checkboxGroup}>
        <ChoicesFieldArray name="choices" control={control} />
      </div>
    </form>
  );
});
export default RadioEdit;
