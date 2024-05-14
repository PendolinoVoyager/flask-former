import React from "react";
import { ComponentMode, TextComponent as ITextComponent } from "@/misc/types";
import TextComponentEdit from "./TextComponentEdit";
import TextComponentStatic from "./TextComponentStatic";
import TextComponentAnswer from "./TextComponentAnswer";

interface BaseTextComponentProps extends ITextComponent {
  mode: ComponentMode;
}

const TextComponent: React.FC<BaseTextComponentProps> = ({
  mode,
  ...props
}) => {
  switch (mode) {
    case ComponentMode.edit:
      return <TextComponentEdit {...props} />;
    case ComponentMode.static:
      return <TextComponentStatic {...props} />;
    case ComponentMode.answer:
      return <TextComponentAnswer {...props} />;
    default:
      return null;
  }
};

export default TextComponent;
