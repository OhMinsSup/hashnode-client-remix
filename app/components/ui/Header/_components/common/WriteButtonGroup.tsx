import { Link } from "@remix-run/react";
import React from "react";
import { CreateIcon } from "~/components/ui/Icon";

interface WriteButtonGroupProps {}
const WriteButtonGroup: React.FC<WriteButtonGroupProps> = () => {
  return (
    <div className="relative hidden md:block">
      <div className="flex flex-row rounded-full bg-blue-500 text-white">
        <Link
          to="/"
          className="relative flex flex-row items-center p-[0.625rem] text-sm font-medium tracking-wide"
        >
          <CreateIcon className="mr-2 h-4 w-4 fill-current" />
          <span>Publish</span>
        </Link>
      </div>
    </div>
  );
};

export default WriteButtonGroup;
