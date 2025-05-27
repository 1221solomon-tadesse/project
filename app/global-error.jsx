'use client'

export default function GlobalError({
  error,
  reset,
}) {
  return (
    <html>
      <body>
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
          <button
            onClick={() => reset()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}