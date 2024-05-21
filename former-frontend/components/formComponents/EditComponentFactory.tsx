import React, { ForwardedRef, Ref, forwardRef } from "react";
import { ComponentType, FormComponentType } from "@/misc/types";
import TextEdit from "./editable/TextComponentEdit";
import NumberEdit from "./editable/NumberComponentEdit";
import CheckBoxEdit from "./editable/CheckBoxComponentEdit";
import RadioEdit from "./editable/RadioComponentEdit";
import DateTimeEdit from "./editable/DateTimeComponentEdit";
import { EditComponentHandleInterface } from "../formConstructor/FormConstructorBase";

const editComponentMap = {
  [ComponentType.Text]: TextEdit,
  [ComponentType.Number]: NumberEdit,
  [ComponentType.CheckBox]: CheckBoxEdit,
  [ComponentType.Radio]: RadioEdit,
  [ComponentType.DateTime]: DateTimeEdit,
};
interface EditComponentFactoryProps {
    component: FormComponentType
}
const EditComponentFactory = forwardRef(({ component }: EditComponentFactoryProps ,
     ref: ForwardedRef<EditComponentHandleInterface<unknown>>) => {
  const Component = editComponentMap[component.type];
  return Component ?
  //@ts-ignore 
  <Component ref={ref} {...component} /> 
  : null;
});

export default EditComponentFactory;
