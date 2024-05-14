import React, { forwardRef, useRef } from "react";
import { TextComponent as ITextComponent } from "@/misc/types";
import styles from "../FormComponent.module.css";

const TextComponentEdit = forwardRef<HTMLFormElement, ITextComponent>(
  function TextComponentEditActual({ label, defaultValue }, ref) {
    return (
      <form ref={ref} className={`${styles.component} ${styles.editing}`}>
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
  }
);

export default TextComponentEdit;
