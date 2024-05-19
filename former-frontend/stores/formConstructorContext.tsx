import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { ComponentType, FormComponentType } from "@/misc/types";
import React, { createContext, useReducer, ReactNode, RefObject } from "react";
//It needs to be FormComponentType, even when empty.
//When editing the form comes in place it saves a lot of time.
export enum Step {
  components,
  details,
  submitting,
}
type FormState = {
  step: Step;
  name: string;
  description?: string;
  key?: string;
  image?: File;
  components: {
    id: number;
    component: FormComponentType;
    ref: RefObject<EditComponentHandleInterface<unknown>>;
  }[];
};
export enum DispatchActions {
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  REORDER,
  PROCEED,
  BACK,
  SAVE_DETAILS,
}

type Action =
  | {
      type: DispatchActions.ADD_COMPONENT;
      payload: {
        id: number;
        component: FormComponentType;
      };
    }
  | {
      type: DispatchActions.REMOVE_COMPONENT;
      payload: { id: number };
    }
  | {
      type: DispatchActions.REORDER;
      payload: { id: number; target_index: number };
    }
  | {
      type: DispatchActions.PROCEED | DispatchActions.BACK;
    }
  | {
      type: DispatchActions.SAVE_DETAILS;
      payload: {
        name: string;
        description: string;
        image: File;
        key: string;
      };
    };

export const FormConstructorContext = createContext<{
  state: FormState;
  dispatch: React.Dispatch<Action>;
}>({
  state: {
    name: "",
    description: undefined,
    key: "",
    image: undefined,
    step: Step.components,
    components: [],
  },
  dispatch: () => {},
});

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case DispatchActions.ADD_COMPONENT:
      return {
        ...state,
        components: [
          ...state.components,
          { ...action.payload, ref: React.createRef() },
        ],
      };
    case DispatchActions.REMOVE_COMPONENT:
      return {
        ...state,
        components: state.components.filter(
          (component) => component.id !== action.payload.id
        ),
      };
    case DispatchActions.REORDER:
      const cmp = state.components.find((c) => c.id === action.payload.id);
      if (!cmp) return state;
      const componentsFiltered = state.components.filter((c) => c !== cmp);
      return {
        ...state,
        components: [
          ...componentsFiltered.slice(0, action.payload.target_index),
          cmp,
          ...componentsFiltered.slice(
            action.payload.target_index + 1,
            componentsFiltered.length
          ),
        ],
      };
    case DispatchActions.SAVE_DETAILS:
      const {
        payload: { name, key, image, description },
      } = action;
      return {
        ...state,
        name,
        key,
        image,
        description,
      };
    case DispatchActions.PROCEED:
      return {
        ...state,
        step: state.step + 1,
      };
    case DispatchActions.BACK:
      return {
        ...state,
        step: state.step - 1,
      };
    default:
      return state;
  }
};
export const FormConstructorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(formReducer, {
    name: "",
    description: "",
    key: "",
    image: undefined,
    step: Step.components,
    components: [],
  });

  return (
    <FormConstructorContext.Provider value={{ state, dispatch }}>
      {children}
    </FormConstructorContext.Provider>
  );
};
