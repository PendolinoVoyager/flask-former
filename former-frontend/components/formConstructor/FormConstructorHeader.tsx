import { ComponentType } from "@/misc/types";
import classes from "./FormConstructor.module.css";
import SpawnComponentButton from "./SpawnComponentButton";
import { memo } from "react";
interface FormConstructorHeaderProps {
  onAddComponent: (cmp: ComponentType) => void;
}

export const FormConstructorHeader = memo(function FormConstructorHeader({
  onAddComponent,
}: FormConstructorHeaderProps) {
  return (
    <div className={classes.header}>
      <h2>Insert a component</h2>
      <ul className={classes.btnList}>
        {Object.keys(ComponentType).map((c) => {
          const componentKey = c as keyof typeof ComponentType;
          return (
            <SpawnComponentButton
              key={componentKey}
              componentType={ComponentType[componentKey]}
              onClick={() => onAddComponent(ComponentType[componentKey])}
            >
              {componentKey}
            </SpawnComponentButton>
          );
        })}
      </ul>
    </div>
  );
});
export default FormConstructorHeader;
