import { getUser } from "@/lib/jwt";
import Image from "next/image";

export function Profile() {
  const { name, avatar_url } = getUser();

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatar_url}
        alt={name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />

      <p className="text-sm leading-snug">
        {name}

        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Logout
        </a>
      </p>
    </div>
  );
}
