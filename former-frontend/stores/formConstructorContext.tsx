import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";
import { FormComponentType } from "@/misc/types";
import React, { createContext, useReducer, ReactNode, RefObject } from "react";
//It needs to be FormComponentType, even when empty.
//When editing the form comes in place it saves a lot of time.
export enum Step {
  components,
  details,
  submitting,
}
export interface ComponentIDed {
  id: number;
  component: FormComponentType;
  ref: RefObject<EditComponentHandleInterface<unknown>>;
}
type FormState = {
  step: Step;
  name: string;
  description?: string;
  key?: string;
  image?: File;
  components: ComponentIDed[];
};
export enum DispatchActions {
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  UPDATE_COMPONENTS,
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
      payload: ComponentIDed[];
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
    }
  | {
      type: DispatchActions.UPDATE_COMPONENTS;
      payload: { components: FormComponentType[] };
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
      return {
        ...state,
        components: action.payload,
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
    case DispatchActions.UPDATE_COMPONENTS:
      return {
        ...state,
        components: state.components.map((c, idx) => ({
          ...c,
          component: action.payload.components[idx],
        })),
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
