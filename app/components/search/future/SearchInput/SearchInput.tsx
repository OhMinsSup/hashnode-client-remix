import React from "react";
import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";

export default function SearchInput() {
  return (
    <section className="mb-8 mt-2">
      <form className={styles.form}>
        <span className={styles.icon_container}>
          <Icons.V2.SearchInput />
        </span>
        <input
          type="text"
          autoComplete="off"
          placeholder="Start typing to search"
          content="search-page"
          id="header-search-field"
          className={styles.input}
          value="react"
        />
      </form>
    </section>
  );
}
