import React, { useEffect, useState } from 'react'
import greentick from './Assets/greentick.png'
import graytick from './Assets/graytick.png'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'
import { Context } from './Context'
import { useContext } from 'react'

const Track = () => {
    const location = useLocation()
    const [item,setItem]=useState(null)
   
  console.log(item);
     const navigate = useNavigate();
    const { logged_user, setLogged_User } = useContext(Context)
    useEffect(() => {
       axios.get(  `${process.env.REACT_APP_API_URL}/get_user`,
                          {
                            headers: {
                                    mern_token: localStorage.getItem('mern_token')
                                }
                           }).then((response) => {
                               setLogged_User(response.data)  
                               if (response.data.isAdmin===true) {
                                 navigate('/admin')
                             }
                           
                     }).catch((err) => console.log(err)) 
    }, [])
    useEffect(() => {
        if (!location.state) {
                                 navigate('/profile')
                              }
                              else {
                                  setItem(location.state.item)
                              }
       
    },[])
    
    // const [tracked_item,setTracked_Item]=useState({})

    
  return (
    <div>
             <Navbar />
          <div className='w-fit m-auto mt-10 p-5'>
              
         
       
                       
                        
              {item && <div className='flex text-gray-800'>
                  <img className='w-[80px] mr-5' src={item.image} />
                  <div className={`${item.isCancelled === true ? 'bg-gray-50 text-gray-400' : ''}`}>
                      <p>{item.name}</p>
                      <span>Size: {item.size}</span> <br />   <span>Qty:{item.quantity}</span>  <br />   <span>Price: ${item.new_price * item.quantity}</span>
                  </div>
              </div>}
         </div>
        <div className='w-fit m-auto flex p-5 mt-10 mb-10'>
            
          
  <div className='flex flex-col w-fit   items-center w-fit  h-[90vh] relative'>
    <img className='w-[30px]' src={greentick} alt="" />
    <hr className='w-[3px] h-[30%] border-2 border-[#3bea3b]' />
    <img className='w-[30px]' src={graytick} alt="" />
    <hr className='w-[3px] border-2 h-[30%]' />
    <img className='w-[30px]' src={graytick} alt="" />
    <hr className='w-[3px] border-2 h-[30%]' />
    <img className='w-[30px]' src={graytick} alt="" />
  </div>

  
  <div className='flex flex-col w-fit  justify-between items-start ml-4 h-[90vh] text-sm'>
                  <p className='h-[30px] flex items-center'>Ordered on  {item!==null?new Date(item.createdAt).toISOString().slice(0, 10):''}</p>
    <p className='h-[30px] flex items-center'>Shipped On</p>
    <p className='h-[30px] flex items-center'>Expected Delivery on</p>
    <p className='h-[30px] flex items-center'>Out for delivery</p>
  </div>
</div>

    </div>
  )
}

export default Track
