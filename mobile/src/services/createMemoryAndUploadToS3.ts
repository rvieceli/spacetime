import { createUploadSignature } from "./createUploadSignature";
import { Media } from "../components/MediaPicker";
import mime from "mime";
import { uploadToS3 } from "./uploadToS3";
import { createMemory } from "./createMemory";

export async function createMemoryAndUploadToS3({
  content,
  is_public,
  file,
}: {
  content: string;
  is_public: boolean;
  file: Media;
}) {
  const contentType = mime.getType(file.uri) as string;
  const presignedPostUrl = await createUploadSignature(contentType);

  const memory = await createMemory({
    content,
    is_public,
    cover_url: presignedPostUrl.file_url,
  });

  await uploadToS3(file, presignedPostUrl);

  return memory;
}
