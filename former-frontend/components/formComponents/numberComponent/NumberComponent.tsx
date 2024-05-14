import React from "react";
import { NumberComponent as INumberComponent } from "@/misc/types";

const NumberComponent: React.FC<INumberComponent> = ({
  label,
  defaultValue,
  min,
  max,
  isInteger,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="number"
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={isInteger ? 1 : "any"}
      />
    </div>
  );
};

export default NumberComponent;
