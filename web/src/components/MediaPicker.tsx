"use client";

import {
  ChangeEventHandler,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";

type PreviewState = {
  type: "image" | "video";
  url: string;
};

export const MediaPicker = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [preview, setPreview] = useState<PreviewState | undefined>(undefined);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      props.onChange?.(event);

      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      setPreview({
        type: file.type.startsWith("image") ? "image" : "video",
        url: URL.createObjectURL(file),
      });
    },
    [props.onChange]
  );

  return (
    <>
      <input
        type="file"
        accept="image/*, video/*"
        className="invisible h-0 w-0"
        ref={ref}
        {...props}
        onChange={handleChange}
      />

      {preview?.type === "image" && (
        <img
          src={preview.url}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      {preview?.type === "video" && (
        <video
          src={preview.url}
          className="aspect-video w-full rounded-lg object-cover"
          controls
        />
      )}
    </>
  );
});
