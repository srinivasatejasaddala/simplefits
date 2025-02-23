import delete_icon from './Assets/delete.png'
import Admin_all_products from './Admin_all_products';
import Admin_new_product from './Admin_new_product';
import Admin_users from './Admin_users';
import menu from './Assets/black-menu.png'
import close from './Assets/close2.png'
import Admin_orders from './Admin_orders';
import { useState,useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './Context';
import { useContext } from 'react';

import axios from 'axios';
const Admin = () => {
    const navigate = useNavigate()
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
                             
                setLogged_User(response.data); console.log(response.data);
                if (response.data.isAdmin === false) {
                    navigate('/')
                }
            }).catch((err) => console.log(err))
     
    }, [])

    const [menu_type, setMenu_Type] = useState('Insert New Item')
    const [show_menu, setShow_menu] = useState('block')
    const [show_cross, setShowCross] = useState('hidden')
    const [small_nav_bar, setSmall_Nav_Bar] = useState('hidden')
    


    if (logged_user !== null && logged_user.isAdmin === true) {
        return (
            <div className='md:flex h-[100vh]'>
                <div className='md:hidden bg-gray-50'>
                    <div className='flex justify-end pt-3 pr-3 pb-3'>
                        <img className={` ${show_menu} w-[30px] h-[30px] hover:cursor-pointer`} src={menu} onClick={() => { setSmall_Nav_Bar('block'); setShow_menu('hidden'); setShowCross('block') }} />
                        <img className={` ${show_cross} w-[26px] h-[26px] hover:cursor-pointer`} src={close} onClick={() => { setSmall_Nav_Bar('hidden'); setShow_menu('block'); setShowCross('hidden') }} />
                    </div>
                    <div className={`${small_nav_bar}`}>
                        <a className={`  block  h-[50px] content-center text-center  mb-[1px] hover:cursor-pointer hover:bg-gray-200 hover:text-black ${menu_type === 'Insert New Item' ? 'bg-gray-300  border-white  text-gray-800' : ''}`} onClick={() => { setMenu_Type('Insert New Item') }}> Insert New Item </a>
                        <a className={`  block  h-[50px] content-center text-center  mb-[1px] hover:cursor-pointer hover:bg-gray-200 hover:text-black ${menu_type === 'All Products' ? 'bg-gray-300  border-white  text-gray-800' : ''}`} onClick={() => { setMenu_Type('All Products') }}> All Products  </a>
                        <a className={`  block  h-[50px] content-center text-center  mb-[1px] hover:cursor-pointer hover:bg-gray-200 hover:text-black ${menu_type === 'Users' ? 'bg-gray-300  border-white  text-gray-800' : ''}`} onClick={() => { setMenu_Type('Users') }}> Users </a>
                        <a className={`  block  h-[50px] content-center text-center  mb-[1px] hover:cursor-pointer hover:bg-gray-200 hover:text-black ${menu_type === 'Orders' ? 'bg-gray-300  border-white  text-gray-800' : ''}`} onClick={() => { setMenu_Type('Orders') }}> Orders </a>
                        
                        <a className={`  block  h-[50px] content-center text-center  mb-[1px] hover:cursor-pointer hover:bg-gray-200 hover:text-black`}  onClick={() => { localStorage.setItem('mern_token', ''); navigate('/'); setLogged_User(null);  }}> Logout </a>
                    </div>
                </div>
                <div className='hidden md:block md:w-[25%] md:h-[100vh] bg-gray-50  text-gray-700'>
                    <a className={`pl-3 pr-3 md:w-auto inline-block md:block h-[50px] content-center text-center  mb-[1px] hover:cursor-pointer hover:bg-gray-100 hover:text-black ${menu_type === 'Insert New Item' ? 'bg-gray-300  border-gray-300  text-gray-800' : ''}`} onClick={() => { setMenu_Type('Insert New Item') }}> Insert New Item </a>
                    <a className={`pl-3 pr-3 md:w-auto inline-block md:block h-[50px] content-center text-center  mb-[1px] hover:cursor-pointer hover:bg-gray-100 hover:text-black ${menu_type === 'All Products' ? 'bg-gray-300  border-gray-300  text-gray-800' : ''}`} onClick={() => { setMenu_Type('All Products') }}> All Products  </a>
                    <a className={`pl-3 pr-3 md:w-auto inline-block md:block h-[50px] content-center text-center  mb-[1px] hover:cursor-pointer hover:bg-gray-100 hover:text-black ${menu_type === 'Users' ? 'bg-gray-300  border-gray-300  text-gray-800' : ''}`} onClick={() => { setMenu_Type('Users') }}> Users </a>
                    <a className={`pl-3 pr-3 md:w-auto inline-block md:block h-[50px] content-center text-center  mb-[1px] hover:cursor-pointer hover:bg-gray-100 hover:text-black ${menu_type === 'Orders' ? 'bg-gray-300  border-gray-300  text-gray-800' : ''}`} onClick={() => { setMenu_Type('Orders') }}> Orders </a>
                    <a className={`pl-3 pr-3 md:w-auto inline-block md:block h-[50px] content-center text-center  mb-[1px] hover:cursor-pointer hover:bg-gray-100 hover:text-black `} onClick={() => { localStorage.setItem('mern_token', ''); navigate('/') }}> Logout </a>

                </div>
                <div className=" md:w-[75%] md:h-[100vh] mx-auto  h-[100vh] p-6 rounded-lg  overflow-auto">
                    {menu_type === 'Insert New Item' && <Admin_new_product />}
                    {menu_type === 'All Products' && <Admin_all_products />}
                    {menu_type === 'Users' && <Admin_users />}
                    {menu_type === 'Orders' && <Admin_orders />}
                </div>
            
               
            </div>
        );
    }
}
export default Admin