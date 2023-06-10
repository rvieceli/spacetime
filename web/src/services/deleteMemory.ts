import { api } from '@/lib/api';

export async function deleteMemory(id: string) {
  await api.delete(`/memories/${id}`);
}
