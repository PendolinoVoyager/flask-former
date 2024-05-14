import React from "react";
import { TextComponent as ITextComponent } from "@/misc/types";
import TextComponentEdit from "./TextComponentEdit";
import TextComponentStatic from "./TextComponentStatic";
import TextComponentAnswer from "./TextComponentAnswer";

type Mode = "edit" | "static" | "answer";

interface BaseTextComponentProps extends ITextComponent {
  mode: Mode;
}

const TextComponent: React.FC<BaseTextComponentProps> = ({
  mode,
  ...props
}) => {
  switch (mode) {
    case "edit":
      return <TextComponentEdit {...props} />;
    case "static":
      return <TextComponentStatic {...props} />;
    case "answer":
      return <TextComponentAnswer {...props} />;
    default:
      return null;
  }
};

export default TextComponent;
