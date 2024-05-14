import React from "react";
import {
  ComponentMode,
  CheckboxComponent as ICheckBoxComponent,
} from "@/misc/types";
import CheckBoxComponentEdit from "./CheckBoxComponentEdit";
import CheckboxComponentStatic from "./CheckBoxComponentStatic";
import CheckboxComponentAnswer from "./CheckBoxComponentAnswer";

interface BaseCheckBoxComponentProps extends ICheckBoxComponent {
  mode: ComponentMode;
}

const TextComponent: React.FC<BaseCheckBoxComponentProps> = ({
  mode,
  ...props
}) => {
  switch (mode) {
    case ComponentMode.edit:
      return <CheckBoxComponentEdit {...props} />;
    case ComponentMode.static:
      return <CheckboxComponentStatic {...props} />;
    case ComponentMode.answer:
      return <CheckboxComponentAnswer {...props} />;
    default:
      return null;
  }
};

export default TextComponent;
