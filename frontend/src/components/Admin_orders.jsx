import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Admin_orders = () => {
    const [user_orders, setUserOrders] = useState([])
    const [order_details,setOrder_details]=useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/admin_orders`).then(res => {
            setUserOrders(res.data[0]); setOrder_details(res.data[1]); console.log(res.data);
        }).catch(err => console.log(err))
    }, [])
    return (
        <div>
          
        {user_orders.length !== 0 &&
        <div>
            {user_orders.map((item,index) => 
                <div className='w-[95%] md:w-[85%]   border-2 m-auto mb-4 p-5 rounded-lg'>
                    <p className='text-gray-500 mb-2'>Ordered on - { item.createdAt.slice(0,10)}</p>
                    <div className='md:flex'>

               
                            <div className='mr-5 w-[100%] md:w-auto'>
                                <img className='w-[250px] mb-5 md:mb-0 md:w-[150px] m-auto' src={item.image}  />  
                           </div>
                           <div className='text-gray-700 w-[100%] md:w-auto'>
                                <p>{item.name}</p>
                                <p>Qty: {item.quantity}</p>
                                <p>Size: {item.size}</p>
                                <p>Total: ${item.quantity * item.new_price}</p>
                                {/* <p> {order_details[index] !== null ? order_details[index].username : order_details[index]}</p> */}
                                {/* <p>{order_details[index]}</p> */}
                                {/* <p>Delivery to 518463 Near sri krishna temple Peddanelatur Village</p>
                                <p>Customer mobile Number: 9618658319</p> */}
                            <p>Delivery to  {order_details[index].pincode}  {order_details[index].street}  { order_details[index].city}</p>
                        </div>
                    </div>
                        </div> )}
        </div>
    }
    </div>
  )
}

export default Admin_orders
