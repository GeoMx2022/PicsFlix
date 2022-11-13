import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io"; // eslint-disable-line

import logo from "../assets/picsFlix_logo_transparent.png";

export default function Sidebar({ user, closeToggle }) {
  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
  const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const categories = [
    { name: "Animals" },
    { name: "Wallpapers" },
    { name: "Photography" },
    { name: "Gaming" },
    { name: "Coding" },
  ];

  return (
    <div className="m-w-210 hide-scrollbar flex h-full flex-col justify-between overflow-y-scroll bg-white">
      <div className="flex flex-col">
        <Link
          to="/"
          className="my-6 flex w-190 items-center gap-2 px-5 pt-1"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            OnClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              OnClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="my-5 mx-3 mb-3 flex items-center gap-2 rounded-lg bg-white p-2 shadow-lg"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10, founded-full h-10"
            alt="user-profile"
          />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
}
