//IGNORE: REWORK IN PROGRESS
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { useExposeHandle } from "@/misc/hooks";
import { ComponentType, FormComponentType } from "@/misc/types";
import { ForwardedRef, Ref, forwardRef } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "../FormComponent.module.css"
interface EditableComponentProps {
  component: FormComponentType
}
// Why and how:
// 
const EditableComponent = forwardRef( function EditableComponent
  ({component}: EditableComponentProps,
   ref) {
    switch (component.type) {
      case ComponentType.CheckBox:
        return <EditableComponentChoices component={component} ref={ref} />;
    default:
      return <EditableComponentSingleInput component={component} ref={ref as Ref<EditComponentHandleInterface<unknown>>} />;
    }
        
});
const EditableComponentChoices = forwardRef(function _EditableComponentChoices 
  ({component}: EditableComponentProps,
  ref) {
    return <div></div>
  });

  const EditableComponentSingleInput = forwardRef(function _EditableComponentSingleInput 
    ({component}: EditableComponentProps,
    ref: ForwardedRef<EditComponentHandleInterface<unknown>>) {
      const { control, handleSubmit, formState: { errors, isValid }, getValues, register } = useForm({
        defaultValues: {
          ...component
        }
      });
      useExposeHandle(ref, {getValues, isValid, handleSubmit});
      const inputType = component.type === ComponentType.DateTime ? "datatime-local" : component.type;
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
          {Object.entries(component).filter(kv => kv[0] !== "label" && kv[0] !== "type").map( ([fieldName, fieldValue]) => {

            return  <div>
            <span>{fieldName}</span>
            <Controller
              //@ts-ignore
              name={fieldName}
              control={control}
              render={({ field }) => (
                //@ts-ignore
                <input
                  className={styles.input}
                  {...field}
                  type={inputType}
                  placeholder="Edit default value"
                />
              )}
            />
          </div>
          })}
        </form>
      );
    });
  export default EditableComponent;