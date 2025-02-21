"use client";
function error({ error, reset }) {
  return (
    <div className="py-12 flex flex-col h-full w-full items-center left-0 absolute capitalize space-y-4">
      <h2 className="text-2xl text-center w-1/2">{error.message}</h2>
      <button onClick={reset} className="bg-[#FF9900] px-2 py-1 text-base">
        try again
      </button>
    </div>
  );
}

export default error;
