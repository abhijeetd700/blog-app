import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../axiosConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment'
import { AuthContext } from '../authContext';
function Write() {

    const state = useLocation().state
    const {currUser} = useContext(AuthContext);

    const navigate = useNavigate();
    // console.log(state)
    const [value, setValue] = useState(state?.content||'');
    const [title,setTitle] = useState(state?.title||'');
    const [cat,setCat] = useState(state?.category||'')
    const [imgURL,setImgURL] = useState(state?.img_url||'');
    const [file,setFile] = useState(null)
    const [error, setError] = useState('');
    const [message,setMessage] = useState('')
    const [emptyCatError,setEmptyCatError] = useState('');


    const handleFileChange = async (e)=>{
        // console.log(e.target.files)
        // await setFile(e.target.files[0])
        try{
            if(!e.target.files[0]){
                throw new Error("File cannot be empty")
            }

            const formData = new FormData()
            formData.append('file',e.target.files[0])
    
            const res = await axiosInstance.post("/upload",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Necessary for file upload
                }
            })
            console.log(res)
            if(res.status === 200){
                setImgURL(res.data.file.filename)
                setMessage(res.data.message)
            }
            return;
        }
        catch(e){
            console.log(e)
            setError(e.response.data.error)
        }
        
        
    }


    const handleSubmit = async(e)=>{

        e.preventDefault()

        try{
            // console.log(imgURL+" "+cat)

            if(!currUser){
                throw new Error("Action not authorized.Please Login..!")
            }

            if(!cat){
                setEmptyCatError("Please select atleast one category")
                return;
            }
            state?
                await axiosInstance.put(`/post/${state.id}`,{
                    title : title,
                    content: value,
                    category:cat,
                    img_url:imgURL ? imgURL : ""
                })
                :
                await axiosInstance.post(`/post`,{
                    title : title,
                    content: value,
                    createdAt:moment().toISOString(),
                    category:cat,
                    img_url:imgURL ? imgURL : "",
                    authorId:currUser.id
                })
            alert("Operation successful...!")
            navigate("/")
        }
        catch(err){
            console.log(err)

            if(err.status === 401){
                alert("Action not authorized.Please Login..!")
                navigate("/login")
            }
            else{
                alert("Internal Server Error")
                navigate("/write")
            }
        }

    }
    return (  
    <div className="add">
        <div className="content">
            <input className="title" type="text" name="title" id="title" value={title} placeholder='Title' onChange={(e)=>{setTitle(e.target.value)}}/>
            <div className="editorContainer">
                <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
            </div>
        </div> 
        <div className="menu">
            <div className="item">
                <h2>Publish</h2>
                <span>
                    <b>Status :</b>
                    <span>Draft</span>
                </span>
                <span>
                    <b>Visiblity :</b>
                    <span>Public</span>
                </span>
                <input type="file"  id="file-upload" style={{display:'none'}} onChange={handleFileChange}/>
                <label className="file" htmlFor="file-upload">Upload Image</label>
                <div className="updates">
                    <button className='first' type="button">Save as draft</button>
                    <button className='last' type="button" onClick={handleSubmit}>Publish</button>
                </div>
                <div>
                    {error && <p style={{ fontSize: "small",textAlign: "center",color: "red"}}>{error}</p>}
                    {message && <p style={{ fontSize: "small",textAlign: "center",color: "green"}}>{message}</p>}
                </div>
            </div>
            <div className="item">
                <h2>Category</h2>
                <div className="cat">
                    <input type="radio" value="ART" checked={cat === "ART"} name="" id="art" onChange={(e)=>setCat(e.target.value)} />
                    <label htmlFor="art">Art</label>
                </div>
                <div className="cat">
                    <input type="radio" value="SCIENCE" checked={cat === "SCIENCE"} name="" id="science" onChange={(e)=>setCat(e.target.value)} />
                    <label htmlFor="science">Science</label>
                </div>
                <div className="cat">
                    <input type="radio" value="SPORTS" checked={cat === "SPORTS"} name="" id="sports" onChange={(e)=>setCat(e.target.value)} />
                    <label htmlFor="sports">Sports</label>
                </div>
                <div className="cat">
                    <input type="radio" value="TECHNOLOGY" checked={cat === "TECHNOLOGY"} name="" id="technology" onChange={(e)=>setCat(e.target.value)}/>
                    <label htmlFor="technology">Technology</label>
                </div>
                <div className="cat">
                    <input type="radio" value="GLOBAL" checked={cat === "GLOBAL"} name="" id="global" onChange={(e)=>setCat(e.target.value)}/>
                    <label htmlFor="global">Global</label>
                </div>
                <div className="cat">
                    <input type="radio" value="FINTECH" checked={cat === "FINTECH"} name="" id="fintech" onChange={(e)=>setCat(e.target.value)}/>
                    <label htmlFor="fintech">Fintech</label>
                </div>
                <div>
                    {emptyCatError && <p style={{ fontSize: "small",textAlign: "center",color: "red"}}>{emptyCatError}</p>}
                </div>
            </div>
        </div>     
    </div>
    );
}

export default Write;