import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import styles from "../FormComponent.module.css";
interface ChoicesFieldArrayProps {
  control: Control<any>;
  name: string;
}
function ChoicesFieldArray({ control, name }: ChoicesFieldArrayProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const handleRemove = function (index: number) {
    if (fields.length <= 1) return;
    remove(index);
  };
  //Make sure it doesn't break
  if (fields.length === 0) append("");
  return (
    <>
      <div className={styles.checkboxGroup}>
        {fields.map((item, index) => (
          <div key={item.id} className={styles.optionControls}>
            <Controller
              name={`${name}.${index}`}
              control={control}
              rules={{ required: "Empty options aren't allowed." }}
              render={({ field }) => (
                <>
                  <input
                    className={`${styles.input} ${
                      control.getFieldState(name).error
                        ? styles.errorBorder
                        : ""
                    }`}
                    {...field}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className={`${styles.optionButton} ${styles.remove}`}
                  >
                    Remove
                  </button>
                </>
              )}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.optionButton}
        onClick={() => append("")}
      >
        Add Option
      </button>
    </>
  );
}

export default ChoicesFieldArray;
