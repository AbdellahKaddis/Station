import { createContext, useContext, useState } from "react";
import userApi from "../services/api/user/userApi";

export const userStateContext = createContext({
    user:{},
    setUser:()=>{},
    isAuthenticated:false,
    setIsAuthenticated:()=>{},
    login:()=>{},
    logout:()=>{},
    setToken:()=>{}
});
export const useUserContext = () => useContext(userStateContext);
const UserContext = ({children})=> {
    const [user,setUser] = useState({});
    const [isAuthenticated,_setIsAuthenticated] = useState('true' ===window.localStorage.getItem('AUTHENTICATED'));
    const login = async(credentials)=>{
        return await userApi.login(credentials);
}
const logout = ()=> {
    setUser({});
    setIsAuthenticated(false);
}
const setIsAuthenticated = (authenticated) => {
    _setIsAuthenticated(authenticated);
    window.localStorage.setItem('AUTHENTICATED',authenticated);
}
const setToken = (token) => {
    window.localStorage.setItem('token',token);
}
    return <userStateContext.Provider value={{user,isAuthenticated,setIsAuthenticated,setUser,login,logout,setToken}}>
        {children}
    </userStateContext.Provider>

}
export default UserContext;
