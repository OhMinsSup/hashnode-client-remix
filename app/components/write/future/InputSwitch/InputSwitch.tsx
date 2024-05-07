import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

interface InputSwitchProps {
  id: string;
  text: string;
  help: string;
}

export default function InputSwitch({ id, text, help }: InputSwitchProps) {
  return (
    <Label
      htmlFor={id}
      className="flex relative items-center justify-between gap-20 sm:gap-24 text-xl font-semibold"
    >
      <div className="flex flex-col gap-1 flex-[3_1_0%]">
        <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>
        <p className="text-base text-muted-foreground">{help}</p>
      </div>
      <Switch id={id} />
    </Label>
  );
}
