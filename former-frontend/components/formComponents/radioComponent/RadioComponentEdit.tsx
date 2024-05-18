import { ForwardedRef, Ref, forwardRef, useImperativeHandle } from "react";
import { ComponentType, RadioComponent } from "@/misc/types";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import styles from "../FormComponent.module.css";
const RadioEdit = forwardRef(function RadioEdit(
  { defaultValue, label, choices }: RadioComponent,
  ref: ForwardedRef<EditComponentHandleInterface<ComponentType.Radio>>
) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    defaultValues: {
      label,
      defaultValue,
      choices,
      type: ComponentType.Radio,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    //@ts-ignore
    name: "choices",
  });
  const handleAddOption = () => {
    append("");
  };

  useImperativeHandle<any, EditComponentHandleInterface<RadioComponent>>(
    ref,
    () => ({
      validateComponent: () => {
        handleSubmit(() => {})();
      },
      isValid: () => {
        return isValid;
      },
      getFormData: () => {
        return getValues() as RadioComponent;
      },
    })
  );

  return (
    <form
      className={`${styles.component} ${styles.editing}`}
      ref={ref as Ref<HTMLFormElement>}
    >
      <h2 className={Object.keys(errors).length ? styles.errorColor : ""}>
        Radio (single choice) field
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
      <div className={styles.cherackboxGroup}>
        {fields.map((item, index) => (
          <div key={item.id} className={styles.optionControls}>
            <Controller
              name={`choices.${index}`}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className={styles.input}
                    {...field}
                    type="text"
                    placeholder={`Option ${index + 1}`}
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
export default RadioEdit;
