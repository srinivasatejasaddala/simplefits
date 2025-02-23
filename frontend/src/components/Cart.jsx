import React, { useContext, useEffect, useState } from 'react'
import cross from './Assets/cart_cross_icon.png'
import axios from 'axios';
import Loadding from './loadding';
import { Context } from './Context';
import { Link, useNavigate } from 'react-router-dom';
import down_arrow from './Assets/down-arrow.png'
import empty_cart from './Assets/empty-cart.png'
import cross_icon from './Assets/e-comm-cross.png'
import order_confirm_icon from './Assets/check.png'
import empty_cart2 from './Assets/empty_cart.jpg'

import Navbar from './Navbar';

const Cart = () => {
  const navigate = useNavigate();
  const [cart_items, setCart_items] = useState([]);
  const [notcart_empty, setNotCart_Empty] = useState(false)
  const { cart_count, setCart_Count } = useContext(Context)
  const [quantity_change, setQuantity_Change] = useState('hidden')
  const [product_quantity, setProduct_Quantity] = useState(1)
  const [showcart, setShowCart] = useState('block')
  const [showConfirm, setShowConfirm] = useState('hidden')
  const [product_id, setProduct_id] = useState()
  const Quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 
  const { logged_user, setLogged_User } = useContext(Context)
  useEffect(() => {
    if (!(localStorage.getItem('mern_token'))) {
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
    console.log(logged_user);

      
    
      axios.get(
        `${process.env.REACT_APP_API_URL}/get_cart`,
        {
          headers: {
            mern_token: localStorage.getItem('mern_token')
          }
        }).then((response) => {
          setCart_items(response.data)
          response.data.length > 0 ? setNotCart_Empty(true) : setNotCart_Empty(false)
        }
        ).catch((err) => console.log(err))
    }
  , [])
  
  const handleRemove = async (id, size) => {
    
    setCart_items(cart_items.filter((item) => item._id !== id))
    
    
    await axios.post(`${process.env.REACT_APP_API_URL}/remove_cart_item`, { id: id, size: size },
      {
        headers: {
          mern_token: localStorage.getItem('mern_token')
        }
      }
    ).then(res => setCart_Count(cart_count - 1)).catch(err => console.log(err))
    //  navigate('/cart')
    
  }


  
  const handleUpdateQuantity = () => {
    console.log(product_id);
    console.log(cart_items);
      
    const Udated_array = cart_items.map((item) => item._id === product_id ? ({ ...item, quantity: product_quantity }) : item)
    setCart_items(Udated_array);
    axios.post(`${process.env.REACT_APP_API_URL}/quantity`, { id: product_id, quantity: product_quantity }).then().catch(err => console.log(err));
    // setProduct_Quantity(1);
    setQuantity_Change('hidden')
    
  }


  const handleTotal = () => {
    let sum = 0;
    for (let i = 0; i < cart_items.length; i++) {
      
      sum = sum + cart_items[i].new_price * cart_items[i].quantity;
    }
    return sum
  }

  const handleQuantityShow = (x, id) => {
    setProduct_Quantity(x)
    console.log(id);
    setProduct_id(id)
    setQuantity_Change('visible')
  }

  const handlePlaceOrder = () => {
    console.log(cart_items);
    
    axios.post(`${process.env.REACT_APP_API_URL}/place_order`, { "cart_items": cart_items }, {
      headers: {
        mern_token: localStorage.getItem('mern_token')
      }
    }).then().catch(err => console.log(err))
    setCart_items([])
    setShowCart('hidden');
    setShowConfirm('block')
    setCart_Count(0)
  }
  

  if (logged_user !== null && logged_user.isAdmin === false) {

    return (<>
      <Navbar />
      <div className={`${showcart} m-auto  h-full`} >
        <div className='  lg:overflow-y-auto  xl:overflow-y-auto  lg:w-[85%] m-auto'>
          {cart_items.length === 0 ?
            <div className='flex justify-center  h-[80vh] items-center'>
              <div className='text-center'>
                <img className='w-[350px] ' src={empty_cart2} />
                <p className='text-2xl text-gray-700'>Bag Look's Empty</p>
                <p className='text-gray-400'> Lets add some items</p>
              </div>
            
            </div>
            : cart_items.map((x) =>
              <>
              

                <div id='change_quantity' className={`${quantity_change} inset-0 fixed  bg-black bg-opacity-20 flex items-center justify-center`} >
                  <div className='bg-white w-[350px] h-[290px]  ' >
                 
                    <div className=' h-[50px] m-auto flex justify-end items-center pr-[10px] '  >
                      <img className='w-[30px] h-[30px]' src={cross_icon} onClick={() => { setQuantity_Change('hidden') }} />
                    </div>
                    <div className='w-[85%] m-auto mb-5'>
                      <p>Select Quantity</p>
                    </div>
                    <div className='w-[85%] m-auto grid grid-cols-5 gap-y-[10px] mb-5'>
                      {Quantity.map(i => <button id={'b' + i} className={`w-[50px] h-[50px]  rounded-[50%]      ${(product_quantity === i) ? 'text-yellow-600 border-yellow-600 border-[1px]' : ' border-black border-[1px]'} `} onClick={() => { setProduct_Quantity(i) }}>{i}</button>)}
                    </div>
                    <div className='w-[85%] m-auto'>
                      <button className='w-[100%] h-[45px] bg-yellow-600' onClick={handleUpdateQuantity}>Done</button>
                    </div>
                  
                  </div>
                </div>

              

                <div className='border-[1px] border-gray-500 h-auto w-[90%] mb-5  mt-5  pt-5    sm:pb-5 md:pb-5 lg:pb-5 rounded-lg sm:w-[90%]  md:w-[80%] lg:w-[90%]    m-auto '>
                  <div className='flex justify-end pb-2'>
                    <img className='w-[10px] h-[10px] mr-5 ' onClick={() => handleRemove(x._id, x.size)} src={cross} />
                  </div>
            
                  <div className=' w-[90%]       rounded-lg sm:w-[98%]  md:w-[80%] lg:w-[90%]   md:flex   lg:flex sm:flex sm:justify-start md:justify-start lg:justify-start m-auto '>
                    <div className='w-[90%] m-auto  sm:w-fit md:w-fit lg:w-fit sm:m-0 sm:mr-4 md:mr-4 lg:mr-4 '>
                      <img className=' rounded-md w-[300px] sm:w-[180px] md:w-[180px] lg:w-[180px] m-auto' src={x.image} />
                    </div>
                    <div className='w-[90%] m-auto  mt-2 mb-3  sm:w-fit md:w-fit lg:w-fit sm:m-0 sm:mt-0 lg:mt-0 md:mt-0 sm:mb-0 lg:mb-0 md:mb-0  '>
                      <p className=''>{x.name}</p>
                      <p className='mt-2'>Category:{x.category}</p>
                      <span className='mt-2 block  bg-gray-100 w-fit'>Quantity: {x.quantity} <img className='w-[10px] inline' src={down_arrow} onClick={() => handleQuantityShow(x.quantity, x._id)} /></span>
                      {/* <button className='text-2xl ml-2 mt-2' onClick={() => handleQuantity_dicrease(x._id, x.quantity)}>-</button> */}
                      {/* <span className=' mt-2 border-[1px] border-gray-500 w-[30px] h-[30px]  text-gray-700 text-center content-center rounded-lg m-auto ml-4 inline-block'>{x.quantity}</span> */}
                      {/* <button className='ml-4 mt-2' onClick={() => handleQuantity_increase(x._id, x.quantity)}>+</button> */}
                      <p className='text-sm mt-2'>Size: {x.size} </p>
                      <p className='mt-2'>${x.new_price}  <span className='text-sm ml-3 text-gray-400'> <del>${x.old_price} </del></span></p>
                      <p className='mt-2 text-orange-500'><i> {40}% off </i></p>
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>
    
        {cart_items.length > 0 && <div className=' pt-5 pb-5  m-auto rounded-lg mt-10 lg:w-[90%]'>
          <div className='w-[90%] m-auto text-gray-700'>
            <p className='mb-5'> If you have a promo code, Enter it here</p>
            <input className='h-[50px] w-[70%] bg-gray-100 pl-5 text-gray-600 focus:border-none ' placeholder='promo code ' type="text" />
            <button className='h-[50px] w-[30%] bg-black text-white'>Submit</button>
          </div>
          <div className='w-[90%] m-auto mt-10'>
            <h1 className='text-2xl font-semibold mb-11'>Cart Totals</h1>
            <div className='border-b-2 flex h-[50px]  items-center justify-between'>
              <span>subtotal</span>
              <span>${handleTotal()}</span>
            </div>
            <div className='border-b-2 flex h-[50px]  items-center justify-between'>
              <span>Shipping Fee</span>
              <span>Free</span>
            </div>
            <div className='font-semibold flex h-[50px]  items-center justify-between' >
              <span>Total</span>
              <span>${handleTotal()}</span>
            </div>
            <button className='h-[40px] bg-[#ff0000] text-white w-[170px] mt-2' onClick={handlePlaceOrder}>PLACE ORDER</button>
          </div>
        </div>}
      

     
      </div>
      <div id='order_confirm' className={` ${showConfirm} fixed flex justify-center items-center bg-gray-100 w-[100%] h-[100vh] shadow-xl`}>
        <div className='bg-white w-[80%] sm:w-[500px] h-[350px] '>
          <div className='w-[80%] m-auto mt-10'>
            <img className='w-[100px] m-auto' src={order_confirm_icon} />
            <p className='m-auto w-fit text-3xl text-[#1FC71F] font-bold mt-5'> Order Confirmed</p>
          </div>
          
          <div className='flex justify-between w-[90%] sm:w-[80%] m-auto mt-10'>
            <button className='w-[47%] pt-[4px] pb-[4px] sm:w-[40%] border-[1px] border-gray-700 sm:h-[45px] hover:bg-[#ff0000] hover:text-white hover:border-none' onClick={() => {
              navigate('/'); setShowCart('block');
              setShowConfirm('hidden')
            }}>Continue Shoping</button>
            <button className='w-[47%] pt-[4px] pb-[4px] sm:w-[40%] border-[1px] border-gray-700 sm:h-[45px] hover:bg-[#ff0000] hover:text-white hover:border-none' onClick={() => { navigate('/profile') }}>Orders</button>
          </div>
        
        </div>
      </div>
    </>
    )
  }
}
export default Cart
