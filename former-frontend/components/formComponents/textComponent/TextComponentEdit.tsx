import { ComponentType, TextComponent as ITextComponent } from "@/misc/types";
import styles from "../FormComponent.module.css";
import { Ref, forwardRef } from "react";

const TextComponentEdit = forwardRef(function TextComponentEdit(
  { label, defaultValue }: ITextComponent,
  ref: Ref<HTMLFormElement>
) {
  return (
    <form ref={ref} className={`${styles.component} ${styles.editing}`}>
      <input type="hidden" name="type" value={ComponentType.Text} />
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
          className={styles.input}
          name="defaultValue"
          type="text"
          defaultValue={defaultValue}
          placeholder="Edit default value"
        />
      </div>
    </form>
  );
});
export default TextComponentEdit;
