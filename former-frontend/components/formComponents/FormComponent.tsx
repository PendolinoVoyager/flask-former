import React from "react";
import { FormComponentType, ComponentType } from "@/misc/types";
import TextComponent from "./textComponent/TextComponent"; // Adjust the import path as necessary
import NumberComponent from "./numberComponent/NumberComponent"; // Similar imports for Number and other components
import CheckBoxComponent from "./checkBoxComponent/CheckBoxComponent";

type Mode = "edit" | "static" | "answer";

type FormComponentProps = {
  component: FormComponentType;
  mode: Mode;
};

export default function FormComponent({
  component,

  mode,
}: FormComponentProps) {
  switch (component.type) {
    case ComponentType.Text:
      return <TextComponent mode={mode} {...component} />;
    // case ComponentType.Number:
    //   return <NumberComponent mode={mode} {...component} />;
    // case ComponentType.CheckBox:
    //   return <CheckBoxComponent mode={mode} {...component} />;
    // Add cases for other component types as needed
    default:
      return null;
  }
}
