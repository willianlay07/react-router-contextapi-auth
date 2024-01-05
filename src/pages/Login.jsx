import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("willianlay07@gmail.com");
  const [password, setPassword] = useState("12qwaszx@");

  const { handleLogIn, isAuth } = useAuth();

  function handleForm(e) {
    e.preventDefault();

    handleLogIn(email, password);
    navigate("/auth/profile", {
      replace: true,
    });
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/auth/profile", {
        replace: true,
      });
    }
  }, [isAuth, navigate]);

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleForm}>
        <p>Email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
