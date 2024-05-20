import { BlogTemplate } from '~/components/blog/future/BlogTemplate';
import { cn } from '~/services/libs';

// style={{
//   backgroundColor: 'rgb(41, 98, 255)',
//   transform: 'translateY(0px)',
// }}

export default function BlogDetailHeader() {
  return (
    <header
      className={cn(
        'blog-header relative z-50 w-full transform-none border-b border-transparent md:sticky md:left-0 md:top-0 md:border-none md:backdrop-blur-lg',
      )}
    >
      <div className="container mx-auto px-2 md:px-4 md:py-1 2xl:px-10">
        <BlogTemplate.Header />
        <BlogTemplate.SubHeader />
      </div>
    </header>
  );
}
