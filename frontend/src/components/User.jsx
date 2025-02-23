import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import edit_icon from './Assets/draw.png'
import Orders from './Orders';
import _ from 'lodash'
import Navbar from './Navbar';
import { Context } from './Context';





const User = () => {
   
    const [user_data, setUserData] = useState({});
    const [showProfile, setShowProfile] = useState(false);
    const [showOrders, setShowOrders] = useState(true)
    const [menuType, setMenuType] = useState('Orders')
   
   
    const navigate = useNavigate();
    const { logged_user, setLogged_User } = useContext(Context)
    useEffect(() => {
       if (!(localStorage.getItem('mern_token')))  {
            navigate('/register')
        }
    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/get_user`,
            {
                headers: {
                    mern_token: localStorage.getItem('mern_token')
                }
            }).then((response) => {
                setLogged_User(response.data)
                if (response.data.isAdmin === true) {
                    navigate('/admin')
                }
            }).catch((err) => console.log(err))
    }, [])


    

    useEffect(() => {
     
            axios.get(`${process.env.REACT_APP_API_URL}/user_details`, {
                headers: {
                    mern_token: localStorage.getItem('mern_token')
                }
            }).then(res => {
                setUserData(res.data);
            }).catch(err => console.log(err))
 
    }, [])

    // if (logged_user !== null && logged_user.isAdmin === false) {
    

        return (
            <>
                <Navbar />
                <div className=' sm:h-[100vh] sm:flex '>
                    <div className=' w-[100%] md:block sm:w-[35%] md:w-[35%] lg:w-[30%] shadow-lg   sm:shadow-2xl'>
                        <a className={`w-[50%] inline-block  sm:w-[100%] sm:block h-[50px]   pl-10 content-center hover:cursor-pointer ${menuType === "Orders" ? 'bg-yellow-500 text-white text-lg' : ''}`} onClick={() => { setShowProfile(false); setShowOrders(true); setMenuType('Orders') }}>Orders</a>
                        <a className={` w-[50%] inline-block sm:w-[100%] sm:block  h-[50px]   pl-10 content-center hover:cursor-pointer ${menuType === "User Info" ? 'bg-yellow-500 text-white text-lg' : ''}`} onClick={() => { setShowProfile(true); setShowOrders(false); setMenuType('User Info') }}>User Info</a>
                   
                    </div>
                
                    <div className='w-full  sm:h-[100vh] overflow-auto '>
                        {showOrders && <Orders />}
                        {showProfile && <div className='w-[95%] md:w-[85%]  m-auto shadow-lg mb-5 pl-10 mt-10 text-gray-700 pb-5'>
                            <div className='flex justify-end mt-4 pt-4'>
                                <img className='w-[15px] h-[15px] relative right-3 mr-4' src={edit_icon} />
                            </div >
                    
                            <p>Welcome {user_data.username}</p>
                            <p>{user_data.email}</p>
                            <p>{user_data.mobile}</p>
                            <p>{user_data.pincode}</p>
                            <p>{user_data.street}</p>

                            <p>{user_data.city}</p>
                        </div>}
         
           
                    </div>
       
                </div>
            
            </>
        )
    }
// }
export default User


// bg-[#f3f3f3]
// bg-[#ff0000]


    // <form className='w-[80%] m-auto'>
    //                 {user_data && <>
    //                   <div className='mb-4'>
    //               {/* <label className="block text-gray-800 font-medium mb-1">Email</label> */}
    //               <input  className='w-full px-3 py-2 border-[1px]  rounded-md focus:ring focus:ring-blue-300 focus:outline-none' name='email' type="text" value={user_data.email} />
    //           </div>
    //           <div className='mb-4'>
    //               {/* <label className="block text-gray-800 font-medium mb-1">Username</label> */}
    //               <input className='w-full px-3 py-2 border-[1px]  rounded-md focus:ring focus:ring-blue-300 focus:outline-none' name='username' type="text" value={user_data.username} />
    //           </div>
    //           <div className='mb-4'>
    //               {/* <label className="block text-gray-800 font-medium mb-1">Mobile</label> */}
    //               <input className='w-full px-3 py-2 border-[1px]  rounded-md focus:ring focus:ring-blue-300 focus:outline-none' name='mobile' type="text" value={'9618658318'} />
    //           </div>
    //           <div className='mb-4'>
    //               {/* <label className="block text-gray-800 font-medium mb-1">Pin Code</label> */}
    //               <input className='w-full px-3 py-2 border-[1px]  rounded-md focus:ring focus:ring-blue-300 focus:outline-none' name='pincode' type="text" value={user_data.pincode} />
    //           </div>
    //           <div className='mb-4'>
    //               {/* <label className="block text-gray-800 font-medium mb-1">City</label> */}
    //               <input className='w-full px-3 py-2 border-[1px]  rounded-md focus:ring focus:ring-blue-300 focus:outline-none' name='city' type="text" value={user_data.city} />
    //           </div>
    //            <div className='mb-4 flex justify-end'>
    //             <button className=" w-[130px] sm:w-[150px] bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none">Save</button>
    //           </div>
    //             </>    }
    //         </form>
