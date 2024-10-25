import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Write from './Pages/Write.jsx';
import Single from './Pages/Single.jsx';
import Register from './Pages/Register.jsx';
import './style.scss'

const Layout = ()=>{
  return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
const router = createBrowserRouter([
{
  path: "/",
  element: <Layout/>,
  children:[
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/write",
      element:<Write/>
    },
    {
      path:"/post/:id",
      element:<Single/>
    },

  ]
},
{
  path:"/login",
  element:<Login/>
},
{
  path:"/register",
  element:<Register/>
}
]);

function App() {
  

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
