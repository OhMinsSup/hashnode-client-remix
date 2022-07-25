import React from "react";

interface ItemGroupProps {}

const ItemGroup: React.FC<ItemGroupProps> = () => {
  return (
    <div className="flex flex-row items-center justify-end">
      <div>MenuGroup</div>
    </div>
  );
};

export default ItemGroup;
