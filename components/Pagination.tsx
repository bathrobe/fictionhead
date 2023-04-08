"use client";
import { useState } from "react";
import PostCard from "./PostCard";
export default function Pagination({
  allPosts,
  pageCountDisplay,
  postsPerPage,
}) {
  const [pages] = useState(Math.ceil(allPosts.length / postsPerPage));
  // so if we have 10 posts and we want to show 5 per page, we have 2 pages
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedPosts = () => {
    const startIndex = currentPage * postsPerPage - postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return allPosts.slice(startIndex, endIndex);
  };

  const range = (min: number, max: number) =>
    [...Array(max - min + 1).keys()].map((i) => i + min);

  const getPaginationGroup = () => {
    let pageList = [];
    if (Math.ceil(allPosts.length / postsPerPage) === 1) {
      return [];
    } else if (allPosts.length / postsPerPage < pageCountDisplay) {
      let pageCount = Math.ceil(allPosts.length / postsPerPage);
      pageList = range(1, pageCount);
    } else if (currentPage > 2 && currentPage < pages - 2) {
      pageList = range(currentPage - 2, currentPage + 2);
    } else if (currentPage <= 2) {
      pageList = range(1, pageCountDisplay);
    } else if (currentPage >= pages - 2) {
      pageList = range(pages - 4, pages);
    }

    return pageList;
  };
  return (
    <>
      {getPaginatedPosts().map((post, idx) => (
        <PostCard
          key={idx}
          title={post.title}
          slug={post.id}
          date={post.created_at}
          excerpt={post.ai_summary}
        />
      ))}
      <div className="flex justify-center">
        <div>
          <button
            onClick={goToPreviousPage}
            className={`pr-4 ${currentPage === 1 ? "hidden" : ""}`}
          >
            prev
          </button>
          {/* show page numbers */}
          {getPaginationGroup().map((item, idx) => (
            <button
              className={`px-4 ${
                item === currentPage ? "text-gray-100" : "text-gray-500"
              }`}
              key={idx}
              onClick={changePage}
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            onClick={goToNextPage}
            className={`pl-4 ${currentPage === pages ? "hidden" : ""}`}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}
