"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <h2 className="text-center leading-relaxed">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="inline-block rounded-full bg-purple-500 px-5 py-3 font-alt text-sm uppercase leading-none text-white transition-colors hover:bg-purple-600"
      >
        Try again
      </button>
    </div>
  );
}
