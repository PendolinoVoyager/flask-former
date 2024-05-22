// f - you typescript
//@ts-nocheck
import {
  Controller,
  UseFormStateProps,
  UseFormStateReturn,
} from "react-hook-form";
import styles from "../FormComponent.module.css";
import {
  ComponentType,
  FormComponentType,
  getNativeHTMLInputType,
} from "@/misc/types";
import { UseEditableRHFReturn } from "@/misc/hooks";
interface EditablePreambleProps<T extends FormComponentType> {
  component: T;
  children: string;
  formState: UseEditableRHFReturn<T>;
}

const EditablePreamble = function <T extends FormComponentType>({
  component,
  formState: { control, register, errors },
  children,
}: EditablePreambleProps<T>) {
  return (
    <>
      <h2 className={Object.keys(errors).length ? styles.errorColor : ""}>
        {children}
      </h2>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <input type="hidden" {...field} value={component.type} />
        )}
      />
      <div
        className={`${styles.label} ${errors.label ? styles.errorField : ""}`}
      >
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
              placeholder={
                errors.label ? (errors.label?.message as string) : "Edit label"
              }
              required
            />
          )}
        />
      </div>
      <div className={`${styles.label} ${styles.optionControls}`}>
        <span>Required</span>
        <input type="checkbox" {...register("required")} />
      </div>
      {component.type !== ComponentType.CheckBox &&
        component.type !== ComponentType.Radio && (
          <div>
            <span>Default Value</span>
            <Controller
              name="defaultValue"
              control={control}
              render={({ field }) => (
                <input
                  className={styles.input}
                  {...field}
                  type={getNativeHTMLInputType(component.type)}
                  placeholder="Edit default value"
                />
              )}
            />
          </div>
        )}
    </>
  );
};
export default EditablePreamble;
