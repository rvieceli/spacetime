import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Form } from "./Form";

export default function NewMemoryPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="hover: flex items-center gap-1 text-sm text-gray-100 text-gray-200"
        prefetch={false}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to timeline
      </Link>

      <Form />
    </div>
  );
}
