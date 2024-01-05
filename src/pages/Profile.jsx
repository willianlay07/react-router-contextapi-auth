import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuth, user, handleLogOut } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [isAuth, navigate]);

  function handleClick() {
    handleLogOut();
    navigate("/");
  }

  return isAuth ? (
    <>
      <div>
        <img src={`${user.avatar}`} alt={user.name} />
      </div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>
        <button onClick={handleClick}>Log Out</button>
      </div>
    </>
  ) : null;
};

export default Profile;
