import { getSupaPosts } from "../lib/getSupaPosts";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

export default async function Home() {
  const posts = await getSupaPosts();
  return (
    <main>
      <div>
        {posts.length > 0 ? (
          <>
            <Pagination
              allPosts={posts}
              pageCountDisplay={5}
              postsPerPage={4}
            />
          </>
        ) : (
          <h1>No Posts to display</h1>
        )}
      </div>
    </main>
  );
}
