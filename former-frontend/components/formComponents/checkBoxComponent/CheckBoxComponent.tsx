import React from "react";
import { CheckboxComponent as ICheckBoxComponent } from "@/misc/types";

const CheckboxComponent: React.FC<ICheckBoxComponent> = ({
  label,
  defaultValue,
  choices,
}) => {
  return (
    <div>
      <label>{label}</label>
      {choices.map((choice, index) => (
        <div key={index}>
          <input
            type="checkbox"
            value={choice}
            defaultChecked={defaultValue === index}
          />
          {choice}
        </div>
      ))}
    </div>
  );
};

export default CheckboxComponent;
