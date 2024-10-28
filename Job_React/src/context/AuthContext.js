import React, { createContext, useState } from "react";


export const AuthContext = createContext();
const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);


    const login = (role) => {
        setIsLoggedIn(true)
        setRole(role);
    }

    const logout = () => {
        setIsLoggedIn(false)
        setRole(null);
    }


    return (
        <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    )



}

export default AuthProvider;