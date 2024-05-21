import React, { forwardRef, memo } from "react";
import { FormComponentType, ComponentType, ComponentMode } from "@/misc/types";
import { EditComponentHandleInterface } from "../formConstructor/FormConstructorBase";
import TextEdit from "./textComponent/TextComponentEdit";
import TextStatic from "./textComponent/TextComponentStatic";
import TextAnswer from "./textComponent/TextComponentAnswer";

import NumberEdit from "./numberComponent/NumberComponentEdit";

import CheckBoxEdit from "./checkBoxComponent/CheckBoxComponentEdit";

import RadioEdit from "./radioComponent/RadioComponentEdit";
import DateTimeEdit from "./DateTimeComponent/DateTimeComponentEdit";
type FormComponentProps = {
  component: FormComponentType;
  mode: ComponentMode;
};

const ComponentFactory = memo(
  forwardRef<EditComponentHandleInterface<any>, any>(function ComponentFactory(
    { component, mode }: FormComponentProps,
    ref
  ) {
    //TODO: make this not suck
    //On second thought, I'm too deep in
    //How many components can there be?
    switch (mode) {
      case ComponentMode.edit:
        switch (component.type) {
          case ComponentType.Text:
            return <TextEdit ref={ref} {...component} />;
          case ComponentType.Number:
            return <NumberEdit ref={ref} {...component} />;
          case ComponentType.CheckBox:
            return <CheckBoxEdit ref={ref} {...component} />;
          case ComponentType.Radio:
            return <RadioEdit ref={ref} {...component} />;
          case ComponentType.DateTime:
            return <DateTimeEdit ref={ref} {...component} />;
          default:
            return null;
        }
      case ComponentMode.static:
        switch (component.type) {
          case ComponentType.Text:
            return <TextStatic {...component} />;
          //     case ComponentType.Number:
          //       return <NumberStatic ref={ref} {...component} />;
          //     case ComponentType.CheckBox:
          //       return <CheckBoxStatic ref={ref} {...component} />;
          default:
            return null;
        }
      case ComponentMode.answer:
        switch (component.type) {
          case ComponentType.Text:
            return <TextAnswer {...component} />;
          //     case ComponentType.Number:
          //       return <NumberAnswer ref={ref} {...component} />;
          //     case ComponentType.CheckBox:
          //       return <CheckBoxAnswer ref={ref} {...component} />;
          default:
            return null;
        }
      default:
        return null; // Handle unexpected modes
    }
  })
);

export default ComponentFactory;
