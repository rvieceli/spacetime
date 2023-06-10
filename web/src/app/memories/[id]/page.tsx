import Link from "next/link";
import classNames from "classnames";
import mime from "mime";
import { ChevronLeft } from "lucide-react";

import { getMemory } from "@/services/getMemory";
import { format } from "@/lib/date";

export default async function MemoryPage({
  params,
}: {
  params: { id: string };
}) {
  const memory = await getMemory(params.id);

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        prefetch={false}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to timeline
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        {mime.getType(memory.cover_url)?.startsWith("video") ? (
          <video
            src={memory.cover_url}
            className="aspect-video w-full rounded-lg object-cover"
            controls
          />
        ) : (
          <img
            src={memory.cover_url}
            alt=""
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
        )}

        <p className="text-justify text-lg leading-relaxed text-gray-100">
          {memory.content}
        </p>

        <time
          className={classNames(
            "-ml-8 flex items-center gap-2 text-sm text-gray-100",
            "before:h-px before:w-5 before:bg-gray-50"
          )}
        >
          {format(memory.created_at, "full")}
        </time>
      </div>
    </div>
  );
}
