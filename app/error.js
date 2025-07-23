"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="max-w-3xl w-full rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-xl font-semibold text-red-600 text-center">Server Sedang Sibuk</h1>
        <p className="mt-2 text-gray-700 text-center">
          Cobalah beberapa saat lagi.
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
