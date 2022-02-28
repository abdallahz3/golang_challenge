import { Link } from "react-router-dom";

export default function () {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex space-x-3">
        <Link
          to="/data"
          className="px-5 py-2 bg-white text-black rounded hover:bg-black hover:text-white transition"
        >
          Data
        </Link>
        <Link
          to="/history"
          className="px-5 py-2 bg-white text-black rounded hover:bg-black hover:text-white transition"
        >
          History
        </Link>
      </div>
    </div>
  );
}
