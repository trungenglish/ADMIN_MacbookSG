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
        user:{
            username:"",
            name: "",
            role: ''
        },
        appLoading: true,
    });
    const [appLoading, setAppLoading] = useState(true);
    return (
        <AuthContext.Provider value={{user, setUser, appLoading, setAppLoading}}>
            {props.children}
        </AuthContext.Provider>
    )
}