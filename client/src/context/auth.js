import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [ auth, setAuth ] = useState({
        user: null,
        token: "",
    })
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