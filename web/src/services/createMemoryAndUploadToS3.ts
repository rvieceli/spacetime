import { createUploadSignature } from "./createUploadSignature";
import { uploadToS3 } from "./uploadToS3";
import { createMemory } from "./createMemory";

export async function createMemoryAndUploadToS3({
  content,
  is_public,
  file,
}: {
  content: string;
  is_public: boolean;
  file: File;
}) {
  const presignedPostUrl = await createUploadSignature(file.type);

  const memory = await createMemory({
    content,
    is_public,
    cover_url: presignedPostUrl.file_url,
  });

  await uploadToS3(file, presignedPostUrl);

  return memory;
}
