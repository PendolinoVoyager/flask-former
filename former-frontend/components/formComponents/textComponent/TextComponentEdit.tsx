import React from "react";
import { TextComponent as ITextComponent } from "@/misc/types";
import styles from "../FormComponent.module.css";
const TextComponentEdit: React.FC<ITextComponent> = ({
  label,
  defaultValue,
}) => {
  return (
    <div className={styles.textComponent}>
      <label className={styles.label}>Text Component</label>
      <input type="text" defaultValue={label ?? "Your label"} />
      <input type="text" defaultValue={defaultValue}></input>
    </div>
  );
};

export default TextComponentEdit;
