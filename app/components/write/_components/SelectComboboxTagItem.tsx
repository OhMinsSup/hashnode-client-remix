import React from "react";
import { XIcon } from "~/components/ui/Icon";

interface SelectComboboxTagItemProps {
  fieldkey: string;
  id: number;
  name: string;
}

const SelectComboboxTagItem: React.FC<SelectComboboxTagItemProps> = ({
  fieldkey,
  id,
  name,
}) => {
  return (
    <div
      style={{ lineHeight: 1.625 }}
      className="flex min-w-0 flex-row items-center rounded-lg border bg-white py-1 px-2 text-center text-gray-500"
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </span>
      <button type="button">
        <XIcon className="ml-2 h-5 w-5 fill-current" />
      </button>
    </div>
  );
};

export default SelectComboboxTagItem;
