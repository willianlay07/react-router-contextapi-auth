import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const AppLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default AppLayout;
