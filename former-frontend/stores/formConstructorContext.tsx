import { FormComponentType } from "@/misc/types";
import React, { createContext, useReducer, ReactNode } from "react";
//It needs to be FormComponentType, even when empty.
//When editing the form comes in place it saves a lot of time.
type FormState = {
  components: { id: number; component: FormComponentType }[];
};
export enum DispatchActions {
  ADD_COMPONENT,
  REMOVE_COMPONENT,
}
type Action =
  | {
      type: DispatchActions.ADD_COMPONENT;
      payload: { id: number; component: any };
    }
  | {
      type: DispatchActions.REMOVE_COMPONENT;
      payload: { id: number };
    };

export const FormConstructorContext = createContext<{
  state: FormState;
  dispatch: React.Dispatch<Action>;
}>({ state: { components: [] }, dispatch: () => {} });

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case DispatchActions.ADD_COMPONENT:
      return {
        ...state,
        components: [...state.components, action.payload],
      };
    case DispatchActions.REMOVE_COMPONENT:
      return {
        ...state,
        components: state.components.filter(
          (component) => component.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
export const FormConstructorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(formReducer, { components: [] });

  return (
    <FormConstructorContext.Provider value={{ state, dispatch }}>
      {children}
    </FormConstructorContext.Provider>
  );
};
