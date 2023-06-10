import { HTMLAttributes } from "react";
import Link from "next/link";
import classNames from "classnames";

export function Empty({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        "flex flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
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
