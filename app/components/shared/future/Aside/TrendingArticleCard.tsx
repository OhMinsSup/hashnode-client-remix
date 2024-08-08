export default function TrendingArticleCard() {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="line-clamp-2 cursor-pointer font-semibold text-slate-700 dark:text-slate-300">
        Building Web Applications with Django: A Comprehensive Guide
      </h2>
      <div className="flex h-6 flex-row items-center text-sm font-medium text-slate-500 dark:text-slate-400">
        <p>
          <a
            aria-label="Post Author"
            title="ByteScrum Technologies"
            href="/@bytescrum"
          >
            ByteScrum Technolo...
          </a>
        </p>
        <span className="mx-2 ml-0 inline-block font-bold opacity-50">·</span>
        <p>280 reads</p>
      </div>
    </div>
  );
}
