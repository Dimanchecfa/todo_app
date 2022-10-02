import { createContext, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [isSplash, setIsSplash] = useState(false);
  const [user, setUser] = useState(null);

  const [date , setDate] = useState(new Date());


  

  const value = {
    isSplash,
    setIsSplash,
    user,
    setUser,
    date,
    setDate,

  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
