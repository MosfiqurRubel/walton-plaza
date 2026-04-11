import Link from "next/link";

const NotFound = () => {
  return (
    <div className="absolute inset-0 flex-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center">
          <h1 className="text-9xl font-extrabold border-e border-gray-300 text-red-700 drop-shadow-lg pe-4">
            404
          </h1>
          <span className="text-3xl font-bold text-gray-500 uppercase ms-4">
            Not Found
          </span>
        </div>
        <Link
          href="/"
          className="px-6 py-3 bg-sky-900 text-white cursor-pointer rounded-md shadow hover:bg-sky-700 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
