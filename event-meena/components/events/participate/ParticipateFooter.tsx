"use client";

export default function ParticipateFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-6">
        {/* Copyright - بسيط ونظيف */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            جميع الحقوق محفوظة © Event Meena {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}

