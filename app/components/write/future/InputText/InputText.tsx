import { Input } from "~/components/ui/input";

export default function InputText() {
  return (
    <Input
      className="w-full !h-[50px]"
      maxLength={70}
      placeholder="Enter meta title"
    />
  );
}
