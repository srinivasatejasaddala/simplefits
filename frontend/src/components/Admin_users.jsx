import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'

const Admin_users = () => {
    const [users_list, setUsers] = useState([])
    const [delete_confirmation, setDelete_Confirmation] = useState(false)
    const [dellete_item, setDelete_Item] = useState(null)
    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_API_URL}/get_users`).then(res => { setUsers(res.data); console.log(res.data);
        })
   
    }, [])
    const handleDelete = () => {
        const updatedusers = users_list.filter(user => user._id !== dellete_item._id)
        setUsers(updatedusers)
        axios.post(`${process.env.REACT_APP_API_URL}/remove_user`, { id: dellete_item._id }).then().catch(err => console.log(err))
        setDelete_Confirmation(false);
        setDelete_Item(null)
    }



    if (delete_confirmation) {
        return (<div className={` inset-0 h-[50vh]  md:h-[70vh] pl-3 pr-3   flex items-center justify-center`}>
            <div className=' bg-white  mt-10 text-gray-800 w-[350px] h-[170px]  rounded-lg shadow-lg '>
                <div className='h-[60%] flex items-center justify-center'>
                    <p className='w-[90%] text-center'>Are you sure want to remove {dellete_item.email} </p>
                </div>
         
                <div className='flex  justify-around relative mb-5  text-white '>
                    <button className='w-[40%] h-[40px] rounded mb-5-lg content-center text-center bg-red-400' onClick={() => { setDelete_Confirmation(false); setDelete_Item(null) }}>No</button>
                    <button className='w-[40%] h-[40px] rounded-lg content-center text-center bg-green-400' onClick={handleDelete}>yes</button>
                </div>
            </div>
        </div>)
    }
    return (
      
    <div className=''>
         {users_list.length > 0 &&
                 
                            <div >
                                {users_list.map(x => <div className='w-[95%] md:w-[85%] mt-5 shadow-lg m-auto p-5'>
                                    <p>User Name :{x.username}</p>
                                    <p>Email: {x.email}</p>
                                    <p>Pin Code :{x.pincode}</p>
                                    <p>City:{x.city}</p>
                                    <button className='h-[40px]  pl-5 pr-5 mt-3 text-white rounded-md bg-red-500' onClick={() => { setDelete_Confirmation(true); setDelete_Item(x) }}>Remove User</button>
                                </div> )}
                       </div>
                 }
                      
    </div>
  )
}

    export default Admin_users;
