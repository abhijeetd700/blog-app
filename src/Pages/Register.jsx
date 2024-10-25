import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
// import axios from "axios";

function Register() {

    const [inputs,setInputs] = useState({
        username:"",
        email:"",
        password:""
    })

    const [error,setError] = useState(null)
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
           
            await axiosInstance.post("/auth/register",inputs)
            navigate("/login")
        //    console.log(res)
        }
        catch(err){
            console.log(err.response)
            setError(err.response.data.message)
        }
    }
    // console.log(inputs)

    return (  
        <div className="auth">
        <h1>Register</h1>
        <form>
            <input required type="text" name="username" id="username" placeholder="username" onChange={handleChange}/>
            <input required type="email" name="email" id="email" placeholder="email" onChange={handleChange}/>
            <input required type="password" name="password" id="password" placeholder="password" onChange={handleChange}/>
            <button type="submit" onClick={handleSubmit}>Register</button>
            {error!==null ? <p>{error}</p> :''}
            <span>Do you have an account? <Link to={"/login"}>Login</Link></span>
        </form>
    </div>
    );
}

export default Register;