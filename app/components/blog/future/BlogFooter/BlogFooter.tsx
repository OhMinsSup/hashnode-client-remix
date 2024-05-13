import { Icons } from '~/components/icons';

export default function BlogFooter() {
  return (
    <footer className="blog-footer-area -mt-px border-t bg-slate-100 px-5 py-10 text-center text-slate-800 dark:border-slate-800 dark:bg-black dark:text-slate-500 md:px-10 md:py-12 lg:py-20">
      <div className="blog-footer-credits flex flex-col items-center justify-center">
        <div className="mb-12 flex flex-col flex-wrap items-center">
          <p className="mb-2 text-slate-600 dark:text-slate-300">
            {`©2024 OhMinSup's team blog`}
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center text-slate-600 dark:text-slate-300">
            <a
              href="https://hashnode.com/privacy?source=blog-footer"
              className="mx-2 underline"
            >
              Privacy policy
            </a>
            <span className="font-extrabold text-black opacity-20 dark:text-white">
              ·
            </span>
            <a
              className="mx-2 underline"
              href="https://hashnode.com/terms?source=blog-footer"
            >
              Terms
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <a
            aria-label="Publish with Hashnode"
            className="font-heading mb-4 flex flex-row items-center rounded-lg border border-slate-300 bg-white p-3 font-medium text-slate-600 transition-colors duration-75 hover:border-slate-400 hover:text-slate-900 dark:border-slate-800 dark:bg-black dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white"
            href="https://hashnode.com/onboard?unlock-blog=true&amp;source=blog-footer"
          >
            <span className="mr-2 block text-blue-600">
              <Icons.hashnodeTypeHeaderMobile className=" w-8 fill-current" />
            </span>
            <span>Write on Hashnode</span>
          </a>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Powered by{' '}
            <a
              aria-label="Hashnode"
              href="https://hashnode.com?source=blog-footer"
              className="underline"
            >
              Hashnode
            </a>{' '}
            - Home for tech writers and readers
          </p>
        </div>
      </div>
    </footer>
  );
}
