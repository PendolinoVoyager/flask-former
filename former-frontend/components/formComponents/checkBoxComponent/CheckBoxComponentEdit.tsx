import { useState } from "react";
import { CheckboxComponent, ComponentType } from "@/misc/types";
import styles from "../FormComponent.module.css";

const CheckBoxComponentEdit = function ({
  label,
  defaultValue,
  choices,
}: CheckboxComponent) {
  const [options, setOptions] = useState(choices);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <form className={`${styles.component} ${styles.editing}`}>
      <input type="hidden" name="type">
        {ComponentType.CheckBox}
      </input>
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
};

export default CheckBoxComponentEdit;
