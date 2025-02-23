import React, { useEffect, useState } from 'react'
import womenbanner from './Assets/banner_women.png'

import style from './style.css'
import axios from 'axios'
import Loadding from './loadding'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { Context } from './Context'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Women = () => {
//   const    women_items = all_product.slice(0,12)
    const [women_products, setWomen_Products] = useState([])
    const navigate = useNavigate();
    const { logged_user, setLogged_User } = useContext(Context)
    useEffect(() => {
       axios.get( `${process.env.REACT_APP_API_URL}/get_user`,
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
       
         axios.get(`${process.env.REACT_APP_API_URL}/women`).then((response) =>{ setWomen_Products(response.data)
         }).catch((err)=>console.log())
    })
    if (women_products.length ===0) {
        return (
            <Loadding/>
        )
    }
    return (
        <> 
                   <Navbar />
        {women_products.length === 0 ? <Loadding /> :
            <div>
                    <div className='w-fit m-auto mt-20 mb-32'>
                         <img className='  w-[85%] md:w-[75%] lg:w-[75%] xl:w-[75%]  m-auto ' src={womenbanner}  />
                    </div>
                
                    <div>
                        <div className='grid sm:w-[70%] grid-rows-2 grid-cols-2 w-[99%]  md:grid-cols-3 lg:grid-rows-1 lg:grid-cols-4 gap-x-3 gap-y-20 md:w-fit lg:w-fit xl:w-fit m-auto items-center mt-10 mb-32' >
                                {women_products.length > 0 ? women_products.map(x => <Link to='/single-item' state={{from:x,signel:"not_cart"}}>       
                                    <div id='card' className='w-fit m-auto'>
                                        <img className='popular-img' src={x.image} />
                                        <div >
                                            <p className='text-xs w-44 md:w-56 lg:w-56 xl:w-56'>{ x.name}</p>
                                            <p className='text-sm'><span>${x.new_price}</span> <del className='ml-4 text-gray-400'> ${ x.old_price}</del></p>
                                        </div>
                                    </div> </Link> ):<p>Loading....</p>
                                }
                        </div>
                    </div>
            </div>
        }
</>
  )
}

export default Women
