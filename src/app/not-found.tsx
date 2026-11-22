import Link from "next/link";

export default function NotFound() {
  return <main className="mx-auto p-12"><h1>Page not found</h1><Link href="/">Back to home</Link></main>;
}
