import Navbar from "./components/Navbar";
import Shop from "./components/Shop";
import Men from "./components/Men";
import Women from "./components/Women";
import Kid from "./components/Kids";
import Footer from "./components/Footer";
import Singel_item from "./components/Singel_item";
import { BrowserRouter, Route, Routes, exact } from "react-router-dom";
import Cart from "./components/Cart";

import Loadding from "./components/loadding";
import Update_cart_item from "./components/Update_cart_item";
import Register from "./components/Register";
import User from "./components/User";
import { Context } from "./components/Context";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Orders from "./components/Orders";
import Track from "./components/Track";
import Admin from "./components/Admin";

function App() {

  const [cart_count, setCart_Count] = useState(0)
  const [cancel_item, setCancel_Item] = useState({})
  const [logged_user, setLogged_User] = useState(null)

  //  useEffect(() => {
  //    axios.get(  "http://localhost:5000/get_user",
  //                         {
  //                           headers: {
  //                                   mern_token: localStorage.getItem('mern_token')
  //                               }
  //                          }).then((response) => {
                             
  //                                 setuser(response.data); console.log(response.data);
                                 
  //                    }).catch((err) => console.log(err))
     
  //  },[])
useEffect(  () => {
    axios.get(
      `${process.env.REACT_APP_API_URL}/cart_length`,
      {
        headers: {
                mern_token: localStorage.getItem('mern_token')
            }
      }).then((response) => {
       setCart_Count(response.data)
       
        
      }).catch((err) => console.log(err))
    
}, [])

  
  
 
  
  
  return (
   
    <>
      <Context.Provider value={{ cart_count, setCart_Count, cancel_item, setCancel_Item,logged_user,setLogged_User }}>
        
 

          <div className="w-full h-full">
          <Routes>
            <Route exact path="/" element={<Shop  />}></Route>
            <Route exact path="/men" element={<Men  />}></Route>
            <Route exact path="/women" element={<Women  />}></Route>
            <Route exact path="/kids" element={<Kid  />}></Route>
            <Route exact path="/cart" element={<Cart  />}></Route>
            <Route exact path="/single-item" element={<Singel_item  />}></Route>
      
            <Route exact path="/register" element={<Register  />}></Route>
            <Route exact path="/profile" element={<User  />}></Route>
            <Route exact path="/track" element={<Track  />}></Route>
            <Route exact path="/admin" element={<Admin />}></Route>
       
            
          </Routes>
        </div>
       

        {/* <Footer /> */}
      </Context.Provider>
    </>

  );
}

export default App;
