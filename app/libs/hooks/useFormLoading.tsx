import { useTransition } from "@remix-run/react";

export function useFormLoading() {
  const transition = useTransition();
  return ["submitting"].includes(transition.state);
}
