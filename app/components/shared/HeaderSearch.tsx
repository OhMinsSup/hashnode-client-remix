import React, { useCallback, useMemo } from "react";
import classNames from "classnames";

// components
import { Icons } from "./Icons";

// hooks
import { useLayoutContext } from "~/context/useLayoutContext";

export default function HeaderSearch() {
  const { search, changeSearchKeyword } = useLayoutContext();
  const isSearchActive = useMemo(() => !!search.keyword, [search.keyword]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    changeSearchKeyword({ keyword: formData.get("keyword")?.toString() || "" });
  };

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeSearchKeyword({ keyword: e.target.value });
    },
    [changeSearchKeyword]
  );

  return (
    <div className="header__search">
      <form method="get" onSubmit={onSubmit}>
        <span>
          <Icons.Search className="icon__sm fill-current" />
        </span>
        <input
          type="search"
          name="keyword"
          id="header__search-input"
          aria-label="search"
          aria-labelledby="header__search-info"
          value={search.keyword}
          onChange={onChange}
          placeholder="Search for tags, people, articles, and many more"
        />
        <span
          id="header__search-info"
          aria-labelledby="header__search-input"
          className={classNames({
            active: isSearchActive,
          })}
        >
          {isSearchActive ? (
            <>
              <p>Press</p>
              <span>↵</span>
              <p>to see all results</p>
            </>
          ) : (
            <span className="slash">/</span>
          )}
        </span>
      </form>
    </div>
  );
}
