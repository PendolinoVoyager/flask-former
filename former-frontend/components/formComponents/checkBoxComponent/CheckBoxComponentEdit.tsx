import React, { useState, forwardRef } from "react";
import { CheckboxComponent } from "@/misc/types";
import styles from "../FormComponent.module.css";

const CheckboxComponentEdit = forwardRef<HTMLFormElement, CheckboxComponent>(
  function CheckBoxComponentEditActual({ label, defaultValue, choices }, ref) {
    const [options, setOptions] = useState(choices);

    const handleAddOption = () => {
      setOptions([...options, ""]);
    };

    const handleRemoveOption = (index: number) => {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    };

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
        <div className={styles.checkboxGroup}>
          {options.map((option, index) => (
            <div key={index} className={styles.optionControls}>
              <input
                className={styles.input}
                name={`option-${index}`}
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                defaultChecked={defaultValue == index}
                placeholder={`Option ${index + 1}`}
              />
              <button
                type="button"
                className={`${styles.optionButton} ${styles.remove}`}
                onClick={() => handleRemoveOption(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className={styles.optionButton}
          onClick={handleAddOption}
        >
          Add Option
        </button>
      </form>
    );
  }
);

export default CheckboxComponentEdit;
