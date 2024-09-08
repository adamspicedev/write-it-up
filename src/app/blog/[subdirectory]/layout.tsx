import { type ReactNode } from "react";

const BlogLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="mx-auto mb-24 max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </main>
  );
};

export default BlogLayout;
