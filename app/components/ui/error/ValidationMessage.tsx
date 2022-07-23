import { useEffect, useState } from "react";

interface ValidationMessageProps {
  error?: string;
  isSubmitting: boolean;
}

function ValidationMessage({ error, isSubmitting }: ValidationMessageProps) {
  const [show, setShow] = useState(!!error);

  useEffect(() => {
    const id = setTimeout(() => {
      const hasError = !!error;
      setShow(hasError && !isSubmitting);
    });
    return () => clearTimeout(id);
  }, [error, isSubmitting]);

  return (
    <p className="my-1 mx-1 text-sm text-red-500 duration-300 ease-in-out">
      {error}
    </p>
  );
}

export default ValidationMessage;
