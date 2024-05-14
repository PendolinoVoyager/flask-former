import React from "react";
import { TextComponent as ITextComponent } from "@/misc/types";
import styles from "../FormComponent.module.css";

const TextComponentStatic: React.FC<ITextComponent> = ({
  label,
  defaultValue,
}) => {
  return (
    <div className={styles.textComponent}>
      <label className={styles.label}>{label}</label>
      <p className={styles.text}>{defaultValue}</p>
    </div>
  );
};

export default TextComponentStatic;
