import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

// hooks
import { useLoaderData } from "@remix-run/react";

// types
import type { RootLoader } from "~/root";

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  const { env } = useLoaderData<RootLoader>();
  return (
    <body className={classNames(styles.root, "m-0 h-auto overflow-auto")}>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(env)}`,
        }}
      />
      {children}
    </body>
  );
}
