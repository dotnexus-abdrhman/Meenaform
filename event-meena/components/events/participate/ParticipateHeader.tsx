"use client";

import Link from "next/link";
import Image from "next/image";

interface ParticipateHeaderProps {
  creatorName: string;
}

export default function ParticipateHeader({ creatorName }: ParticipateHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          {/* Logo - مطابق للوحة التحكم */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.png"
              alt="مينا إيفنت"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-gray-900">
              مينا <span className="text-[#1a56db]">إيفنت</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

