import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Wai",
  email: "willianlay07@gmail.com",
  password: "12qwaszx@",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuth: false,
      };

    default:
      throw new Error("Something wrong");
  }
}

const initialState = {
  isAuth: false,
  user: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isAuth, user } = state;

  function handleLogIn(email, pass) {
    if (FAKE_USER.email === email && FAKE_USER.password === pass) {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
    }
  }

  function handleLogOut() {
    dispatch({
      type: "logout",
    });
  }

  return (
    <AuthContext.Provider value={{ isAuth, user, handleLogIn, handleLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext is outside of AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
