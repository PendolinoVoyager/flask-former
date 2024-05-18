import { ComponentType, NumberComponent } from "@/misc/types"; // Adjust the import path as necessary
import styles from "../FormComponent.module.css";
import { ForwardedRef, Ref, forwardRef, memo, useImperativeHandle } from "react";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructor";
import { Controller, useForm } from "react-hook-form";

const NumberEdit = memo(forwardRef( function NumberEdit({
  label,
  defaultValue,
  min,
  max,
  isInteger,
}: NumberComponent, ref: ForwardedRef<EditComponentHandleInterface<NumberComponent>>) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    defaultValues: {
      label: label,
      defaultValue: defaultValue,
      min,
      max,
      isInteger,
      type: ComponentType.Number,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  useImperativeHandle<any, EditComponentHandleInterface<NumberComponent>>(
    ref,
    () => ({
      validateComponent: () => {
        handleSubmit(() => {})();
      },
      isValid: () => {
        return isValid;
      },
      getFormData: () => {
        return getValues() as NumberComponent;
      },
    })
  );
  return (
    <form className={`${styles.component} ${styles.editing}`} ref={ref as Ref<HTMLFormElement>}>
      <input type="hidden" {...register('type')}/>
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
      <div>
        <span>Default Value</span>
        <Controller
          name="defaultValue"
          control={control}
          render={({ field }) => (
            <input
              className={styles.input}
              {...field}
              type="number"
              placeholder="Edit default value"
              step={isInteger ? 1 : ""}
            />
          )}
        />
      </div>
      <div>
        <span>Min</span>
        <Controller 
        name="min"
        control={control}
        render={({ field }) => (
          <input
          className={styles.numberInput}
          {...field}
          type="number"
          defaultValue={min}
          placeholder="Edit min value"
          step={isInteger ? 1 : "any"}
        />

        )}
       />
      </div>
      <div>
        <span>Max</span>
        <Controller 
        name="max"
        control={control}
        render={({ field }) => (
          <input
          className={styles.numberInput}
          {...field}
          type="number"
          defaultValue={min}
          placeholder="Edit max value"
          step={isInteger ? 1 : "any"}
        />

        )}
       />
      </div>
      <div className={styles.label}>
        <span>Integer only</span>
        <input className="" type="checkbox" defaultChecked={isInteger} {...register("isInteger")}/>
  
      </div>
    </form>
  );
}
))
export default NumberEdit;
