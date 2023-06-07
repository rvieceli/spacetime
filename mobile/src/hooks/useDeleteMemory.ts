import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteMemory } from "../services/deleteMemory";

export function useDeleteMemory(onSuccess?: () => void) {
  return useMutation({
    mutationFn: deleteMemory,
    onSuccess,
  });
}
