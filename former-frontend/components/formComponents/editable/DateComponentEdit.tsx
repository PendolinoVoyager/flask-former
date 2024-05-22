import { ComponentType, DateComponent } from "@/misc/types"; // Adjust the import path as necessary
import styles from "../FormComponent.module.css";
import { ForwardedRef, Ref, forwardRef, useImperativeHandle } from "react";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { Controller, useForm } from "react-hook-form";
import { useExposeHandle } from "@/misc/hooks";

const DateEdit = forwardRef(function DateEdit(
  { label, defaultValue }: DateComponent,
  ref: ForwardedRef<EditComponentHandleInterface<DateComponent>>
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
      type: ComponentType.Date,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  useExposeHandle(ref, { getValues, isValid, handleSubmit });

  return (
    <form
      className={`${styles.component} ${styles.editing}`}
      ref={ref as Ref<HTMLFormElement>}
    >
      <h2 className={Object.keys(errors).length ? styles.errorColor : ""}>
        Date field
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
              defaultValue={defaultValue}
              required
            />
          )}
        />
      </div>
      <div>
        <span>Default Value</span>

        <input
          className={`${styles.input} ${
            errors.defaultValue ? styles.errorBorder : ""
          }`}
          {...register("defaultValue")}
          type="date"
          placeholder="Edit default value"
        />
      </div>
    </form>
  );
});
export default DateEdit;
