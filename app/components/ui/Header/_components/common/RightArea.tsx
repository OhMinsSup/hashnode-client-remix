import React, { useMemo } from "react";

// hooks
import { useUserQuery } from "~/api/user/hooks/hook";

// data
import { Serialize } from "~/libs/serialize/serialize";

// components
import ItemGroup from "./ItemGroup";
import WriteButtonGroup from "./WriteButtonGroup";

interface RightAreaProps {}

const RightArea: React.FC<RightAreaProps> = () => {
  const { data } = useUserQuery();

  const profile = useMemo(() => {
    return Serialize.default({
      data,
    });
  }, [data]);

  return (
    <div className="col-span-8 flex flex-row items-center justify-end lg:col-span-4 lg:justify-between xl:col-span-3">
      <WriteButtonGroup />
      <ItemGroup />
    </div>
  );
};

export default RightArea;
