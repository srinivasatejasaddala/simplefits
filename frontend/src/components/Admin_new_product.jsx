import React from 'react'
import style from './style.css'
import { useState } from 'react';
import axios from 'axios'
import tick from './Assets/green_verified_badge.png'

const Admin_new_product = () => {

        const [new_item_tost, setnew_item_tost] = useState('hidden')
        const [formData, setFormData] = useState({
        name: '',
        category: '',
        image: null,
        new_price: '',
        old_price: ''
    });
    const [errors, setErrors] = useState({});



    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }
        if (!formData.image) {
            newErrors.image = 'Image is required';
        }
        if (!formData.new_price || formData.new_price <= 0) {
            newErrors.new_price = 'New price must be greater than zero';
        }
        if (!formData.old_price || formData.old_price <= 0) {
            newErrors.old_price = 'Old price must be greater than zero';
        }
        if (formData.old_price && formData.new_price && Number(formData.new_price) >= Number(formData.old_price)) {
            newErrors.new_price = 'New price should be lower than old price';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'file' ? files[0] : value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // console.log('Form Data Submitted:', formData);
            const product_data = new FormData();
            product_data.append('name', formData.name)
            product_data.append('category', formData.category)
            product_data.append('image', formData.image)
            product_data.append('new_price', formData.new_price)
            product_data.append('old_price', formData.old_price)
            
            axios.post(`${process.env.REACT_APP_API_URL}/new_product`, product_data, {
                headers: {"Content-Type":"multipart/form-data"  }
            }).then().catch(err=>console.log(err))
            
            // console.log('handle submitt');
            
setnew_item_tost('visible');
        let toastdiv = document.getElementById('new_item_tost');
        try {
            setTimeout(() => { toastdiv.style.animationName = 'side_out'; }, 2000)
            setTimeout(() => {
                setnew_item_tost('hidden')
                toastdiv.style.animationName = 'side_in';
            }, 2800)
        }
        catch (err) {
            // console.log(err);
        
        }


            formData.name = '';
            formData.category = '';
            formData.new_price=""
            formData.old_price=""
            formData.image=""
        }
    };






  return (
   <div>
            <h2 className="text-xl mt-5 font-bold mb-4">Product Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        // required 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                
                <div>
                    <label className="block font-medium">Category:</label>
                    <input 
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        // required 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>

                <div>
                    <label className="block font-medium">Image:</label>
                    <input 
                        type="file" 
                        name="image" 
                        onChange={handleChange} 
                        // required 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                </div>

                <div>
                    <label className="block font-medium">New Price:</label>
                    <input 
                        type="number" 
                        name="new_price" 
                        value={formData.new_price} 
                        onChange={handleChange} 
                        step="0.01" 
                        // required 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    {errors.new_price && <p className="text-red-500 text-sm">{errors.new_price}</p>}
                </div>

                <div>
                    <label className="block font-medium">Old Price:</label>
                    <input 
                        type="number" 
                        name="old_price" 
                        value={formData.old_price} 
                        onChange={handleChange} 
                        step="0.01" 
                        // required 
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                    {errors.old_price && <p className="text-red-500 text-sm">{errors.old_price}</p>}
                </div>
                <div className='flex justify-end '>
                        <button 
                    type="submit" 
                    className="w-[150px]  bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    Submit
                </button>
                </div>
                
          </form>
          
          
          <div id='new_item_tost' className={` ${new_item_tost} w-[80%] z-10  fixed   flex justify-center  h-[40px] top-5  md:justify-end `}>
 
                    <div className={` w-fit h-[40px]    m-auto flex     justify-center items-center  `}>
                        <img src={tick} alt="" />
                        <p className='text-green-500  ml-[2px] font-bold '>New Product Added Sucessfully</p>
                         
                    </div>
                </div>
        </div>    

  )
}

export default Admin_new_product
