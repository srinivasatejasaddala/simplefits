import React, { useEffect, useState } from 'react'

import star from './Assets/star_icon.png'
import star_dull from './Assets/star_dull_icon.png'
import right_arrow from './Assets/breadcrum_arrow.png'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Update_cart_item = () => {
    const location = useLocation();
    const {from,signel}=location.state
    const item = from;
    const navigate = useNavigate();
    const [Size, setSize] = useState(item.size);
    useEffect(() => {
        document.getElementById(Size+1).style.backgroundColor = "lightskyblue";
        document.getElementById(Size + 2).style.backgroundColor = "lightskyblue";
        
   })
//     useEffect(() => {
//       axios.post
//   },[])
    const handleUpdateSize = (size) => {
        
        let childrens1 = ['S1','M1','L1','XL1', 'XXL1']
        let childrens2 = ['S2','M2','L2','XL2', 'XXL2']
        let temp1 = size + '1';
        let temp2 = size + '2';
        
        for (let i of childrens1) {
            if (i===temp1) {
                document.getElementById(temp1).style.backgroundColor = "lightskyblue";
            }
            else {
               document.getElementById(i).style.backgroundColor = '#f3f4f6'
            }
        }

         for (let i of childrens2) {
            if (i===temp2) {
                document.getElementById(temp2).style.backgroundColor = "lightskyblue";
            }
            else {
               document.getElementById(i).style.backgroundColor = '#f3f4f6'
            }
        }
        
        
        setSize(size)
   }
    const handleUpdate_item = async () => {
        axios.post(`${process.env.REACT_APP_API_URL}/update_cart`, { id: item._id, size: Size }).then().catch(err=>console.log(err))
        
       let childrens1 = ['S1','M1','L1','XL1', 'XXL1']
        let childrens2 = ['S2','M2','L2','XL2', 'XXL2']
       
        
        for (let i of childrens1) {
            
               document.getElementById(i).style.backgroundColor = '#f3f4f6'
            
        }

         for (let i of childrens2) {
            
               document.getElementById(i).style.backgroundColor = '#f3f4f6'
            
        }
        navigate('/cart')
    }

    return (
        <div className='mt-10 content-center'>
        <div className='block sm:block md:hidden lg:hidden xl:hidden mt-5'>
                <div className='w-[80%] sm:w-[80%]  m-auto mt-4 ' >
                    <img className='w-[100%] sm:w-[80%] m-auto'  src={item.image}></img>
                </div>
                <div className='w-[80%] sm:w-[80%] m-auto mt-4 text-2xl font-semibold'>
                        <p>{item.name}</p>
                </div>
                <div className='w-[80%] sm:w-[80%] m-auto mt-6 flex'>
                    <img className='mr-1 w-4 h-4' src={star} />
                    <img className='mr-1 w-4 h-4' src={star} />
                    <img className='mr-1 w-4 h-4' src={star} />
                    <img className='mr-1 w-4 h-4' src={star} />
                    <img className='mr-1 w-4 h-4' src={star_dull} />
                    <a className='ml-2 text-sm' >  (122)</a>
                </div>

                <div className='w-[80%] sm:w-[80%] m-auto mt-6'>
                    <p>  <del className='mr-4 text-gray-400'>${item.old_price} </del> <span className='font-semibold text-lg'>${ item.new_price}</span> </p>
                </div>
                <div className='w-[80%] m-auto mt-4 lg:mt-6'>
                            <p className='text-xs'>A lightweight, usually knitted, pullover topware, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.</p>
                </div>
                <div className='w-[80%] sm:w-[80%] m-auto mt-4'>
                    <p>Select size</p>
                
                    <div  className='flex   mt-4  justify-start' >
                    
                            <button id='S1' className='size' onClick={()=>handleUpdateSize("S")} >S</button>
                            <button id='M1' className='size' onClick={()=>handleUpdateSize("M")}   >M</button>
                            <button id='L1' className='size' onClick={()=>handleUpdateSize("L")}  >L</button>
                            <button id='XL1' className='size' onClick={()=>handleUpdateSize("XL")} >XL</button>
                            <button id='XXL1' className='size' onClick={()=>handleUpdateSize("XXL")} >XXL</button>
                    

                    </div>
                </div>
                <div className='w-[80%] sm:w-[80%] m-auto mt-4 mb-10'>
                    <button className='w-[100%] h-[50px] text-sm text-white mb-5 mt-5 bg-[#ff0000]' onClick={handleUpdate_item} >ADD TO CART</button>
                    <p className='mb-1 text-xs'><span className='font-bold '>Category:   </span>{item.category}</p>
                    <p className='mb-10 text-xs'><span className='font-bold '>Tags:   </span>Modren,Latest</p>
                </div>
            </div>
            



         {/* except mobile this is for all remaining     */}
         <div className='hidden sm:hidden  md:flex lg:flex  md:justify-center lg:justify-center content-center mt-5  '>
                <div className='  flex  justify-center items-center mr-5 '>
                        <div className=' box-border  h-[450px] grid grid-cols-1 overflow-hidden m-auto mr-5 ml-5 ' >
                         <img className='w-[95.5px] h-[95.5px] mb-2'  src={item.image}></img>
                         <img className='w-[95.5px] h-[95.5px] mb-3' src={item.image}></img>
                         <img className='w-[95.5px] h-[95.5px] mb-3' src={item.image}></img>
                         <img className='w-[95.5px] h-[95.5px] mb-3' src={item.image}></img>
                        </div>
                        <div className='  h-[450px] m-auto    overflow-hidden' >
                             <img className='h-[433px] ' src={item.image}></img>
                        </div>
                        
                </div>   
                <div className=' w-[400px]  lg:w-[450px] h-[450px] mr-5  '>
                         <div className=' m-auto  text-2xl font-semibold'>
                              <p>{item.name}</p>
                         </div>
                        <div className=' m-auto mt-3 flex items-end '>
                            <img className='mr-1 w-4 h-4' src={star} />
                            <img className='mr-1 w-4 h-4' src={star} />
                            <img className='mr-1 w-4 h-4' src={star} />
                            <img className='mr-1 w-4 h-4' src={star} />
                            <img className='mr-1 w-4 h-4' src={star_dull} />
                            <p className='ml-2 text-sm' >  (122)</p>
                        </div>
                        <div className=' m-auto mt-4 lg:mt-6 '>
                            <p>  <del className='mr-4 text-gray-400'>${item.old_price} </del> <span className='font-semibold text-lg text-[#ff0000]'>${ item.new_price}</span> </p>
                       </div>
                    <div className=' m-auto mt-4 lg:mt-6'>
                            <p className='text-xs'>A lightweight, usually knitted, pullover topware, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.</p>
                    </div>                   
                        <div className=' m-auto mt-4'>
                            <p>Select size</p>
                        
                            <div id='sizediv' className='flex  justify-between mt-4 w-[200px]' >
                            
                            <button  id='S2' className='size' onClick={()=>handleUpdateSize("S")} >S</button>
                            <button id='M2' className='size' onClick={()=>handleUpdateSize("M")}   >M</button>
                            <button id='L2' className='size' onClick={()=>handleUpdateSize("L")}  >L</button>
                            <button id='XL2' className='size' onClick={()=>handleUpdateSize("XL")} >XL</button>
                            <button id='XXL2' className='size' onClick={()=>handleUpdateSize("XXL")} >XXL</button>
                            

                            </div>
                        </div>
                        <div className=' m-auto mt-2'>
                            <button className=' h-[45px] w-[150px] text-sm text-white mb-5 mt-5 bg-[#ff0000]' onClick={handleUpdate_item} >ADD TO CART</button>
                        <p className='mb-[1px] lg:mt-[17px] text-xs'><span className='font-bold '>Category:   </span>{item.category}</p>
                        <p className='mb-10 text-xs'><span className='font-bold '>Tags:   </span>Modren,Latest</p>
                        </div>
                  </div>
         </div>
        
</div>
            );
}


export default Update_cart_item;
