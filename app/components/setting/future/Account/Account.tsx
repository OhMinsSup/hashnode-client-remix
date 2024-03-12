import React from "react";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
import { useSession } from "~/services/hooks/useSession";
import { Form } from "@remix-run/react";

export default function Account() {
  const session = useSession();

  return (
    <Form method="delete" className={styles.root}>
      <h2 className="mb-4 text-xl font-semibold text-red-600">
        Delete account
      </h2>
      <p className="mb-2">
        Your Hashnode account administers these blogs:
        <strong>{session?.userProfile?.username}.hashnode.dev</strong>
      </p>
      <p className="mb-10">
        Your personal data will be deleted permanently when you delete your
        account on Hashnode. This action is irreversible.{" "}
      </p>
      <button
        type="submit"
        className={cn("button-transparent", styles.btn_delete)}
      >
        Delete your account
      </button>
    </Form>
  );
}
