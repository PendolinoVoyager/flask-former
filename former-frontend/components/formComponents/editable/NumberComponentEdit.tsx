import { ComponentType, NumberComponent } from "@/misc/types"; // Adjust the import path as necessary
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

const NumberEdit = memo(
  forwardRef(function NumberEdit(
    { label, defaultValue, min, max, isInteger }: NumberComponent,
    ref: ForwardedRef<EditComponentHandleInterface<NumberComponent>>
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
      <form
        className={`${styles.component} ${styles.editing}`}
        ref={ref as Ref<HTMLFormElement>}
      >
        <h2 className={Object.keys(errors).length ? styles.errorColor : ""}>
          Numeric field
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
        <div>
          <span>Default Value</span>

          <input
            className={`${styles.input} ${
              errors.defaultValue ? styles.errorBorder : ""
            }`}
            {...register("defaultValue", {
              //major bull: value is a string actually :)
              //@ts-ignore
              validate: (value: string, { min, max }) =>
                value == "" ||
                (!isNaN(parseFloat(value)) &&
                  isFinite(+value) &&
                  (min == null || +value >= min) &&
                  (max == null || +value <= max)),
            })}
            type="number"
            placeholder="Edit default value"
            step={isInteger ? 1 : ""}
          />
        </div>
        <div>
          <span>Min</span>

          <input
            className={`${styles.numberInput} ${
              errors.min ? styles.errorBorder : ""
            }`}
            {...register("min", {
              validate: (value) =>
                //@ts-ignore
                value == "" ||
                //@ts-ignore
                (!isNaN(parseFloat(value)) && isFinite(value)),
            })}
            type="number"
            defaultValue={min}
            placeholder="Edit min value"
            step={isInteger ? 1 : "any"}
          />
        </div>
        <div>
          <span>Max</span>

          <input
            className={`${styles.numberInput} ${
              errors.max ? styles.errorBorder : ""
            }`}
            {...register("max", {
              validate: (value) =>
                //@ts-ignore
                value == "" || (!isNaN(parseFloat(+value)) && isFinite(value)),
            })}
            type="number"
            defaultValue={max}
            placeholder="Edit max value"
            step={isInteger ? 1 : "any"}
          />
        </div>
        <div className={`${styles.label} ${styles.optionControls}`}>
          <span>Integer only</span>
          <input
            className=""
            type="checkbox"
            defaultChecked={isInteger}
            {...register("isInteger")}
          />
        </div>
      </form>
    );
  })
);
export default NumberEdit;
