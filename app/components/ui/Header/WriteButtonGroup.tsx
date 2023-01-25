import React from "react";

// components
import { Link } from "@remix-run/react";
import { CreateIcon } from "~/components/ui/Icon";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface WriteButtonGroupProps {}
const WriteButtonGroup: React.FC<WriteButtonGroupProps> = () => {
  return (
    <div className="write-button-group">
      <div className="write-button">
        <Link to={PAGE_ENDPOINTS.CREATE.STORY}>
          <CreateIcon className="icon-sm mr-2" />
          <span>Write</span>
        </Link>
      </div>
    </div>
  );
};

export default WriteButtonGroup;
