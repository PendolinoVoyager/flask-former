import { ComponentType, NumberComponent } from "@/misc/types"; // Adjust the import path as necessary
import styles from "../FormComponent.module.css";

const NumberComponentEdit = function ({
  label,
  defaultValue,
  min,
  max,
  isInteger,
}: NumberComponent) {
  return (
    <form className={`${styles.component} ${styles.editing}`}>
      <input type="hidden" name="type">
        {ComponentType.Number}
      </input>
      <div className={styles.label}>
        <span>Label</span>
        <input
          className={styles.editField}
          name="label"
          type="text"
          defaultValue={label}
          placeholder="Edit label"
        />
      </div>
      <div>
        <span>Default Value</span>
        <input
          className={styles.numberInput}
          name="defaultValue"
          type="number"
          defaultValue={defaultValue}
          placeholder="Edit default value"
          step={isInteger ? 1 : "any"}
        />
      </div>
      <div>
        <span>Min</span>
        <input
          className={styles.numberInput}
          name="min"
          type="number"
          defaultValue={min}
          placeholder="Edit min value"
          step={isInteger ? 1 : "any"}
        />
      </div>
      <div>
        <span>Max</span>
        <input
          className={styles.numberInput}
          name="max"
          type="number"
          defaultValue={max}
          placeholder="Edit max value"
          step={isInteger ? 1 : "any"}
        />
      </div>
      <div className={styles.label}>
        <span>Integer only</span>
        <input name="isInteger" type="checkbox" defaultChecked={isInteger} />
      </div>
    </form>
  );
};

export default NumberComponentEdit;
