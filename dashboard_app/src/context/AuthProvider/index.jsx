import React, { useState, useEffect, useContext, createContext } from "react";
import { loginUser } from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import jwt_decode from "jwt-decode";

// Creamos el contexto
const AuthContext = createContext();

// Creamos un hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente proveedor de autenticacion
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
  });

  //Esto nos permite navegar a comando
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("_token");

  useEffect(() => {
    if (storedToken) {
      const decodedToken = storedToken ? jwt_decode(storedToken) : null;
      const { user } = decodedToken ? decodedToken.payload : null;
      setCurrentUser(user);
      return navigate("/");
    }
  }, []);

  const login = (data) => {
    loginUser(data)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.json());
        }
      })
      .then(({ token }) => {
        localStorage.setItem("_token", token);
        const decodedToken = token ? jwt_decode(token) : null;
        const { user } = decodedToken ? decodedToken.payload : null;
        setCurrentUser(user);

        return navigate("/");
      })
      .catch((error) => {});
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("_token");
    return navigate("/signin");
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {alert.show && <Alert alert={alert} setAlert={setAlert} />}
      {children}
    </AuthContext.Provider>
  );
};
