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
    Input = component.choices.map((choice) => (
      <>
        <label>{choice}</label>
        <input
          name={component.label}
          value={choice}
          type={component.type}
        ></input>
      </>
    ));
  } else if (component.type === ComponentType.Number) {
    Input = (
      <input
        type={component.type}
        min={component.min}
        max={component.max}
        step={component.isInteger ? 1 : ""}
        defaultValue={component.defaultValue}
      ></input>
    );
  } else {
    Input = (
      <input
        type={component.type}
        defaultValue={component.defaultValue}
        placeholder={component.defaultValue}
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
