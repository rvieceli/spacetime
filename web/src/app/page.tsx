import { User } from "lucide-react";

import logo from "../assets/logo.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover p-16 px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[288px] w-[525px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-huge" />
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        <a
          href="#"
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

        <div className="space-y-5">
          <Image src={logo} alt="Spacetime logo" />

          <div className="max-w-[420px] space-y-1">
            <h1 className="text-5xl font-bold leading-tight text-gray-50">
              Your time capsule
            </h1>
            <p className="text-lg leading-relaxed">
              Collect memorable moments from your journey and share them (if you
              like) with the world!
            </p>
          </div>

          <a
            href="#"
            className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
          >
            Register a memory
          </a>
        </div>

        <div className="text-sm leading-relaxed text-gray-200">
          Made for learning purposes by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/rvieceli"
            className="hover: text-gray-100 underline"
          >
            rvieceli
          </a>
        </div>
      </div>
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center leading-relaxed">
            You don't have any memories,
            <br /> start{" "}
            <a className="underline hover:text-gray-50" href="#">
              creating now
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
