"use client";

import { MediaPicker } from "@/components/MediaPicker";
import { Camera } from "lucide-react";
import { SubmitHandler, UseFormHandleSubmit, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { upload } from "@/services/upload";
import { createMemory } from "@/services/createMemory";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  is_public: z.boolean().default(false),
  content: z.string().trim().nonempty(),
  file: z.custom<FileList>((files) => files instanceof FileList),
});

type FormValues = z.infer<typeof FormSchema>;

export function Form() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(async (values) => {
    const { content, file, is_public } = values;

    const formData = new FormData();

    formData.append("file", file[0]);

    const { file_url } = await upload(formData);

    await createMemory({
      content,
      is_public,
      cover_url: file_url,
    });

    router.push(`/memories`);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col gap-2"
    >
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Attach a cover image or video
        </label>
        <label
          htmlFor="is_public"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            id="is_public"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            {...register("is_public")}
          />
          Make it public
        </label>
      </div>

      <MediaPicker id="media" {...register("file")} />

      <textarea
        spellCheck={false}
        className="text-gray-10 w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed placeholder:text-gray-400 focus:ring-0"
        placeholder="What do you want to remember? photos, videos, links, text, etc."
        {...register("content")}
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
      >
        Save
      </button>
    </form>
  );
}
