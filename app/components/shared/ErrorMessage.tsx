import { useEffect, useState } from "react";

interface ErrorMessageProps {
  error?: string;
  isSubmitting: boolean;
}

function ErrorMessage({ error, isSubmitting }: ErrorMessageProps) {
  const [show, setShow] = useState(!!error);

  useEffect(() => {
    const id = setTimeout(() => {
      const hasError = !!error;
      setShow(hasError && !isSubmitting);
    });
    return () => clearTimeout(id);
  }, [error, isSubmitting]);

  if (!show) return null;

  return <p className="error-message">{error}</p>;
}

export default ErrorMessage;
