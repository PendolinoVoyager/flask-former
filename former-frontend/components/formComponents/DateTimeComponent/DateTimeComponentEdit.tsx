import { ComponentType, DateTimeComponent } from "@/misc/types"; // Adjust the import path as necessary
import styles from "../FormComponent.module.css";
import {
  ForwardedRef,
  Ref,
  forwardRef,
  memo,
  useImperativeHandle,
} from "react";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { Controller, useForm } from "react-hook-form";

const DateTimeEdit = forwardRef(function DateTimeEdit(
  { label, defaultValue }: DateTimeComponent,
  ref: ForwardedRef<EditComponentHandleInterface<DateTimeComponent>>
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
      type: ComponentType.Number,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useImperativeHandle<any, EditComponentHandleInterface<DateTimeComponent>>(
    ref,
    () => ({
      validateComponent: () => {
        handleSubmit(() => {})();
      },
      isValid: () => {
        return isValid;
      },
      getFormData: () => {
        return getValues() as DateTimeComponent;
      },
    })
  );
  return (
    <form
      className={`${styles.component} ${styles.editing}`}
      ref={ref as Ref<HTMLFormElement>}
    >
      <h2 className={Object.keys(errors).length ? styles.errorColor : ""}>
        Date and Time field
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
          type="datetime-local"
          placeholder="Edit default value"
        />
      </div>
    </form>
  );
});
export default DateTimeEdit;
