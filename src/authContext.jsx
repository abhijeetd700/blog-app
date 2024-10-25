import React from "react";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "./axiosConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{

    const [currUser,setCurrUser] = useState(JSON.parse(localStorage.getItem("user"))||null)
    
    const login = async (inputs)=>{
       const res = await axiosInstance.post("/auth/login",inputs)
       const {data,...other} = res
    //    console.log(data)
       localStorage.setItem("token",data['token']) 
       setCurrUser(data['userData'])
    }

    const logout = ()=>{
        // await axiosInstance.post("/auth/logout")
        localStorage.removeItem("token")
        setCurrUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currUser))
    },[currUser])
    
    return(
       <AuthContext.Provider value={{currUser,login,logout}}>
            {children}
       </AuthContext.Provider>
    )
}