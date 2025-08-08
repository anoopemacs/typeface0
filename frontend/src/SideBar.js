import { NavLink } from "react-router";

function SideBar() {
  return (
    <nav className="w-2/12 flex flex-col gap-y-2 px-2 py-16 bg-blue-700 text-gray-200">
      <NavLink to="/" end className="hover:bg-blue-800 hover:text-white block">
        My Files
      </NavLink>
      <NavLink to="/upload" end className="hover:bg-blue-800 hover:text-white block">
        Upload
      </NavLink>
    </nav>
  );
}

export default SideBar;
