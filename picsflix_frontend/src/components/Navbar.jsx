import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

export default function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="mt-7 flex w-full gap-2 pb-7 md:gap-5">
      <div className="flex w-full items-center justify-start rounded-md border-none bg-white px-2 outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="w-full bg-white p-2 outline-none"
        />
      </div>
    </div>
  );
}
