import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/logo.jpeg'
import { useContext } from "react";
import { AuthContext } from "../authContext.jsx";

function Navbar() {

    const{currUser,logout} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async(e)=>{
       await logout()
       navigate('/login')
    }

    // console.log(currUser)
    return ( 
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} />
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=ART">
                        <h6>ART</h6>
                    </Link>
                    <Link className="link" to="/?cat=SCIENCE">
                        <h6>SCIENCE</h6>
                    </Link>
                    <Link className="link" to="/?cat=SPORTS">
                        <h6>SPORTS</h6>
                    </Link>
                    <Link className="link" to="/?cat=TECHNOLOGY">
                        <h6>TECHNOLOGY</h6>
                    </Link>
                    <Link className="link" to="/?cat=GLOBAL">
                        <h6>GLOBAL</h6>
                    </Link>
                    <Link className="link" to="/?cat=FINTECH">
                        <h6>FINTECH</h6>
                    </Link>
                    <span>{currUser?.username}</span>
                    <span onClick={handleLogout}>Logout</span>
                    <span className="write">
                        <Link className="link" to={"/write"}>Write</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;