import { format } from "@/lib/date";
import classNames from "classnames";
import { ArrowRight } from "lucide-react";
import mime from "mime";
import Link from "next/link";

interface MemoryCardProps {
  memory: {
    id: string;
    cover_url: string;
    excerpt: string;
    created_at: Date;
  };
}

export function MemoryCard({ memory }: MemoryCardProps) {
  function renderMedia() {
    const mimeType = mime.getType(memory.cover_url);

    if (mimeType?.startsWith("video")) {
      return (
        <video
          src={memory.cover_url}
          className="aspect-video w-full rounded-lg object-cover"
          controls
        />
      );
    }

    if (mimeType?.startsWith("image")) {
      return (
        <img
          src={memory.cover_url}
          alt=""
          width={592}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
        />
      );
    }

    return null;
  }

  return (
    <div className="space-y-4">
      <time
        className={classNames(
          "-ml-8 flex items-center gap-2 text-sm text-gray-100",
          "before:h-px before:w-5 before:bg-gray-50"
        )}
      >
        {format(memory.created_at)}
      </time>

      {renderMedia()}

      <p className="text-lg leading-relaxed text-gray-100">{memory.excerpt}</p>

      <Link
        href={`/memories/${memory.id}`}
        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
      >
        Read more
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="my-1 h-3.5 w-[10ch] animate-pulse bg-gray-50/25" />
      <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-50/25 object-cover" />

      <div>
        <div className="mt-3 h-6 w-full animate-pulse bg-gray-50/25" />
        <div className="mt-3 h-6 w-[80%] animate-pulse bg-gray-50/25" />
      </div>
      <div>
        <div className="mt-6 h-3.5 w-[15ch] animate-pulse bg-gray-50/25" />
      </div>
    </div>
  );
}

MemoryCard.Skeleton = Skeleton;
