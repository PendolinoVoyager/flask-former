"use client";
import {
  ComponentMode,
  ComponentType,
  createFormComponent,
} from "@/misc/types";
import React, { Ref, RefObject, useContext, useEffect, useState } from "react";
import ComponentFactory from "../formComponents/ComponentFactory";
import classes from "./FormConstructor.module.css";
import { DndContext } from "@dnd-kit/core";
import {
  DispatchActions,
  FormConstructorContext,
  FormConstructorProvider,
} from "@/stores/formConstructorContext";
import FormConstructorHeader from "./FormConstructorHeader";
export default function FormConstructor() {
  return (
    <FormConstructorProvider>
      <FormConstructorInternal />
    </FormConstructorProvider>
  );
}
export interface EditComponentHandleInterface<T> {
  validateComponent: () => void;
  isValid: () => boolean;
  getFormData: () => T;
}
function FormConstructorInternal() {
  const {
    state: { components },
    dispatch,
  } = useContext(FormConstructorContext);
  const [componentRefs, setComponentRefs] = useState([]);

  // Making a ref for each component.
  useEffect(() => {
    setComponentRefs((refs) =>
      components.map((_, i) => refs[i] || React.createRef())
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
  const handleSubmit = function () {
    componentRefs.forEach(
      (ref: RefObject<EditComponentHandleInterface<unknown>>) => {
        if (ref.current == null) return;
        ref.current.validateComponent();
        console.log(ref.current.isValid());
        console.log(ref.current.getFormData());
      }
    );
  };
  return (
    <>
      <FormConstructorHeader onAddComponent={addComponent} />

      <DndContext>
        <div className={classes.constructorCore}>
          {components.map(({ id, component }, index) => (
            <ComponentFactory
              key={id}
              component={component}
              mode={ComponentMode.edit}
              ref={componentRefs[index] as Ref<HTMLFormElement>}
            />
          ))}
        </div>
      </DndContext>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
