"use client";

import { MediaPicker } from "@/components/MediaPicker";
import { Camera } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { createMemoryAndUploadToS3 } from "@/services/createMemoryAndUploadToS3";
import classNames from "classnames";
import { isAxiosError } from "axios";

const FormSchema = z.object({
  is_public: z.boolean().default(false),
  content: z.string().trim().nonempty(),
  file: z.custom<FileList>(
    (files) => !!files && files instanceof FileList && files.length > 0,
    "You must attach a file"
  ),
});

type FormValues = z.infer<typeof FormSchema>;

export function Form() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    clearErrors,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(async (values) => {
    const { content, file, is_public } = values;
    try {
      await createMemoryAndUploadToS3({
        content,
        is_public,
        file: file[0],
      });

      router.push(`/`);
    } catch (error) {
      const message = isAxiosError(error)
        ? error.message
        : "Something went wrong. Check the form and try again.";

      setError("root", {
        type: "manual",
        message,
      });
    }
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

      <div className="flex flex-row items-start justify-between gap-2">
        {errors.file || errors.content || errors.root ? (
          <button
            className={classNames("rounded bg-red-500 px-4 py-1 text-left")}
            onClick={() => clearErrors()}
          >
            {errors.file && (
              <p className="text-xs text-white">{errors.file.message}</p>
            )}

            {errors.content && (
              <p className="text-xs text-white">{errors.content.message}</p>
            )}

            {errors.root && (
              <p className="text-xs text-white">{errors.root.message}</p>
            )}
          </button>
        ) : (
          <div />
        )}

        <button
          type="submit"
          className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving" : "Save"}
        </button>
      </div>
    </form>
  );
}
