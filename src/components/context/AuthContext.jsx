import {createContext, useState} from "react";

export const AuthContext = createContext({
    isAuthenticated: true,
    user: {
        username: '',
        name: '',
        role: ''
    }
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        isAuthenticated: true,
        username:"",
        name: "",
        role: ''
    });
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}