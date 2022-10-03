import React from 'react'
import { createContext, useState } from 'react'
import { auth } from '../firebase/firebase.config';


const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [isAuth , setIsAuth] = React.useState(false);
    const [user , setUser] = React.useState(null);

    onAuthStateChanged(auth , (currentUser) => {
        setUser(currentUser);
        setIsAuth(true);
    
})
    const value = {
        isAuth,
        setIsAuth,
        user,
        setUser,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default {AuthContext , AuthProvider}
