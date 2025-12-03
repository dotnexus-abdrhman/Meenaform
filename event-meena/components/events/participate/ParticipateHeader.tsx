"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

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
            <div className="relative bg-[#1a56db] p-2 rounded-xl group-hover:bg-[#1648c7] transition-colors duration-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Event <span className="text-[#1a56db]">Meena</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

