import { ForwardedRef, Ref, forwardRef } from "react";
import { CheckboxComponent, ComponentType } from "@/misc/types";
import styles from "../FormComponent.module.css";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { Controller, useFieldArray } from "react-hook-form";
import { useEditableRHF } from "@/misc/hooks";
import EditablePreamble from "../editableHelpers/EditablePreamble";
interface _Props {
  component: CheckboxComponent;
}
const CheckBoxComponentEdit = forwardRef(function CheckBoxComponentEdit(
  { component }: _Props,
  ref: ForwardedRef<EditComponentHandleInterface<ComponentType.CheckBox>>
) {
  const formState = useEditableRHF(ref, component);
  const { register, isValid, getValues, control, errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    //@ts-ignore
    name: "choices",
  });
  console.log(fields);
  const handleAddOption = () => {
    append("");
  };
  return (
    <form
      className={`${styles.component} ${styles.editing}`}
      ref={ref as Ref<HTMLFormElement>}
    >
      <EditablePreamble component={component} formState={formState as any}>
        CheckBox (multiple choice) component
      </EditablePreamble>
      <div className={styles.checkboxGroup}>
        {fields.map((item, index) => (
          <div key={item.id} className={styles.optionControls}>
            <Controller
              name={`choices.${index}`}
              control={control}
              rules={{ required: "Empty options aren't allowed." }}
              render={({ field }) => (
                <>
                  <input
                    className={styles.input}
                    {...field}
                    type="text"
                    placeholder={
                      //@ts-ignore
                      errors.choices?.at(index)
                        ? //@ts-ignore
                          errors.choices.at(index).message
                        : `Option ${index + 1}`
                    }
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className={`${styles.optionButton} ${styles.remove}`}
                  >
                    Remove
                  </button>
                </>
              )}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.optionButton}
        onClick={() => handleAddOption}
      >
        Add Option
      </button>
    </form>
  );
});

export default CheckBoxComponentEdit;
