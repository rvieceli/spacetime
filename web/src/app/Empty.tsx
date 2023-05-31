import Link from "next/link";

export function Empty() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="text-center leading-relaxed">
        You don't have any memories,
        <br /> start{" "}
        <Link className="underline hover:text-gray-50" href="/memories/new">
          creating now
        </Link>
      </p>
    </div>
  );
}
