import { ForwardedRef, useEffect, useImperativeHandle, useState } from "react";

export function useAsyncLoad<T>(
  fn: () => Promise<T>,
  deps: any[]
): { data: T | null; isLoading: boolean; error?: Error } {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    async function load() {
      try {
        setError(undefined);
        setIsLoading(true);
        const data = (await fn()) as T;
        setData(data);
      } catch (err: any) {
        setError(err);
      }
      setIsLoading(false);
    }
    load();
  }, [fn, ...deps]);
  return { data, isLoading, error };
}

export const useConfirmationModal = (initialMessage = "Are you sure?") => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(initialMessage);
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => {});

  const openModal = (newMessage: string, onConfirm: () => void) => {
    setMessage(newMessage || initialMessage);
    setOnConfirmCallback(() => () => {
      onConfirm();
      closeModal();
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    message,
    onConfirm: onConfirmCallback,
    openModal,
    closeModal,
  };
};

import {
  Control,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { ComponentType, type FormComponentType } from "./types";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";

interface UseExposeHandleOptions<T extends FormComponentType> {
  getValues: UseFormGetValues<T>;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<T>;
}
export function useExposeHandle<T>(
  ref: ForwardedRef<EditComponentHandleInterface<T>>,
  { getValues, isValid, handleSubmit }: UseExposeHandleOptions<any>
) {
  useImperativeHandle(ref, () => ({
    validateComponent: () => handleSubmit(() => {})(),
    isValid: () => isValid,
    getFormData: () => getValues(),
  }));
}
export interface UseEditableRHFReturn<T extends FieldValues> {
  control: Control<T>;
  isValid: boolean;
  errors: FieldErrors;
  getValues: () => T;
  handleSubmit: () => void;
  register: UseFormRegister<T>;
}
export function useEditableRHF<T extends FormComponentType>(
  ref: any,
  component: T
) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm<T, any, any>({
    //@ts-ignore
    defaultValues: {
      ...component,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  useExposeHandle(ref, { getValues, isValid, handleSubmit });
  return { control, isValid, errors, getValues, handleSubmit, register };
}
