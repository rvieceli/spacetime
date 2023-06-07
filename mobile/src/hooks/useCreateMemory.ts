import { z } from "zod";
import { Media, isMedia } from "../components/MediaPicker";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { createMemoryAndUploadToS3 } from "../services/createMemoryAndUploadToS3";

const FormSchema = z.object({
  is_public: z.boolean().default(false),
  content: z.string().trim().nonempty(),
  file: z.custom<Media>(isMedia),
});

type FormValues = z.infer<typeof FormSchema>;

export function useCreateMemory(onCompleted: () => void) {
  const { handleSubmit, ...form } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
  });

  const mutation = useMutation({
    mutationFn: createMemoryAndUploadToS3,
    onSuccess: () => {
      onCompleted();
    },
  });

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async (values) => mutation.mutate(values),
    [mutation.mutate]
  );

  return {
    form,
    handleSubmit: handleSubmit(onSubmit),
    mutation,
  };
}
