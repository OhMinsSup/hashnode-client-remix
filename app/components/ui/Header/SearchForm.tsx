import React, { useRef } from "react";
import classNames from "classnames";

// components
import { If, Else, Then } from "react-if";
import { SearchIcon } from "~/components/ui/Icon";

// hooks
import { useSearchFieldState } from "react-stately";
import { useSearchField } from "react-aria";

const SearchForm = () => {
  const ref = useRef<HTMLInputElement>(null);

  const state = useSearchFieldState({
    placeholder: "Search for tags, people, articles, and many more",
  });

  const { labelProps, inputProps } = useSearchField(
    {
      label: "Search",
      "aria-label": "Search",
      "aria-autocomplete": "list",
      "aria-labelledby": "search-info",
      onSubmit(value) {
        console.log(value);
      },
    },
    state,
    ref
  );

  return (
    <div className="header-search-area">
      <form>
        <span className="search-icon-container" {...labelProps}>
          <SearchIcon className="icon-sm" />
        </span>
        <input {...inputProps} className="input-seach" />
        <span
          id="search-info"
          className={classNames("search-info-container", {
            active: !!state.value,
          })}
        >
          <If condition={!!state.value}>
            <Then>
              <p>Press</p>
              <span>↵</span>
              <p>to see all results</p>
            </Then>
            <Else>
              <span className="slash">/</span>
            </Else>
          </If>
        </span>
      </form>
    </div>
  );
};

export default SearchForm;
