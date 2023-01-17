import { Link } from "@remix-run/react";
import React from "react";
import { CreateIcon, DownArrow } from "~/components/ui/Icon";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface WriteButtonGroupProps {}
const WriteButtonGroup: React.FC<WriteButtonGroupProps> = () => {
  return (
    <div className="write-button-group">
      <div className="write-button">
        <Link to={PAGE_ENDPOINTS.CREATE.STORY}>
          <CreateIcon className="icon mr-2" />
          <span>Write</span>
        </Link>
        <div className="custom-divide"></div>
        <button type="button">
          <DownArrow className="icon" />
        </button>
      </div>
    </div>
  );
};

export default WriteButtonGroup;
