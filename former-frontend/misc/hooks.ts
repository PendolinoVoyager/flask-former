import { ComponentType, ForwardedRef, useEffect, useImperativeHandle, useState } from "react";

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


import { useForm, UseFormGetValues, UseFormHandleSubmit } from "react-hook-form";
import type { FormComponentType } from "./types";
import { EditComponentHandleInterface } from "@/components/formConstructor/FormConstructorBase";


interface UseExposeHandleOptions<T extends FormComponentType> {
  getValues: UseFormGetValues<T>,
  isValid: boolean,
  handleSubmit: UseFormHandleSubmit<T>;
}
export function useExposeHandle<T>(ref: ForwardedRef<EditComponentHandleInterface<T>>, 
  { getValues, isValid, handleSubmit }: UseExposeHandleOptions<any>) {
  //@ts-ignore
  useImperativeHandle(ref, () => ({
    validateComponent: () => handleSubmit(() => {})(),
    isValid: () => isValid,
    getFormData: () => getValues(),
  }));
}
