import Link from "next/link";
import PCMLogo from "./PCMLogo";
export default function Header() {
  return (
    <nav className="flex items-center focus:outline-0 focus:shadow-none focus:ring-0 focus:outline-none  justify-between w-full py-4 ">
      <Link href="/">
        <PCMLogo />
      </Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
