"use client";
function Error({ error, reset }) {
  const message = error?.message ? error?.message : error;
  return (
    <div
      className="flex flex-col h-1/2 w-full items-center left-0 top-[18%]
     absolute capitalize space-y-4 backdrop-blur-md"
    >
      <h2 className="mt-24 text-2xl text-center w-1/2">{message}</h2>
      <button onClick={reset} className="bg-[#FF9900] px-2 py-1 text-base">
        try again
      </button>
    </div>
  );
}

export default Error;
