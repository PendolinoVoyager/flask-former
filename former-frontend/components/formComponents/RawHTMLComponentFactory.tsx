import React from "react";
import { ComponentType, FormComponentType } from "@/misc/types";
import classes from "./FormComponent.module.css";
// Import other answer components as needed
const createInputField = function (component: FormComponentType) {
  let Input;
  if (
    component.type === ComponentType.Radio ||
    component.type === ComponentType.CheckBox
  ) {
    Input = (
      <div className={classes.checkboxGroup}>
        {component.choices.map((choice) => (
          <div key={choice} className={classes.optionControls}>
            <span>{choice}</span>
            <input
              name={component.label}
              value={choice}
              type={component.type}
            ></input>
          </div>
        ))}
      </div>
    );
  } else if (component.type === ComponentType.Number) {
    Input = (
      <input
        type={component.type}
        min={component.min}
        max={component.max}
        step={component.is_integer ? 1 : ""}
        defaultValue={component.default_value}
      ></input>
    );
  } else {
    Input = (
      <input
        type={component.type}
        defaultValue={component.default_value}
        placeholder={component.default_value}
      ></input>
    );
  }
  return (
    <div className={classes.component}>
      <h2>{component.label}</h2>
      {Input}
    </div>
  );
};

interface RawHTMLComponentFactoryProps {
  component: FormComponentType;
}

const RawHTMLComponentFactory = ({
  component,
}: RawHTMLComponentFactoryProps) => {
  return createInputField(component);
};

export default RawHTMLComponentFactory;
