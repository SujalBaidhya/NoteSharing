import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/user", {
            withCredentials: true,
            withXSRFToken: true
        })
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);