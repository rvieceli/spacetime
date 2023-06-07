import { useQuery } from "@tanstack/react-query";
import { getMemory } from "../services/getMemory";

export function useGetMemory(id: string) {
  return useQuery({
    queryKey: ["memory", id],
    queryFn: () => getMemory(id),
  });
}
