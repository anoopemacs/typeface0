import { NavLink } from "react-router";

function SideBar() {
  return (
    <nav>
      <NavLink to="/" end>
        My Files
      </NavLink>
      &nbsp;
      <NavLink to="/upload" end>
        Upload
      </NavLink>
    </nav>
  );
}

export default SideBar;
