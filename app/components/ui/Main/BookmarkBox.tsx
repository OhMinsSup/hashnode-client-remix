import { Link } from "@remix-run/react";
import React from "react";
import RightContentBox from "~/components/ui/main/RightContentBox";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface BookmarkBoxProps {}

const BookmarkBox: React.FC<BookmarkBoxProps> = () => {
  return (
    <RightContentBox title="Bookmarks" to={PAGE_ENDPOINTS.BOOKMARKS.ROOT}>
      <div>
        <div>
          <h3 className="bookmark-desc">
            <Link to="/">
              Instantly Solving SEO and Providing SSR for Modern JavaScript
              Websites Independently of Frontend and Backend Stacks
            </Link>
          </h3>
          <p className="username">
            <Link to="/" aria-label="Post info">
              eron
            </Link>
          </p>
        </div>
      </div>
    </RightContentBox>
  );
};

export default BookmarkBox;
