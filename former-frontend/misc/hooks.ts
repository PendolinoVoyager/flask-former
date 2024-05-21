import { useEffect, useState } from "react";

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

const useConfirmationModal = (initialMessage = "Are you sure?") => {
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

export default useConfirmationModal;
