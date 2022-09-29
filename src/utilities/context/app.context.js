import { createContext, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [isSplash, setIsSplash] = useState(false);
  const [user, setUser] = useState(null);

  const register = (user) => {
    try {
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            displayName: user.nom,
          });
          setUser(userAuth.user);
          console.log(userAuth);
        });
      console.log("ok");
    } catch (error) {
      console.log(error);
    }
  };

  const onAuthStateChanged =
    (auth,
    (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
      } else {
        setUser(null);
      }
    });

  const value = {
    isSplash,
    setIsSplash,
    user,
    setUser,
    register,

    onAuthStateChanged,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
