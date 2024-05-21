import React from "react";
import { ComponentType, FormComponentType } from "@/misc/types";
import TextStatic from "./textComponent/TextComponentStatic";
// Import other static components as needed

const staticComponentMap = {
  [ComponentType.Text]: TextStatic,
  [ComponentType.Number]: TextStatic,
  [ComponentType.CheckBox]: TextStatic,
  [ComponentType.Radio]: TextStatic,
  [ComponentType.DateTime]: TextStatic,
  // Add other static components when available
};
interface StaticComponentFactoryProps {
    component: FormComponentType
}
const StaticComponentFactory = ({ component }: StaticComponentFactoryProps) => {
  const Component = staticComponentMap[component.type];
  //@ts-ignore 
  return Component ? <Component {...component} /> : null;
};

export default StaticComponentFactory;
