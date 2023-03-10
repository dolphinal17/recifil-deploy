// WithPrivateRoute.js

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";

const WithPrivateRoute = ({ children }) => {
  const { currentuser } = useAuth();

    // If there is a current user it will render the passed down component
  if (!currentuser) {
    return <Navigate to="/login" />;
  }

  return children;
  
};

export default WithPrivateRoute;