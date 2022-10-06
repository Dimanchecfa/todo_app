import React from 'react'
import { createContext, useState } from 'react'
import { auth } from '../firebase/firebase.config';


const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [text , setText] = useState('hello world')
    const value = {
        text,
        setText
    }
   
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default {AuthContext , AuthProvider}
