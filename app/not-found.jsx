"use client";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold text-white tracking-tight">
          404
        </h1>

        <p className="mt-4 text-neutral-400 text-lg">
          This page doesn’t exist or was moved elsewhere.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black
                       hover:bg-neutral-200 transition"
          >
            Go Home
          </button>

          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-neutral-700 px-6 py-3 text-sm font-medium
                       text-neutral-300 hover:bg-neutral-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
