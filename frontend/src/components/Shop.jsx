import React, { useEffect, useState } from 'react'
import hero from './Assets/hero_image.png'
import hand from './Assets/hand_icon.png'
import arrow from './Assets/arrow.png'
import exclusive from './Assets/exclusive_image.png'
import Navbar from './Navbar'
import Loadding from './loadding'
import Footer from './Footer'
import style from './style.css'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from './Context'
import { useContext } from 'react'
const Shop = () => {
    const navigate=useNavigate()
    const [popular_women, setPopular_Women] = useState([]);
    const [new_collections, setNew_Collections] = useState([]);
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
       
           
               axios.get(`${process.env.REACT_APP_API_URL}/popular`).then((response1)=> setPopular_Women( response1.data)).catch(err=>console.log(err));
               
                axios.get(`${process.env.REACT_APP_API_URL}/new_collection`).then((response2)=> setNew_Collections( response2.data)).catch(err=>console.log(err));
                
           
     
    }, [])
    
     if (popular_women.length ===0 || new_collections.length ===0) {
        return (
            <Loadding/>
        )
    }
    return (
        <>
            <Navbar />

    <div className=' h-[850px] flex items-center bg-gradient-to-t from-white to-red-200 bg-gradient-to-t md:h-[540px]  '>
        <div className='w-[100%] sm:w-[100%]  md:w-[50%] content-center   h-[540px]'> 
            <div className='w-auto  w-fit m-auto'>
                <h3 className='text-sm mb-2 font-semibold'>NEW ARRIVALS ONLY</h3>
                <h1 className='text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-1 font-semibold'>new <img className='h-10 inline'  src={hand} alt="hand icon" /></h1>
                <h1 className='text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-1 font-semibold'>collections</h1>
                <h1 className='text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-2 font-semibold'>for everyone</h1>
                 <a href="#newcollection"><button className='bg-[#ff0000] text-sm text-white h-8 mt-4 w-[150px] rounded-2xl' >Latest Collections <img className='w-3 h-2 inline' src={arrow}/></button> </a> 
            </div> 
            
        </div>
        <div className='hidden sm:hidden md:w-[50%] md:content-center md:h-[540px] md:block '>
            <img  className='md:h-[440px] lg:h-[490px] m-auto' src={hero} alt="home page model" />
        </div>
    </div>

    <div id='popular' className='lg:h-[590px]  pt-11 content-center'>
            <h1 className='text-3xl text-center text-black mb-10 font-semibold '>POPU<span className='border-b-4 pb-2 border-black'>LAR IN W</span>OMEN</h1>
            <div className='grid sm:w-[70%] grid-rows-2 grid-cols-2 w-[99%]  md:grid-cols-3 lg:grid-rows-1 lg:grid-cols-4 gap-x-3 gap-y-20 md:w-fit lg:w-fit xl:w-fit m-auto items-center mt-10' >
                {popular_women.length > 0 ? popular_women.map(x => <Link to='/single-item' state={{ from: x, signel: "not_cart" }}>
                    <div id='card' className='w-fit m-auto'>
                        <img className='popular-img' src={x.image} />
                        <div >
                            <p className='text-xs w-44 md:w-56 lg:w-56 xl:w-56 '>{ x.name}</p>
                            <p className='text-sm'><span>${x.new_price}</span> <del className='ml-4 text-gray-400'> ${ x.old_price}</del></p>
                        </div>
                    </div> </Link>):<div></div>
                }
            </div>

    </div>
    <div className='h-[550px] content-center mb-10 md:mt-20'>

            <div className='flex w-[100%] bg-gradient-to-t from-white to-red-200 bg-gradient-to-t h-[350px]   md:w-[75%] lg:w-[75%] xl:w-[75%] m-auto'>
                <div className='w-[60%] md:w-[60%] ml-4 content-center'>
                        <div className='w-fit m-auto'>
                            <h1  className='text-4xl  md:text-4.5xl lg:text-5xl text-black mb-1 font-semibold'>Exclusive</h1>
                            <h1  className='text-4xl  md:text-4.5xl lg:text-5xl text-black mb-1 font-semibold'>Offers For You</h1>
                            <h3  className='text-lg text-black mb-1 font-semibold'>ONLY ON BEST SELLING PRODUCTS</h3>
                            <button className='bg-[#ff0000] text-sm text-white h-8 mt-4 w-[120px] rounded-2xl'>Check now</button>
                        </div>
                                    
                </div>
                        
                <div className='w-[50%] content-center  '>
                    <img  className='h-[200px] md:h-[280px] lg:h-[300px] m-auto' src={exclusive}  />
                </div>
            </div>  
                    
    </div>   

    <div className=' content-center  mb-20' >
            <a name="newcollection"></a>
            <div>
                    <h1 className='text-3xl  text-center text-black mb-7 font-semibold' >NEW <span className='border-b-4 pb-2 border-black'>COLLET</span>IONS</h1>    <br/>
                     <div className='w-[99%]  grid  grid-cols-2 sm:w-[70%] md:grid-cols-3  lg:grid-cols-4 gap-x-3  gap-y-20 md:w-fit lg:w-fit xl:w-fit m-auto  items-center' >
                        {new_collections.length > 0 ? new_collections.map(x => <Link to='/single-item' state={{ from: x, signel: "not_cart" }}>
                                <div id='card' className='w-fit m-auto '>
                                    <img className='popular-img' src={x.image} />
                                    <div >
                                        <p  className='text-xs w-44 md:w-56 lg:w-56 xl:w-56 '>{ x.name}</p>
                                        <p className='text-sm'><span>${x.new_price}</span> <del className='ml-4 text-gray-400'> ${ x.old_price}</del></p>
                                    </div>
                            </div> </Link>): <div></div>
                        }
                     </div>
            </div>  
    </div>

   
    <Footer/>     
    </>
  )
}

export default Shop
