import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => useContext(AuthContext);