import {
  ClientRect,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import FormConstructorHeader from "./FormConstructorHeader";
import classes from "./FormConstructor.module.css";
import {
  ComponentType,
  FormComponentType,
  createFormComponent,
} from "@/misc/types";
import { useContext } from "react";
import {
  ComponentIDed,
  DispatchActions,
  FormConstructorContext,
} from "@/stores/formConstructorContext";
import SquareButton from "../UI/SquareButton";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import EditComponentFactory from "../formComponents/EditComponentFactory";
export interface EditComponentHandleInterface<T> {
  validateComponent: () => void;
  isValid: () => boolean;
  getFormData: () => T;
}
const OFFSCREEN_RATIO = 0.6;
export default function FormConstructorBase() {
  // form constructor context related
  const addComponent = (componentType: ComponentType) => {
    const newComponent = createFormComponent(componentType);
    dispatch({
      type: DispatchActions.ADD_COMPONENT,
      payload: { id: components.length + 1, component: newComponent },
    });
  };
  const {
    state: { components },
    dispatch,
  } = useContext(FormConstructorContext);
  const handleSubmit = function () {
    let componentsValid = true;
    const newComponents: FormComponentType[] = [];

    components.forEach(({ ref, id }) => {
      if (ref.current == null) return;
      ref.current.validateComponent();
      componentsValid &&= ref.current.isValid();
      newComponents.push(ref.current.getFormData() as FormComponentType);
    });

    if (!componentsValid || newComponents.length === 0) return;

    dispatch({
      type: DispatchActions.UPDATE_COMPONENTS,
      payload: { components: newComponents },
    });
    dispatch({
      type: DispatchActions.PROCEED,
    });
  };
  // dnd context related
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeRect = active.rect.current;
    if (!over) return;
    //@ts-ignore
    if (isOffScreen(activeRect.translated, OFFSCREEN_RATIO)) {
      dispatch({
        type: DispatchActions.REMOVE_COMPONENT,
        payload: { id: active.id as number },
      });
      return;
    }
    if (active.id !== over.id) {
      const oldIndex = components.findIndex(
        (component) => component.id === active.id
      );
      const newIndex = components.findIndex(
        (component) => component.id === over.id
      );

      dispatch({
        type: DispatchActions.REORDER,
        payload: arrayMove(components, oldIndex, newIndex),
      });
    }
  };
  return (
    <div className={classes.page}>
      <FormConstructorHeader onAddComponent={addComponent} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={components.map((component) => component.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={classes.constructorCore}>
            {components.map(({ id, component, ref }) => (
              <SortableItem key={id} id={id}>
                <EditComponentFactory component={component} ref={ref} />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
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

function isOffScreen(rect: ClientRect, ratio: number = 0.5) {
  const width = rect.right - rect.left;
  const viewportWidth = window.innerWidth;
  const targetElementWidth = width * ratio;
  const elementRightEdge = rect.left + width;
  const elementLeftEdge = rect.left;
  return (
    elementLeftEdge + targetElementWidth < 0 ||
    elementRightEdge - targetElementWidth > viewportWidth
  );
}
