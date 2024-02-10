import Link from "next/link";

export default function App() {
  return (
    <div className="p-2">
      <h2>Hello</h2>
      <Link href="/app" className="text-blue-500">App Page</Link>
    </div>
  );
}
