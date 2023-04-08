import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
interface Post {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
}
export default function PostCard({ title, slug, date, excerpt }: Post) {
  return (
    <div className="my-10">
      <Link href={`../posts/${slug}`}>
        <h1 className="text-xl font-semibold pb-3">{title}</h1>
      </Link>
      <p className="text-md pb-2">{excerpt}</p>{" "}
      <div className="text-sm font-normal text-gray-400 ">
        <p>{dayjs(date).format("MMMM D, YYYY")}</p>
      </div>
    </div>
  );
}
