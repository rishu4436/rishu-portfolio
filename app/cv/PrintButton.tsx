'use client';

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-[#ddd] bg-white px-4 py-2 text-sm font-medium"
    >
      Print
    </button>
  );
}
