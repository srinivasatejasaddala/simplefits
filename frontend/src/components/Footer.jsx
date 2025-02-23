import React from 'react'
import insta from './Assets/instagram_icon.png'
import whatsapp from './Assets/whatsapp_icon.png'
import biglogo from './Assets/logo_big.png'
const Footer = () => {
  return (
             <footer  className='border-t-2 bg-gray-100 mt-[50px] md:mt-0'>
                <div>
                    
       
             <div className='w-fit m-auto content-center ' >
                    <h1 className='text-3xl text-[#F4511B] font-bold font-sans'> <img className='inline w-16  h-16 mb-10' src={biglogo} /> Simplefits</h1> 
                </div>
                <div className=' w-[90%] sm:w-[90%] m-auto md:w-[400px] text-xs flex justify-between mb-10'>
                    <a >Company</a>
                    <a >Products </a> 
                    <a >Offers</a>
                    <a >About</a>
                    <a >Contact</a>

                </div>
                <div className='w-fit m-auto flex mb-3 ' >
                    <img className='w-5 h-5 mr-5' src={insta} />
                    <img className='w-5 h-5' src={whatsapp} />
                    </div>
                </div>
                <hr /><br />
                <p className='text-center mb-5'>Copyright @2025 - All Right Reserved</p>
             </footer>
  )
}

export default Footer
