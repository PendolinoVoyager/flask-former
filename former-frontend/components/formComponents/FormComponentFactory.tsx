"use client";
import React from "react";
import {
  ComponentType,
  FormComponentType,
  getNativeHTMLInputType,
} from "@/misc/types";
import classes from "./FormComponent.module.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const createInputField = function (
  component: FormComponentType,
  register: UseFormRegister<any>,
  errors: FieldErrors
) {
  let Input;
  const error = errors[component.label];
  if (
    component.type === ComponentType.Radio ||
    component.type === ComponentType.CheckBox
  ) {
    Input = (
      <div className={classes.checkboxGroup}>
        {component.choices.map((choice, index) => (
          <div key={choice} className={classes.optionControls}>
            <span>{choice}</span>
            <input
              {...register(component.label)}
              value={choice}
              type={component.type}
              className={error ? classes.errorBorder : ""}
            />
          </div>
        ))}
      </div>
    );
  } else {
    Input = (
      <input
        {...register(component.label, {
          required: component.required,
          validate: (v: any) => {
            return component.type === ComponentType.Number
              ? (v >= (component?.min ?? -Infinity) &&
                  v <= (component?.max ?? Infinity)) ||
                  !component.required
              : true;
          },
        })} // Use register to connect input to react-hook-form
        type={getNativeHTMLInputType(component.type)}
        min={
          component.type === ComponentType.Number ? component.min : undefined
        }
        max={
          component.type === ComponentType.Number ? component.max : undefined
        }
        step={
          component.type === ComponentType.Number && component.is_integer
            ? 1
            : "any"
        }
        defaultValue={component.default_value}
        //@ts-ignore
        placeholder={component.default_value ?? ""}
        className={error ? classes.errorBorder : ""}
      />
    );
  }

  return (
    <div className={classes.component}>
      <h2 className={error ? classes.errorColor : ""}>
        {component.label} {!component.required ? "(optional)" : ""}
      </h2>
      {Input}
      {error && (
        <p className={classes.errorMessage}>{error.message as string}</p>
      )}
    </div>
  );
};

interface FormComponentFactoryProps {
  component: FormComponentType;
  errors: FieldErrors;
  register: UseFormRegister<any>; // Receive register function from parent
}

const FormComponentFactory = ({
  component,
  register,
  errors,
}: FormComponentFactoryProps) => {
  return createInputField(component, register, errors);
};

export default FormComponentFactory;
