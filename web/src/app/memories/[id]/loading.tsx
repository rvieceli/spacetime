import { random } from "@/lib/random";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10 overflow-hidden p-8">
      <div className="space-y-4">
        <div className="my-1 h-3.5 w-[10ch] animate-pulse rounded-sm bg-gray-50/25" />
        <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-50/25 object-cover" />

        <div>
          {Array.from({ length: 30 }).map((_, index) => {
            const isSmall = index > 0 && (index % 5 === 0 || index % 7 === 0);

            return (
              <div
                key={index}
                className="mt-3 h-6  animate-pulse rounded-sm bg-gray-50/25"
                style={{ width: isSmall ? `${random(50, 100)}%` : "100%" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
