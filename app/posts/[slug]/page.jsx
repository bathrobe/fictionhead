import Link from "next/link";
import {
  getSupaPosts,
  getSupaPostById,
  getSupaTagsByDocId,
} from "../../../lib/getSupaPosts";
import dayjs from "dayjs";

// get posts as array of objects
export async function generateStaticParams() {
  const posts = await getSupaPosts();
  return posts?.map((post) => ({
    slug: post.id,
  }));
}

export default async function Post({ params }) {
  let post = await getSupaPostById(params.slug);
  post.tags = [];
  post = post[0];
  let tags = await getSupaTagsByDocId(params.slug);
  const tagString = tags.map((tag, idx) => (
    <span
      className={`text-gray-400 ${
        idx == 0 ? "pr-3" : idx == tags?.length ? "pl-3" : "px-3"
      }`}
      key={tag.id}
    >
      <Link href={`/tags/${tag.id}`}>#{tag.name}</Link>
    </span>
  ));
  return (
    <article className="mt-24">
      <div className="prose prose-invert text-gray-50 prose-h1:text-gray-50 prose-h2:text-gray-50 prose-h3:text-gray-50">
        <h1>{post?.title}</h1>
        <p>
          Retrieved at {dayjs(post.created_at).format("YYYY-MM-DD")} /{" "}
          <a href={post?.url}>{post?.url}</a>
        </p>
        <div>{tagString}</div>
        <h3 className="text-gray-400">AI Summary</h3>
        <p>{post?.ai_summary}</p>

        <h3 className="text-gray-400">Meta Description</h3>
        <p>{post?.meta_description}</p>
      </div>
    </article>
  );
}
