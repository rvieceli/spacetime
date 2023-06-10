import { isAuthenticated } from "@/lib/cookie";
import { Empty } from "./Empty";
import { getMemories } from "@/services/getMemories";
import { MemoryCard } from "@/components/MemoryCard";

export default async function Home() {
  if (!isAuthenticated()) {
    return <Empty className="p-16" />;
  }

  const memories = await getMemories();

  if (!memories.length) {
    return <Empty className="p-16" />;
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </div>
  );
}
