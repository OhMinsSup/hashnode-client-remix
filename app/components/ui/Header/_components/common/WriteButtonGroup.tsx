import { Link } from "@remix-run/react";
import React from "react";
import { CreateIcon } from "~/components/ui/Icon";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface WriteButtonGroupProps {}
const WriteButtonGroup: React.FC<WriteButtonGroupProps> = () => {
  return (
    <div className="relative hidden md:block">
      <div className="flex flex-row rounded-full bg-blue-500 text-white">
        <Link
          to={PAGE_ENDPOINTS.CREATE.STORY}
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
