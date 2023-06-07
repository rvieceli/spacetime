import { useQuery } from "@tanstack/react-query";
import { getMemories } from "../services/getMemories";

export function useGetMemories() {
  return useQuery({
    queryKey: ["memories"],
    queryFn: () => getMemories(),
  });
}
