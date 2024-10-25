import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext.jsx";

function Login() {
    const [inputs,setInputs] = useState({
        username:"",
        password:""
    })

    const{login} = useContext(AuthContext)
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
            await login(inputs)
            navigate("/")
        //    console.log(res)
        }
        catch(err){
            console.log(err)
            setError(err.response.data.message)
        }
    }
    return (  
        <div className="auth">
            <h1>Login</h1>
            <form action="" method="post">
                <input required type="text" name="username" id="username" placeholder="username" onChange={handleChange}/>
                <input required type="password" name="password" id="password" placeholder="password" onChange={handleChange}/>
                <button type="submit" onClick={handleSubmit}>Login</button>
                {error!==null?<p>{error}</p>:''}
                <span>Don't have an account? <Link to={"/register"}>Register</Link></span>
            </form>
        </div>
    );
}

export default Login;