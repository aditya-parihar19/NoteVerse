export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-t-[#023047] border-b-[#023047] border-l-[#023047] border-r-white rounded-full animate-spin mb-6"></div>
      
      <h1 className="text-4xl md:text-3xl font-bold tracking-wider text-[#023047] drop-shadow-md animate-pulse">
        Loading...
      </h1>
    </div>
  );
}
