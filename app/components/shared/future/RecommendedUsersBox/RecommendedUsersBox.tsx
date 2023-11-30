import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import RecommendedUser from "~/components/shared/future/RecommendedUser/RecommendedUser";
import { Link } from "@remix-run/react";
import { isEmpty, isUndefined } from "~/utils/assertion";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import type { SerializeFrom } from "@remix-run/cloudflare";

interface RecommendedUsersBoxProps {
  data?: SerializeFrom<FetchRespSchema.UserListResp>;
}

export default function RecommendedUsersBox({
  data,
}: RecommendedUsersBoxProps) {
  if (isUndefined(data)) return null;

  console.log(data);

  const users = data.list ?? [];

  if (isEmpty(users)) return null;

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
