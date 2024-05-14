import React from "react";
import { NumberComponent } from "@/misc/types"; // Adjust the import path as necessary
import styles from "../FormComponent.module.css";

const NumberComponentStatic: React.FC<NumberComponent> = ({
  label,
  defaultValue,
}) => {
  return (
    <div className={styles.numberComponent}>
      <label className={styles.label}>{label}</label>
      <p className={styles.number}>{defaultValue}</p>
    </div>
  );
};

export default NumberComponentStatic;
