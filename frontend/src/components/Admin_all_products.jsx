import React from 'react'
import axios, { all } from 'axios'
import { useState, useEffect } from 'react'
import Loadding from './loadding'

const Admin_all_products = () => {
        const [all_products, setAll_Products] = useState([])
    const [dispalyed_items, setDisplayed_Items] = useState([])
    const [category, setCategory] = useState('All')
    const [delete_confirmation, setDelete_Confirmation] = useState(false)
    const [dellete_item, setDelete_Item] = useState(null)
    const [update_item, setUpdate_Item] = useState(null)
    const [update_confirmation, setUpdate_Confirmation] = useState(false)
      const [newprice, setnewprice] = useState("")
    const [oldprice, setoldprice] = useState("")
    const [updateerr,setUpdateerr]=useState('')
    useEffect(() => {
          axios.get(`${process.env.REACT_APP_API_URL}/all_items`).then(res => {
            setAll_Products(res.data);
            console.log(res.data);
            if (dispalyed_items.length ===0) {
                setDisplayed_Items(res.data);
            }
        }).catch(err=>console.log(err)
    )
    }, [])
    
  const handleDelete = () => {
      const updateditems = all_products.filter(item => item._id !== dellete_item._id)
      setAll_Products(updateditems)
      setDelete_Confirmation(false)
      setDisplayed_Items(updateditems)
      console.log(dellete_item);
      setCategory(category)
      axios.post(`${process.env.REACT_APP_API_URL}/delete_item`, { id: dellete_item._id }).then().catch(err => console.log(err))
      setDelete_Item(null)
    }
    
    const handleUpdatePrice = () => {
     if (newprice===''|| oldprice==='') {
        setUpdateerr('no field should be empty')
     }
    else if (newprice<1 || oldprice <1) {
        setUpdateerr('price must be greater than one')
    }
     else {
         setUpdateerr('');
         const updateditems = all_products.map(item => item._id === update_item._id ? { ...item, new_price: newprice, oldprice } : item)
            setAll_Products(updateditems)
       
         if (category==='All') {
               setDisplayed_Items(updateditems)
         }
         else {
             setDisplayed_Items(updateditems.filter(item=>item.category===category))
         }
         axios.post(`${process.env.REACT_APP_API_URL}/update_product`, { id: update_item._id, new_price: newprice, old_price: oldprice }).then().catch(err => console.log(err))
         setUpdate_Item(null)
        setUpdate_Confirmation(false)
    }
   
 }
    const handleCategoryFilter = (event) => {
        setCategory(event.target.value)
        if (event.target.value === 'All') {
            setDisplayed_Items(all_products);
        }
       else if(event.target.value === 'Women') {
            setDisplayed_Items(all_products.filter(item => item.category === 'Women'))
        }
         else if(event.target.value === 'Men') {
            setDisplayed_Items(all_products.filter(item => item.category === 'Men'))
        }
          else if(event.target.value === 'Kid') {
            setDisplayed_Items(all_products.filter(item => item.category === 'Kid'))
        }
  }
     if (all_products.length ===0) {
        return (
            <Loadding/>
        )
    }
    if (update_confirmation) {
        return (
             <div className=' md:w-[85%] m-auto p-[10px] md:p-10 shadow-lg mt-20 mb-10 text-gray-700 rounded-lg'>
                            <div className='  flex  '>
                                <div className='mr-5'>
                                    <img className='w-[130px] h-[150px]' src={update_item.image} alt="" />
                                </div>
                                <div>
                                    <p>{update_item.name}</p>
                                    <p>Category: {update_item.category}</p>
                                    <p className='text-xs text-red-300 mt-2'>{updateerr}</p>
                                  <div className='hidden sm:block'>
                                     <p className='mt-[10px]'>New Price: <input required className='border-[1px]  rounded-md pl-[2px] border-gray-800' type="number" min='1' value={newprice} onChange={(event)=>setnewprice(event.target.value)}/>   </p>
                                    <p className='mt-[10px]'>Old  Price: <input required className='border-[1px]  rounded-md pl-[2px] ml-[6px] border-gray-800' type="number" min='1' value={oldprice} onChange={(event)=>setoldprice(event.target.value)}/> </p>
                                    
                                    </div>
                                </div>
                                    
                </div>
                <div className='sm:hidden'>
                    <p className='mt-[10px]'>New Price: <input required className='border-[1px]  rounded-md pl-[2px] border-gray-800' type="number" min='1' value={newprice} onChange={(event)=>setnewprice(event.target.value)}/>   </p>
                                    <p className='mt-[10px]'>Old  Price: <input required className='border-[1px]  rounded-md pl-[2px] ml-[6px] border-gray-800' type="number" min='1' value={oldprice} onChange={(event)=>setoldprice(event.target.value)}/> </p>
                                    
                </div>
                <div className='content-center w-full flex justify-end ' >
                    <button className='h-[35px] text-sm text-white w-full md:w-[70px] mt-3 rounded-sm mr-5 bg-red-400' onClick={() => { setUpdate_Confirmation(false); setUpdate_Item(null)}}>Cancel</button>
                                        
                                        <button className='h-[35px] text-sm text-white w-full md:w-[70px] mt-3 rounded-sm mr-5 bg-green-400' onClick={handleUpdatePrice}>Save</button>
                                        
                              </div>
                              
                        </div>
        )
    }
    if (delete_confirmation) {
        return(  <div className={` inset-0  h-[50vh] md:h-[80vh]   flex items-center justify-center`}>
          <div className=' bg-white   mt-10  text-gray-800 w-[350px] h-[170px]  rounded-lg shadow-lg '> 
                <div className='h-[60%] flex items-center justify-center'>
                  <p>Are you sure want to delete this product ?</p>
              </div>
         
              <div className='flex  justify-around relative mb-5  text-white '>
                    <button className='w-[40%] h-[40px] rounded mb-5-lg content-center text-center bg-red-400' onClick={() => { setDelete_Confirmation(false); setDelete_Item(null)}}>No</button>
                <button className='w-[40%] h-[40px] rounded-lg content-center text-center bg-green-400' onClick={handleDelete}>yes</button>
              </div>
         </div>
        </div>)
    }
  return (
    <div>
          {dispalyed_items.length > 0 &&
              <div>
                  <div className=' md:w-[85%] m-auto '>
                      {/* <button>Category : </button> */}
                      <button className={`h-[35px] mr-3 mt-[5px] ml-3 pl-3 pr-3 content-center border-[1px]  text-sm rounded-xl  ${category ==='All' ?'bg-[#ff0000] text-white border-[#ff0000]':'border-gray-800'}`} value='All' onClick={handleCategoryFilter}>All </button>
                      <button className={`h-[35px] mr-3 mt-[5px]  pl-3 pr-3 content-center border-[1px]  text-sm rounded-xl  ${category ==='Women' ?'bg-[#ff0000] text-white border-[#ff0000]':'border-gray-800'}`} value='Women' onClick={handleCategoryFilter}>Women </button>
                      <button className={`h-[35px] mr-3 mt-[5px] pl-3 pr-3 content-center border-[1px]  text-sm rounded-xl  ${category ==='Men' ?'bg-[#ff0000] text-white border-[#ff0000]':'border-gray-800'}`} value='Men' onClick={handleCategoryFilter}>Men </button>
                      <button className={`h-[35px] mr-3 mt-[5px] pl-3 pr-3 content-center border-[1px]  text-sm rounded-xl  ${category ==='Kid' ?'bg-[#ff0000] text-white border-[#ff0000]':'border-gray-800'}`} value='Kid' onClick={handleCategoryFilter}>Kids </button>
                  </div>
                    <div>
                      {dispalyed_items.map(item =>
                      <div className=' md:w-[85%] m-auto p-[10px] md:p-10 shadow-lg mt-10 mb-10 text-gray-700 rounded-lg'>
                            <div className='  flex  '>
                                <div className='mr-5'>
                                    <img className='w-[130px] h-[150px]' src={item.image} alt="" />
                                </div>
                                <div>
                                    <p>{item.name}</p>
                                    <p>Category: {item.category}</p>
                                    <p>New price: ${item.new_price}     </p>
                                    <p>Old Price: <span className='text-gray-400 mr-3'> <del>${item.old_price} </del></span></p>
                                    
                                </div>
                                    
                            </div>
                                    <div className='content-center w-full flex justify-between'>
                                  <button className='h-[35px] text-sm text-white w-[45%] mt-3 rounded-sm mr-5 bg-green-400' onClick={() => { setUpdate_Confirmation(true); setUpdate_Item(item); setnewprice(item.new_price);  setoldprice(item.old_price)}}>Edit</button>
                                        <button className='h-[35px] text-sm text-white w-[45%] mt-3 rounded-sm mr-5 bg-red-500' onClick={() => { setDelete_Confirmation(true); setDelete_Item(item)}}>Delete</button>
                                        
                              </div>
                              
                        </div>
                          
                      )}
                  </div>



                  
                </div>}
          
        
          
    </div>
  )
}

export default Admin_all_products
