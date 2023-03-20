import React, { useCallback } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import Button from "~/components/__ui/shared/Button";
import { useListContext } from "~/context/useListContext";

interface FormFieldValuse {
  time: string;
  keyword: string;
}

const ListSearchFilter = () => {
  const { closeFilter } = useListContext();
  const { register, handleSubmit } = useForm<FormFieldValuse>();

  const onSubmit: SubmitHandler<FormFieldValuse> = useCallback(
    (data) => {
      console.log(data);
      closeFilter();
    },
    [closeFilter]
  );

  const onReset = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      console.log("reset", e);
      closeFilter();
    },
    [closeFilter]
  );

  return (
    <div className="search-filter">
      <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
        <div className="search-form">
          <div className="time-area">
            <label htmlFor="list-search-filter-time">Time</label>
            <div className="time-container">
              <select id="list-search-filter-time" {...register("time")}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div className="keyword-area">
            <label htmlFor="list-search-filter-keyword">Keyword</label>
            <div className="keyword-container">
              <div className="mr-2 flex w-full flex-col">
                <div className="keyword">
                  <input
                    type="text"
                    id="list-search-filter-keyword"
                    autoComplete="off"
                    placeholder="Search by keyword"
                    {...register("keyword")}
                  />
                </div>
              </div>
              <div className="search-footer">
                <Button
                  type="submit"
                  className="btn-submit"
                  aria-label="Apply filters to feed"
                >
                  Apply
                </Button>
                <Button
                  className="btn-clear"
                  type="reset"
                  aria-label="Clear selected filters"
                >
                  Clear Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListSearchFilter;
