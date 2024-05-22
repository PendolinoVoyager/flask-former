import React, { ForwardedRef, Ref, forwardRef } from "react";
import { ComponentType, FormComponentType } from "@/misc/types";
import TextEdit from "./editable/TextComponentEdit";
import NumberEdit from "./editable/NumberComponentEdit";
import CheckBoxEdit from "./editable/CheckBoxComponentEdit";
import RadioEdit from "./editable/RadioComponentEdit";
import DateTimeEdit from "./editable/DateTimeComponentEdit";
import { EditComponentHandleInterface } from "../formConstructor/FormConstructorBase";
import TimeEdit from "./editable/TimeComponentEdit";
import DateEdit from "./editable/DateComponentEdit";

const editComponentMap = {
  [ComponentType.Text]: TextEdit,
  [ComponentType.Number]: NumberEdit,
  [ComponentType.CheckBox]: CheckBoxEdit,
  [ComponentType.Radio]: RadioEdit,
  [ComponentType.DateTime]: DateTimeEdit,
  [ComponentType.Time]: TimeEdit,
  [ComponentType.Date]: DateEdit,
};
interface EditComponentFactoryProps {
  component: FormComponentType;
}
const EditComponentFactory = forwardRef(function EditComponentFactory(
  { component }: EditComponentFactoryProps,
  ref: ForwardedRef<EditComponentHandleInterface<unknown>>
) {
  const Component = editComponentMap[component.type];
  return Component ? (
    //@ts-ignore
    <Component ref={ref} component={component} />
  ) : null;
});

export default EditComponentFactory;
