import axios from "axios";
import { Media } from "../components/MediaPicker";
import mime from "mime";

export async function uploadToS3(
  file: Media,
  presignedPostUrl: {
    url: string;
    fields: Record<string, string>;
  }
) {
  const contentType = mime.getType(file.uri) as string;

  const formData = new FormData();

  formData.append("Content-Type", contentType);

  Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
    formData.append(k, v);
  });

  formData.append("file", {
    uri: file.uri,
    name: file.fileName,
    type: contentType,
  } as any);

  await axios.post(presignedPostUrl.url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
