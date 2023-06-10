import axios from "axios";

export async function uploadToS3(
  file: File,
  presignedPostUrl: {
    url: string;
    fields: Record<string, string>;
  }
) {
  const formData = new FormData();

  formData.append("Content-Type", file.type);

  Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
    formData.append(k, v);
  });

  formData.append("file", file);

  await axios.post(presignedPostUrl.url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
