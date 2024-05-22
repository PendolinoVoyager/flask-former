import { ForwardedRef, Ref, forwardRef, useImperativeHandle } from "react";
import { CheckboxComponent, ComponentType } from "@/misc/types";
import styles from "../FormComponent.module.css";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useExposeHandle } from "@/misc/hooks";
interface _Props {
  component: CheckboxComponent;
}
const CheckBoxComponentEdit = forwardRef(function CheckBoxComponentEdit(
  { component }: _Props,
  ref: ForwardedRef<EditComponentHandleInterface<ComponentType.CheckBox>>
) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    defaultValues: {
      ...component,
      choices: component.choices,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  useExposeHandle(ref, { getValues, isValid, handleSubmit });
  const { fields, append, remove } = useFieldArray({
    control,
    //@ts-ignore
    name: "choices",
  });
  const handleAddOption = () => {
    append("");
  };
  return (
    <form
      className={`${styles.component} ${styles.editing}`}
      ref={ref as Ref<HTMLFormElement>}
    >
      <h2
        className={
          !isValid || !getValues().choices.length ? styles.errorColor : ""
        }
      >
        Checkbox (multiple choice) field
      </h2>

      <input type="hidden" {...register("type")} />
      <div className={styles.label}>
        <span>Label</span>
        <Controller
          name="label"
          control={control}
          rules={{ required: "Label is required" }}
          render={({ field }) => (
            <input
              className={styles.editField}
              {...field}
              type="text"
              placeholder={errors.label ? errors.label.message : "Edit label"}
              required
            />
          )}
        />
      </div>
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
        onClick={handleAddOption}
      >
        Add Option
      </button>
    </form>
  );
});

export default CheckBoxComponentEdit;
