import React from "react";
import { TextComponent  } from "@/misc/types";
import styles from "../FormComponent.module.css";

const TextComponentStatic: React.FC<TextComponent> = ({
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
