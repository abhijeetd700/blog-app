import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import { AuthContext } from "../authContext";

function Home() {

  const [posts,setPosts] = useState([])
  const [err,setError] = useState()

  const cat = useLocation().search;
  const {currUser} = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(()=>{

    const fetchData = async()=>{
      
      try{
        if(!currUser){
          navigate("/login")
        }
        const response = await axiosInstance.get(`/post/${cat}`)
        // console.log(response.data)
        // console.log(response.data.posts)
        setPosts(response.data.posts)
      }
      catch(err){
        console.log(err)
        setError(err.response.data.message)
      }
    }
    setError()
    fetchData()

  },[cat])
  //   const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];
    const getText = (html) =>{
      const doc = new DOMParser().parseFromString(html, "text/html")
      return doc.body.textContent
    }

    return ( 
    <div className="home">
        <div className="posts">
            {err ? <h1 className="postError">{err}</h1>
            :posts.map((post)=>{
                return(
                <div className="post" key={post.id}>
                    <div className="img">
                        <img src={`/upload/${post.img_url}`} />
                    </div>
                    <div className="content">
                        <Link className="link" to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                        </Link>
                        <p>{getText(post.content)}</p>
                        <Link to={`/post/${post.id}`}>
                          <button>Read More</button>
                        </Link>
                    </div>
                </div>
                )
            })}

        </div>
    </div> 
    // <>Home</>
);
}

export default Home;