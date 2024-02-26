import styles from "./styles.module.css";
import { AsideChangelog } from "~/components/shared/future/AsideChangelog";
import { AsideDraft } from "~/components/shared/future/AsideDraft";
import { AsideTrendingArticle } from "~/components/shared/future/AsideTrendingArticle";
import { AsideBookmark } from "~/components/shared/future/AsideBookmark";
import { AsideFooter } from "~/components/shared/future/AsideFooter";
import { useOptionalSession } from "~/services/hooks/useSession";
import { AsideProvider, useAsideContext } from "./provider/aside";

function InternalHashnodeAside() {
  const session = useOptionalSession();
  const { scrollPosition } = useAsideContext();

  return (
    <aside
      className={styles.root}
      style={{
        ...(scrollPosition > 0
          ? {
              top: `-${scrollPosition}px`,
              position: "sticky",
            }
          : {
              top: 0,
              position: "relative",
            }),
      }}
    >
      <section aria-hidden="false"></section>
      <div className={styles.content}>
        <div className={styles.content_container}>
          <AsideChangelog />
          {session && <AsideDraft />}
          <AsideTrendingArticle />
          {session && <AsideBookmark />}
          <AsideFooter />
        </div>
      </div>
    </aside>
  );
}

export default function HashnodeAside() {
  return (
    <AsideProvider>
      <InternalHashnodeAside />
    </AsideProvider>
  );
}
