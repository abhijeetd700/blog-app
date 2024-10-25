import { Link, useLocation, useNavigate } from "react-router-dom";
import Delete from "../assets/delete.png"
import Edit from "../assets/edit.png"
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { AuthContext } from "../authContext";
import moment from 'moment';
import Menu from "../components/Menu";

function Single() {
    
    const [post,setPost] = useState([])
    const [user,setUser] = useState()
    const [cat,setCat] = useState("")

    const navigate = useNavigate()

    const {currUser} = useContext(AuthContext)

    const postId =  useLocation().pathname.split("/")[2]
    // console.log(postId)

    useEffect(()=>{

        const fetchPost = async()=>{

            if(!currUser){
                navigate("/login")
            }

            const response = await axiosInstance.get(`/post/${postId}`)
            // console.log(response.data)
            setPost(response.data.post)
            setCat(response.data.post.category)
            setUser({...response.data.user})
        }
        fetchPost()
    },[postId])

    const handleDelete = async()=>{

        try{
            const token = localStorage.getItem("token")
            const response = await axiosInstance.delete(`/post/${postId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status === 200){
                alert("Post deleted successfully")
                navigate("/")
            }
        }
        catch(error){
            console.log(error)
            alert(error.response.data.message)
        }
    }
    // console.log(user)
    // const posts = [
    //     {
    //       id: 1,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 2,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 3,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //       id: 4,
    //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //       img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //   ];
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    return ( 
    <div className="single">
        <div className="content">
            <div className="img">
                <img src={`/upload/${post?.img_url}`} />
            </div>
            <div className="user">
                <img src={`/upload/default_user_image.png`} />
               <div className="info">
                    <span>{user?.username}</span>
                    <p>Posted {moment(post?.createdAt).fromNow()}</p>
               </div>
               {
                currUser?.id === user?.id ?
                <div className="icons">
                        <Link to={`/write?edit=${post.id}`} state={post}>
                            <img src={Edit} />
                        </Link>
                        <img src={Delete} onClick={handleDelete}/>
                </div>:
                <div></div>
               }
            </div>
            <div className="post">
                <h1>{post.title}</h1>
                <p>{getText(post.content)}</p>
            </div>
        </div>
        <Menu category={`${cat}`}/>   
    </div> 
    );
}

export default Single;