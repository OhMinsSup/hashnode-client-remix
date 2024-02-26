import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import RecommendedUser from "~/components/shared/future/RecommendedUser/RecommendedUser";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface RecommendedUsersBoxProps {
  data?: FetchRespSchema.UserListResp;
}

export default function RecommendedUsersBox({
  data,
}: RecommendedUsersBoxProps) {
  const users = data?.list ?? [];

  return (
    <div className={styles.root}>
      <div className={styles.title_area}>
        <div>Recommended Users for you</div>
        <Link to={PAGE_ENDPOINTS.EXPLORE.BLOGS}>
          <span className={styles.title_link_container}>
            <span>Browse more users</span>
            <Icons.V2.MoveRight />
          </span>
        </Link>
      </div>
      <div className={styles.content_area}>
        {users.map((user) => {
          return (
            <RecommendedUser key={`recommended-user-${user.id}`} user={user} />
          );
        })}
      </div>
    </div>
  );
}
