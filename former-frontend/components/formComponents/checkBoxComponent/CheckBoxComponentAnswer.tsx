import React from "react";
import { CheckboxComponent } from "@/misc/types";
import styles from "../FormComponent.module.css";

const CheckboxComponentAnswer: React.FC<CheckboxComponent> = ({
  label,
  choices,
}) => {
  return (
    <div className={styles.checkboxComponent}>
      <label className={styles.label}>{label}</label>
      <div className={styles.checkboxGroup}>
        {choices.map((choice, index) => (
          <div key={index} className={styles.answerCheckbox}>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              value={choice}
            />
            {choice}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxComponentAnswer;
