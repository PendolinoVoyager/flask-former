import React from "react";
import { NumberComponent } from "@/misc/types"; // Adjust the import path as necessary
import styles from "../FormComponent.module.css";

const NumberComponentAnswer: React.FC<NumberComponent> = ({
  label,
  min,
  max,
  isInteger,
}) => {
  return (
    <div className={styles.numberComponent}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.answerInput}
        type="number"
        min={min}
        max={max}
        step={isInteger ? 1 : "any"}
      />
    </div>
  );
};

export default NumberComponentAnswer;
