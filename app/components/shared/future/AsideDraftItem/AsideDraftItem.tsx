import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import type { SerializeFrom } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { mainWidgetDraftItemFormatter } from "~/utils/date";

interface AsideDraftItemProps {
  data: SerializeFrom<SerializeSchema.SerializePost>;
}

export default function AsideDraftItem({ data }: AsideDraftItemProps) {
  const date = new Date(data.updatedAt);
  const monthWithDay = mainWidgetDraftItemFormatter(date);

  return (
    <div className={styles.item}>
      <Link to={PAGE_ENDPOINTS.WRITE.ID(data.id)} className={styles.item_title}>
        {data.title || "No title"}
      </Link>
      <div className={styles.item_desc}>
        <p className={styles.item_desc_date}>Edited {monthWithDay}</p>
        <span className="inline-block mx-2 font-bold opacity-50 ">·</span>
        <Link
          to={PAGE_ENDPOINTS.WRITE.ID(data.id)}
          className={styles.item_btn_edit}
        >
          <p className={styles.item_btn_edit_text}>Continue editing</p>
          <Icons.V2.DraftEditIcon />
        </Link>
      </div>
    </div>
  );
}
