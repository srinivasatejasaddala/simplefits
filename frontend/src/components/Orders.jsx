import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from './Context'
import _ from 'lodash'
import Track from './Track'





const Orders = () => {
    const [order_items, setOrder_Items] = useState([])
    const [cancel_item, setCancel_Item] = useState(null)
    const [selected_reason,setSelected_reason]=useState('')
    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/get_orders`, {

      

            headers: {
                mern_token:localStorage.getItem('mern_token')
            }
        }).then(res => { setOrder_Items(res.data); console.log(res.data)}).catch(err=>console.log(err) )
    }, [])
    
    const handleChange = (event) => {
        setSelected_reason(event.target.value)
        console.log(event.target.value);
        
    }
    const handleCacel = (event) => {
        event.preventDefault();
        console.log(' handle cancel');
        
        const date=new Date()
        let updatedorders = order_items.map((item) => (item._id === cancel_item._id ? ({ ...item, isCancelled: true, cancelledDate: date }) : item));
        setOrder_Items(updatedorders)

        axios.post(`${process.env.REACT_APP_API_URL}/cancel_order`, { id: cancel_item._id }).then().catch(err => console.log(err))

        axios.post(`{process.env.REACT_APP_API_URL}/cancel_order`, { id: cancel_item._id }).then().catch(err => console.log(err))

        setCancel_Item(null)
    }
  return (
    <div >
        { ( order_items.length > 0 ) ?
           <div className={`${cancel_item===null ?'block': 'hidden'}`}>
            {order_items.map(x =>
                
                <>  
                    
                <div className={`w-[90%] sm:w-[75%] m-auto border-gray-800 mt-5 rounded-lg p-5  shadow-md ${x.isCancelled===true ?'bg-gray-50 text-gray-400':''}`}>
                        <div >
                            <p className='text-sm mb-2'>Ordered on - {x.createdAt.slice(0, 10)}</p>  
                       </div>
                       
                        
                      <div className='flex text-gray-800'>
                            <img className='w-[80px] mr-5' src={x.image} />
                            <div className={`${x.isCancelled===true ?'bg-gray-50 text-gray-400':''}`}>
                                <p>{x.name}</p>
                                <span>Size: { x.size}</span> <br />   <span>Qty:{ x.quantity}</span>  <br />   <span>Price: ${ x.new_price  *x.quantity}</span>
                            </div>
                    </div>
                        {!x.isCancelled && <div id='order' className='flex justify-between w[80%] mt-5'>
                            <button className='w-[45%] border-[1px] h-[40px] rounded-md border-gray-700 hover:bg-gray-200 hover:border-gray-200 hover:text-white' onClick={() => { setCancel_Item(x)}}>Cancel</button>
                            <Link className=' w-[45%]' to='/track' state={{ item: x }} ><button className='w-[100%] border-[1px] h-[40px] rounded-md border-gray-700 hover:bg-gray-200 hover:border-gray-200 hover:text-white' onClick={() => { <Track item={x} />}}>Track</button> </Link> 
                        </div>}
                    <div>{(x.isCancelled && x.cancelledDate) ? <p className='text-sm mt-5 text-red-500'>Cancelled on - {new Date(x.cancelledDate).toISOString().slice(0, 10)}
</p>: <span></span> }</div>
              </div>
                 </> )}
          </div>
              : <span></span> }
          
          {cancel_item !== null && <div className={`   h-[90vh]  flex justify-center items-center bg-gray-50`}>
              <div className={` ${cancel_item !== null ? 'block' : 'hidden'}   items-center  w-[380px]  shadow-xl  bg-white pt-5`}>
                  <div className='flex m-auto w-[85%] mb-2'>
                      <div className='text-xs mr-[10px]'>
                          <p >{cancel_item.name}</p>
                          <p> qty: {cancel_item.quantity}</p>
                          <p>${cancel_item.quantity *cancel_item.new_price }</p>
                      </div>
                     
                      <img className='w-[60px]' src={cancel_item.image} alt="" />
                  </div>
                  <hr />
                  <p className='w-[85%] m-auto mt-5'>Reason For Cancellation</p>
                  <form className='flex flex-col m-auto w-[85%]' onSubmit={handleCacel}>
                      <div className='mt-5 content-center'>
                          <input name='radio' className='mr-2' type="radio" value='Price of the product has now decreased'  onChange={handleChange}/>
                          <label >Price of the product has now decreased</label>
                      </div>

                      <div className='mt-5 content-center'>
                          <input name='radio' className='mr-2' type="radio" value={`I'm worried about the ratings/reviews` }  onChange={handleChange}/>
                          <label >I'm worried about the ratings/reviews</label>
                      </div>
                      
                      <div className='mt-5 content-center'>
                          <input name='radio' className='mr-2' type="radio" value='I was hoping for a shorter delivery time' onChange={handleChange}/>
                          <label >I was hoping for a shorter delivery time</label>
                      </div>
                      <div className='mt-5 content-center mb-5'>
                          <input name='radio' className='mr-2' type="radio" value='My reasons are not listed here' onChange={handleChange}/>
                          <label >My reasons are not listed here</label>
                      </div>
                      <div >
                          {selected_reason !== '' ? <button className='mt-5 w-[100%] h-[40px] mb-7 bg-yellow-500' type='submit' >Submit</button>
                              : <span></span>}
                     </div>
                     

                  </form>
              </div>
          </div>
          }
    </div>
  )
}


// I want to change the payment option

// I want to change the contact details

// I want to change the delivery address

// I want to change the size / color / type

export default Orders;
