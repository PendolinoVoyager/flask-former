import React from "react";
import {
  ComponentMode,
  NumberComponent as INumberComponent,
} from "@/misc/types";
import NumberComponentEdit from "./NumberComponentEdit";
import NumberComponentStatic from "./NumberComponentStatic";
import NumberComponentAnswer from "./NumberComponentAnswer";

interface BaseNumberComponentProps extends INumberComponent {
  mode: ComponentMode;
}

const TextComponent: React.FC<BaseNumberComponentProps> = ({
  mode,
  ...props
}) => {
  switch (mode) {
    case ComponentMode.edit:
      return <NumberComponentEdit {...props} />;
    case ComponentMode.static:
      return <NumberComponentStatic {...props} />;
    case ComponentMode.answer:
      return <NumberComponentAnswer {...props} />;
    default:
      return null;
  }
};

export default TextComponent;
