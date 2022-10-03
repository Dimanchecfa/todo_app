
import React from "react";
import authContext from "../context/auth.context";

const useAuth = () => {
    return React.useContext(authContext);
}
 
export default useAuth;