import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import { cn } from "~/utils/utils";

export default function SearchhDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className={styles.search_container}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className={cn(styles.btn_search, {
              "!text-blue-600": open,
            })}
            aria-label="Open Hashnode searchbar"
          >
            <Icons.Search />
          </button>
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <SearchForm />
          <SearchResults />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SearchForm() {
  return (
    <section className="px-6 mb-4">
      <form className={cn(styles.search_form)}>
        <input
          type="text"
          placeholder="Start typing to search"
          autoComplete="off"
          className={cn(styles.search_form_input)}
        />
      </form>
    </section>
  );
}

function SearchResults() {
  return (
    <section className={cn(styles.search_result)}>
      <span>Search for tags, people, articles, and more</span>
    </section>
  );
}
