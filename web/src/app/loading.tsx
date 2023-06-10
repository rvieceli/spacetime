import { MemoryCard } from "@/components/MemoryCard";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10 overflow-hidden p-8">
      <MemoryCard.Skeleton />
      <MemoryCard.Skeleton />
      <MemoryCard.Skeleton />
    </div>
  );
}
