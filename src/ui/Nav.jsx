import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Nav = () => {
  const { isAuth } = useAuth();

  return (
    <>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          listStyleType: "none",
          paddingLeft: "0px",
        }}
      >
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
        {isAuth ? (
          <li>
            <NavLink to="/auth/profile">Profile</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
        )}
      </ul>
    </>
  );
};

export default Nav;
