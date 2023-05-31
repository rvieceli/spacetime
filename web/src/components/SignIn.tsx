import { GITHUB_OAUTH_URL } from "@/constants";
import { User } from "lucide-react";

export function SignIn() {
  return (
    <a
      href={GITHUB_OAUTH_URL}
      className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
    >
      <div className="flex aspect-square h-10 items-center justify-center rounded-full bg-gray-400">
        <User className="aspect-square h-5 text-gray-500" />
      </div>

      <p className="max-w-[20ch] text-sm leading-snug">
        <span className="underline">Create your account</span> and save your
        memories!
      </p>
    </a>
  );
}
