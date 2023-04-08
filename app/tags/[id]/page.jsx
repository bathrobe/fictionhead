// app/tags/[tagId]/page.tsx
import React from "react";
import Link from "next/link";
import {
  getSupaTagsByDocId,
  getSupaPostsByTagId,
  getSupaTags,
  getSupaTagNameById,
} from "../../../lib/getSupaPosts";
import dayjs from "dayjs";

export async function generateStaticParams() {
  const tags = await getSupaTags();
  return tags?.map((tag) => ({
    id: tag.id,
  }));
}

export default async function TagPage({ params }) {
  const tagId = params.id;
  const tagName = await getSupaTagNameById(tagId);
  const posts = await getSupaPostsByTagId(tagId);

  return (
    <div>
      <h1 className="text-2xl font-semibold py-8">Tag: {tagName}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              className="underline font-medium text-blue-300"
              href={`/posts/${post.id}`}
              key={post.id}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
