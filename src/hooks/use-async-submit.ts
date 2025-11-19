import { useState, useCallback } from "react";

interface UseAsyncSubmitOptions {
  onSuccess?: () => void;
  delay?: number;
}

export const useAsyncSubmit = ({
  onSuccess,
  delay = 1000,
}: UseAsyncSubmitOptions = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = useCallback(
    async (callback?: () => void | Promise<void>) => {
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (callback) {
        await callback();
      }

      setIsSubmitting(false);

      if (onSuccess) {
        onSuccess();
      }
    },
    [onSuccess, delay]
  );

  return {
    isSubmitting,
    submit,
  };
};
