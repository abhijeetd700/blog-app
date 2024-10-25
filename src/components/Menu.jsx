import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { Link } from "react-router-dom";

function Menu({category}) {

    const [posts,setPosts] = useState([])

    useEffect(()=>{
        const fetchPost = async()=>{
           const response = await axiosInstance.get(`/post/?cat=${category}`)
           setPosts(response.data.posts) 
        }
        fetchPost()
    },[category])

    return ( 
        <div className="menu">
            <h3>Other posts you may like</h3>
            {posts?.map((post) => (
                <div className="post" key={post?.id}>
                    <img src={`/upload/${post?.img_url}`} alt="" />
                    <h2>{post?.title}</h2>
                    <Link to={`/post/${post.id}`}>
                        <button>Read More</button>
                    </Link>
                    
                </div>
            ))}
        </div>
     );
}

export default Menu;