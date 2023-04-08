// app/tags/page.jsx
import Link from "next/link";
import React from "react";
import { getSupaTags } from "../../lib/getSupaPosts";
async function AllTagsPage() {
  const tags = await getSupaTags();
  return (
    <div>
      <h1 className="text-3xl font-medium py-4">All Tags</h1>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link
              className="underline font-medium text-blue-300 py-2"
              href={`/tags/${tag.id}`}
            >
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTagsPage;
