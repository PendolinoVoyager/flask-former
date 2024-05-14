import React from "react";
import { FormComponentType, ComponentType, ComponentMode } from "@/misc/types";
import TextComponent from "./textComponent/TextComponent"; // Adjust the import path as necessary
import NumberComponent from "./numberComponent/NumberComponent"; // Similar imports for Number and other components
import CheckBoxComponent from "./checkBoxComponent/CheckBoxComponent";
type FormComponentProps = {
  component: FormComponentType;
  mode: ComponentMode;
};

export default function FormComponent({
  component,

  mode,
}: FormComponentProps) {
  switch (component.type) {
    case ComponentType.Text:
      return <TextComponent mode={mode} {...component} />;
    case ComponentType.Number:
      return <NumberComponent mode={mode} {...component} />;
    case ComponentType.CheckBox:
      return <CheckBoxComponent mode={mode} {...component} />;
    default:
      return null;
  }
}
