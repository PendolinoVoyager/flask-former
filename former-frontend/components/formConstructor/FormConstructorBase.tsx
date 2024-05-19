import { DndContext } from "@dnd-kit/core";
import FormConstructorHeader from "./FormConstructorHeader";
import ComponentFactory from "../formComponents/ComponentFactory";
import classes from "./FormConstructor.module.css";
import {
  ComponentMode,
  ComponentType,
  createFormComponent,
} from "@/misc/types";
import { useContext } from "react";
import {
  DispatchActions,
  FormConstructorContext,
} from "@/stores/formConstructorContext";
import SquareButton from "../UI/SquareButton";

export interface EditComponentHandleInterface<T> {
  validateComponent: () => void;
  isValid: () => boolean;
  getFormData: () => T;
}

export default function FormConstructorBase() {
  const addComponent = (componentType: ComponentType) => {
    const newComponent = createFormComponent(componentType);
    dispatch({
      type: DispatchActions.ADD_COMPONENT,
      payload: { id: components.length, component: newComponent },
    });
  };
  const {
    state: { components },
    dispatch,
  } = useContext(FormConstructorContext);
  const handleSubmit = function () {
    let componentsValid = true;
    components.forEach(({ ref }) => {
      if (ref.current == null) return;
      ref.current.validateComponent();
      componentsValid &&= ref.current.isValid();
    });
    if (!componentsValid || components.length === 0) return;
    dispatch({
      type: DispatchActions.PROCEED,
    });
  };
  return (
    <div className={classes.page}>
      <FormConstructorHeader onAddComponent={addComponent} />

      <DndContext>
        <div className={classes.constructorCore}>
          {components.map(({ id, component, ref }) => (
            <ComponentFactory
              key={id}
              component={component}
              mode={ComponentMode.edit}
              ref={ref}
            />
          ))}
        </div>
      </DndContext>
      <SquareButton
        onClick={handleSubmit}
        className={classes.submitBtn}
        disabled={components.length === 0}
      >
        Continue
      </SquareButton>
    </div>
  );
}
