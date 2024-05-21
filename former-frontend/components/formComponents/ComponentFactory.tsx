import React, { memo } from "react";
import { ComponentMode, FormComponentType } from "@/misc/types";
import EditComponentFactory from "./EditComponentFactory";
import StaticComponentFactory from "./StaticComponentFactory";
import AnswerComponentFactory from "./AnswerComponentFactory";

type FormComponentProps = {
  component: FormComponentType;
  mode: ComponentMode;
};

const ComponentFactory = memo(({ component, mode }: FormComponentProps) => {
  switch (mode) {
    case ComponentMode.edit:
      return <EditComponentFactory component={component} />;
    case ComponentMode.static:
      return <StaticComponentFactory component={component} />;
    case ComponentMode.answer:
      return <AnswerComponentFactory component={component} />;
    default:
      return null; // Handle unexpected modes
  }
});

export default ComponentFactory;
