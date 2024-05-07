import { Textarea } from "~/components/ui/textarea";

export default function InputTextarea() {
  return (
    <Textarea
      className="w-full !h-[98px]"
      maxLength={156}
      placeholder="Enter meta description"
    />
  );
}
