import {
  ComponentType,
  TextComponent as ITextComponent,
  TextComponent,
} from "@/misc/types";
import styles from "../FormComponent.module.css";
import { ForwardedRef, Ref, forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";

const TextComponentEdit = forwardRef(function TextComponentEdit(
  { label, defaultValue }: ITextComponent,
  ref: ForwardedRef<EditComponentHandleInterface<ComponentType.Text>>
) {
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
      type: ComponentType.Text,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  useImperativeHandle<any, EditComponentHandleInterface<TextComponent>>(
    ref,
    () => ({
      validateComponent: () => {
        handleSubmit(() => {})();
      },
      isValid: () => {
        return isValid;
      },
      getFormData: () => {
        return getValues() as TextComponent;
      },
    })
  );
  return (
    <form
      ref={ref as Ref<HTMLFormElement>}
      onSubmit={handleSubmit(() => {})}
      className={`${styles.component} ${styles.editing}`}
    >
      <h2 className={Object.keys(errors).length ? styles.errorColor : ""}>
        Text field
      </h2>
      <input type="hidden" {...register("type")} />
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
              type="text"
              placeholder="Edit default value"
            />
          )}
        />
      </div>
    </form>
  );
});
export default TextComponentEdit;
