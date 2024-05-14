"use client";
import {
  ComponentMode,
  ComponentType,
  FormComponentType,
  createFormComponent,
} from "@/misc/types";
import { useState } from "react";
import FormComponent from "../formComponents/FormComponent";
import classes from "./FormConstructor.module.css";
import { DndContext } from "@dnd-kit/core";
import SpawnComponentButton from "./SpawnComponentButton";

export default function FormConstructor() {
  // State to keep track of added components and their order
  const [formComponents, setFormComponents] = useState<
    { id: number; component: FormComponentType }[]
  >([]);

  // Function to handle adding a new component
  const addComponent = (componentType: ComponentType) => {
    const newComponent = createFormComponent(componentType);

    setFormComponents((prevComponents) => [
      ...prevComponents,
      { id: formComponents.length, component: newComponent },
    ]);
  };

  return (
    <>
      <div className={classes.header}>
        <h2>Insert a component</h2>
        <ul className={classes.btnList}>
          {Object.keys(ComponentType).map((c) => {
            const componentKey = c as keyof typeof ComponentType;
            return (
              <SpawnComponentButton
                key={componentKey}
                componentType={ComponentType[componentKey]}
                onClick={() => addComponent(ComponentType[componentKey])}
              >
                {componentKey}
              </SpawnComponentButton>
            );
          })}
        </ul>
      </div>

      <DndContext>
        <div className={classes.constructorCore}>
          {formComponents.map(({ id, component }) => (
            <FormComponent
              key={id}
              component={component}
              mode={ComponentMode.edit}
            />
          ))}
        </div>
      </DndContext>
    </>
  );
}
