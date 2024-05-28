import { NumberComponent } from "@/misc/types"; // Adjust the import path as necessary
import styles from "../FormComponent.module.css";
import { ForwardedRef, Ref, forwardRef, memo } from "react";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { useEditableRHF } from "@/misc/hooks";
import EditablePreamble from "../editableHelpers/EditablePreamble";

interface _Props {
  component: NumberComponent;
}

const NumberEdit = memo(
  forwardRef(function NumberEdit(
    { component }: _Props,
    ref: ForwardedRef<EditComponentHandleInterface<NumberComponent>>
  ) {
    const formState = useEditableRHF<NumberComponent>(ref, component);
    const { register, errors } = formState;

    return (
      <form
        className={`${styles.component} ${styles.editing}`}
        ref={ref as Ref<HTMLFormElement>}
      >
        <EditablePreamble formState={formState as any} component={component}>
          Numeric component
        </EditablePreamble>

        <div>
          <span>Min</span>
          <input
            className={`${styles.numberInput} ${
              errors.min ? styles.errorBorder : ""
            }`}
            {...register("min", {
              validate: (value: any) =>
                value == null ||
                (!isNaN(parseFloat(value)) && isFinite(parseFloat(value))),
              setValueAs: (value) =>
                value === "" ? undefined : parseFloat(value),
            })}
            type="number"
            defaultValue={component.min}
            placeholder="Edit min value"
            step={component.is_integer ? 1 : "any"}
          />
        </div>

        <div>
          <span>Max</span>
          <input
            className={`${styles.numberInput} ${
              errors.max ? styles.errorBorder : ""
            }`}
            {...register("max", {
              validate: (value: any) =>
                value == null ||
                (!isNaN(parseFloat(value)) && isFinite(parseFloat(value))),
              setValueAs: (value) =>
                value === "" ? undefined : parseFloat(value),
            })}
            type="number"
            defaultValue={component.max}
            placeholder="Edit max value"
            step={component.is_integer ? 1 : "any"}
          />
        </div>

        <div className={`${styles.label} ${styles.optionControls}`}>
          <span>Integer only</span>
          <input
            type="checkbox"
            defaultChecked={component.is_integer}
            {...register("is_integer")}
          />
        </div>
      </form>
    );
  })
);

export default NumberEdit;
