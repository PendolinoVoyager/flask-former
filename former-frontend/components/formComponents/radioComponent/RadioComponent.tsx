import React from "react";
import { RadioComponent as IRadioComponent } from "@/misc/types";

const RadioComponent: React.FC<IRadioComponent> = ({
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
            type="radio"
            value={choice}
            defaultChecked={defaultValue === index}
          />
          {choice}
        </div>
      ))}
    </div>
  );
};

export default RadioComponent;
