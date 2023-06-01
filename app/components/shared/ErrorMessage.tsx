import { useEffect, useState } from "react";
import { get } from "react-hook-form";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface ErrorMessageProps<D extends FieldValues> {
  error?: string;
  errors?: FieldErrors<D>;
  name?: string;
  isSubmitting: boolean;
}

function ErrorMessage<D extends FieldValues>({
  error,
  errors,
  name,
  isSubmitting,
}: ErrorMessageProps<D>) {
  const [show, setShow] = useState(!!error);

  useEffect(() => {
    const id = setTimeout(() => {
      const hasError = !!error;
      setShow(hasError && !isSubmitting);
    });
    return () => clearTimeout(id);
  }, [error, isSubmitting]);

  if (!show) return null;

  const valid_error = get(errors, name);
  
  if (!error && valid_error) {
    return <p className="error-message">{valid_error?.message}</p>;
  }
  return <p className="error-message">{error}</p>;
}

export default ErrorMessage;
