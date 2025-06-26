import React from "react";

const NoBlogsFound = () => {
  return (
    <article className="w-full h-[50dvh] bg-slate-200 flex justify-center items-center">
      <h1 className="text-2xl font-semibold text-center">لا يوجد مقالات</h1>
    </article>
  );
};

const BlogsList = ({ blogs }) => {
  return (
    <article>
      <div className="blog_list">
        <div className="text-2xl font-semibold">المقالات</div>

        <div>{blogs?.articles?.length === 0 && <NoBlogsFound />}</div>

        <div className="grid grid-cols-4 gap-4">
          {blogs.articles === null &&
            blogs?.articles?.map((blog) => (
              <Link
                href={`/blogs/${blog._id}`}
                key={blog._id}
                className="p-4 bordered hover:scale-95"
              >
                {blog.title}
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
};

export default BlogsList;
