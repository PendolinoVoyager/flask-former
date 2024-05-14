import React from "react";
import { CheckboxComponent } from "@/misc/types"; // Adjust the import path as necessary
import styles from "../FormComponent.module.css";

const CheckboxComponentStatic: React.FC<CheckboxComponent> = ({
  label,
  choices,
}) => {
  return (
    <div className={styles.checkboxComponent}>
      <label className={styles.label}>{label}</label>
      <div className={styles.checkboxGroup}>
        {choices.map((choice, index) => (
          <div key={index} className={styles.checkbox}>
            {choice}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxComponentStatic;
