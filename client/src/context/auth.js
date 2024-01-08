import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [ auth, setAuth ] = useState({
        user: null,
        token: "",
    })

    // default axios header
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const dataLS = localStorage.getItem("auth");
        if(dataLS){
            const pData = JSON.parse(dataLS);
            setAuth({
                ...auth,
                user: pData.user,
                token: pData.token,
            })
        }
        // eslint-disable-next-line
    }, [])

    return(
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook created
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }