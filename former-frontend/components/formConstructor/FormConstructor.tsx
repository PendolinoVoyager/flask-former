"use client";
import {
  ComponentMode,
  ComponentType,
  FormComponentType,
  createFormComponent,
} from "@/misc/types";
import React, { Ref, useContext, useEffect, useRef, useState } from "react";
import ComponentFactory from "../formComponents/ComponentFactory";
import classes from "./FormConstructor.module.css";
import { DndContext } from "@dnd-kit/core";
import SpawnComponentButton from "./SpawnComponentButton";
import {
  DispatchActions,
  FormConstructorContext,
  FormConstructorProvider,
} from "@/stores/formConstructorContext";
export default function FormConstructor() {
  return (
    <FormConstructorProvider>
      <FormConstructorInternal />
    </FormConstructorProvider>
  );
}
function FormConstructorInternal() {
  const {
    state: { components },
    dispatch,
  } = useContext(FormConstructorContext);
  const componentRefs = useRef(components.map(() => React.createRef()));

  // Adjust refs array on component changes
  useEffect(() => {
    componentRefs.current = components.map(
      (_, i) => componentRefs.current[i] || React.createRef()
    );
  }, [components]);

  // Function to handle adding a new component
  const addComponent = (componentType: ComponentType) => {
    const newComponent = createFormComponent(componentType);
    dispatch({
      type: DispatchActions.ADD_COMPONENT,
      payload: { id: components.length, component: newComponent },
    });
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
          {components.map(({ id, component }, index) => (
            <ComponentFactory
              key={id}
              component={component}
              mode={ComponentMode.edit}
              ref={componentRefs.current[index] as Ref<HTMLFormElement>}
            />
          ))}
        </div>
      </DndContext>
    </>
  );
}
