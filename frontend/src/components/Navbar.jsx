import React, { use, useContext, useEffect, useState } from 'react'
import logo from './Assets/logo.png'
import cart from './Assets/cart_icon.png'
import bag from './Assets/shopping-bag.png'
import menu from './Assets/black-menu.png'
import close from './Assets/e-comm-cross.png'
import user from './Assets/user.png'
import sign_out from'./Assets/sign-out.png'
import { Context } from './Context'
import simplefits from './Assets/simplefits.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {
  const [islogin, setIsLogin] = useState(false)
  const { cart_count, setCart_Count } = useContext(Context)
  const [are_you_sure, setAre_You_Sure] = useState('hidden')
  const [menu_bar,setmenu_bar]=useState('Shop')
  const navigate=useNavigate()
  useEffect(() => {
      const token=localStorage.getItem('mern_token')
    if ((localStorage.getItem('mern_token')))  {
       setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
  })
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/cart_length`, {
      headers: {
        mern_token: localStorage.getItem('mern_token')
      }
    }).then(res=>setCart_Count(res.data)).catch(err=>console.log(err))
},[])

  const handleLogoutConfirm = () => {
    setAre_You_Sure('block');
  }
 
  
  const handleNo = () => {
    setAre_You_Sure('hidden');
  }

  const handleLogout = () => {
     setAre_You_Sure('hidden');
    localStorage.setItem('mern_token', '');
    navigate('/')
  }
  const handleMenu = () => {
    document.getElementById('verticalnav').classList.remove("hidden");
  }
   const handleCloseMenu = () => {
    document.getElementById('verticalnav').classList.add("hidden");
  }
  const handleLink = () => {
    document.getElementById('verticalnav').classList.add("hidden");
  }
  return (
    <>    <div className='  flex border-b-2 h-[60px] md:justify-between sm:justify-between justify-between'>
          <div className='hidden sm:hidden  md:hidden   lg:w-[30%] lg:flex lg:items-center lg:justify-center'>
              <img className=' w-10 h-10 mr-3 hover:cursor-pointer' src={logo} onClick={()=>{navigate('/')}} ></img>
              <span  className="hover:cursor-pointer h-[60px] content-center pt-2"  onClick={()=>{navigate('/')}}> <img className='w-[100px]' src={simplefits} alt="" />  </span>
         </div>
      <div className='content-center pl-5 lg:hidden'>
         <img className='w-7 h-7' src={menu} onClick={handleMenu}/>
      </div>
      
          <div className='hidden sm:hidden md:hidden lg:w-[50%] xl:w-[40%] lg:flex lg:items-center lg:justify-between pl-32 pr-32 '>
           <Link to='/'>  <a className={`hover:border-b-2 hover:border-[#ff0000]  hover:cursor-pointer ${menu_bar==='Shop'? 'border-[#ff0000]':''}`}  onClick={()=>{setmenu_bar('Shop')}}>Shop</a></Link> 
           <Link to='/men'> <a className={`hover:border-b-2 hover:border-[#ff0000] hover:cursor-pointer ${menu_bar==='Men'?'border-[#ff0000]':''}`}  onClick={()=>{setmenu_bar('Men')}}>Men</a> </Link>
           <Link to='/women'> <a className={`hover:border-b-2 hover:border-[#ff0000] hover:cursor-pointer ${menu_bar==='Women'?'border-[#ff0000]':''}`}  onClick={()=>{setmenu_bar('Women')}}>Women</a> </Link>
           <Link to='/kids'> <a className={`hover:border-b-2 hover:border-[#ff0000] hover:cursor-pointer ${menu_bar==='Kids'?'border-[#ff0000]':''}`}  onClick={()=>{setmenu_bar('Kids')}}>Kids</a> </Link>
      </div>
      
      <div className='w-[65%] md:w-[40%]   lg:w-[30%] flex items-center justify-end'>
       
        
        {islogin ? <button className={` border-[1px] w-[80px] h-[35px] text-sm content-center bg-yellow-500 text-white border-none hover:shadow-lg border-gray-950 rounded-2xl mr-[20px] `} onClick={handleLogoutConfirm}  >  logout</button>
      : <Link to='/register'><button className={` border-[1px] w-[80px] h-[35px] text-sm content-center  bg-yellow-500 text-white border-none hover:shadow-lg border-gray-950 rounded-2xl mr-[20px]`} >Login</button></Link>
        }
        
        
        <div className={`w-fit  ${(!islogin|| cart_count<1)?'mr-[20px]':''}`}>
          <Link to='/cart'><img className='w-7 h-7 inline' src={bag}></img> </Link>
          {cart_count>0? <span className={`text-xs relative top-[-6px] left-[-17px] text-white pb-1 content-center bg-red-600  text-center rounded-3xl w-[19px] h-[17px] inline-block `}>{cart_count}</span>:  <span></span> }
        </div >

        <div className='relative mr-[10px]   h-[60px]  lg:mr-[50px] content-center hover:border-b-2 hover:border-yellow-500' >
          <Link to='/profile'>   <img className={`w-[25px] h-[25px]  mt-[2px] `} src={user} alt="" /></Link>
               
           </div> 
      
          </div>
    
    </div>
      <div id='verticalnav' className='hidden bg-white h-[100vh] w-[95vw] fixed z-10 top-0 lg:hidden xl:hidden'>
        <div className='h-14 content-center pr-4'>
          <img className='w-9 h-9 float-right' src={close} onClick={handleCloseMenu} />
        </div>
        <Link to='/'> <a className={`block h-10 content-center hover:bg-[lightblue] pl-10`} onClick={handleLink}>Shop</a></Link>
         <Link to='/men'> <a className={`block h-10 content-center hover:bg-[lightblue] pl-10`} onClick={handleLink}>Men</a></Link>
       <Link to='/women'>  <a className={`block h-10 content-center hover:bg-[lightblue] pl-10`} onClick={handleLink}>women</a></Link>
       <Link to='/kids'>   <a className={`block h-10 content-center hover:bg-[lightblue] pl-10`} onClick={handleLink}>Kids</a></Link>

      </div>


      {/* this confirmation section for logout */}
      <div className={`${are_you_sure} inset-0 fixed  bg-black bg-opacity-50 flex items-center justify-center`}>
          <div className=' bg-white  text-gray-800 w-[350px] h-[170px]  rounded-lg  '> 
                <div className='h-[70%] flex items-center justify-center'>
                  <p>Are you sure to logout?</p>
              </div>
         
              <div className='flex h-[30%]  justify-end relative  text-white '>
                <button className='w-[50%] content-center text-center bg-red-400' onClick={handleNo}>No</button>
                <button className='w-[50%] content-center text-center bg-green-400' onClick={handleLogout}>yes</button>
              </div>
         </div>
      </div>
      
   
      
     

  </>

  )
}

export default Navbar
