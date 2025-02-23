import axios from "axios";
import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Context } from "./Context";

const AuthForm = () => {
  const navigate = useNavigate();
  const {logged_user,setLogged_User} = useContext(Context)
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [loginErr, setLoginErr] = useState('')
  const [otp_box, setOtp_Box] = useState(false);
  const [otp, setOtp] = useState(null)
  const [register_id, setREgister_id] = useState('')
  const [verification_error,setverification_error]=useState('')
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    mobile: "",
    pincode: "",
    street: "",
    city: "",
  });
  const [errors, setErrors] = useState({}); // To track validation errors
   const [user, setuser] = useState(null)
  
  useEffect(() => {
        if (logged_user !== null) {
          if (logged_user.isAdmin === true) {
            navigate('/admin')
            console.log('admin');
            
          }
         
        }
          
  },[])

    useEffect(() => {
      
        
        if ((localStorage.getItem('mern_token'))) {
            navigate('/')
        }
    }, [])
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
            let validationErrors = {};
            // Email validation
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "Please enter a valid email address.";
            }
            // Password validation
            if (!formData.password || formData.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters long.";
            }
            if (!isLogin) {
            // Username validation
            if (!formData.username.trim()) {
                validationErrors.username = "Username is required.";
            }
            // Mobile number validation
            if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
                validationErrors.mobile = "Mobile number must be 10 digits.";
            }
            // Pin code validation
            if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) {
                validationErrors.pincode = "Pin code must be 6 digits.";
            }
            // Street validation
            if (!formData.street.trim()) {
                validationErrors.street = "Street is required.";
            }
            // City validation
            if (!formData.city.trim()) {
                validationErrors.city = "City is required.";
            }
            }
            setErrors(validationErrors);
            return Object.keys(validationErrors).length === 0; // Return true if no errors
  };
  // console.log(register_id);
  


  const verifyOtp = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/verify-otp`, { "id": register_id,"otp":otp }).then(res => {
      console.log(res.data);
         
      if (res.data === 'verified') {
            setOtp_Box(false);
            setIsLogin(true);
      }
      else if (res.data ==="Incorrect verifcation code") {
        setverification_error(res.data);
      }
      else {
        setverification_error(res.data)
      }
      // setREgister_id(null)
      // setOtp('');
        })
  }
  


  const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
        if (isLogin) {
            console.log("Login Data: ", { email: formData.email, password: formData.password });
            // Handle login logic here
            axios.post(`${process.env.REACT_APP_API_URL}/login`, { email: formData.email, password: formData.password }).then((res) => {
                console.log(res.data)
                if (res.data === 'Incorrect Password') {
                   setLoginErr('Incorrect Password')
                }
                else if ( res.data === "User dosenot exists") {
                   setLoginErr("User dose not exists")
                }
                 else if ( res.data === "mail not verified register again") {
                  setLoginErr("mail not verified register again")
                  console.log(res.data);
                  
                }
                
                else {
                  localStorage.setItem('mern_token', res.data)
                         axios.get(  `${process.env.REACT_APP_API_URL}/get_user`,
                          {
                            headers: {
                                    mern_token: localStorage.getItem('mern_token')
                                }
                           }).then((response) => {
                                  setLogged_User(response.data)
                                  setuser(response.data); console.log(response.data);
                                  if (response.data.isAdmin===true) {
                                  navigate('/admin')
                                    console.log(('admin'));
                                    
                                  }
                                  else {
                                    navigate('/')
                                    console.log(('Not admin'));
                                  }
                     }).catch((err) => console.log(err))
                   
                  console.log(localStorage.getItem('mern_token'));
               
                  
                 
                }
            }
            ).catch(err => console.log(err))
        } else {
            console.log("Register Data: ", formData);
            // Handle register logic here
            axios.post(`${process.env.REACT_APP_API_URL}/register`, formData).then((res) => {
                console.log(res.data) 
            
              if (res.data.message === "code sent") {
                setOtp_Box(true)
                setREgister_id(res.data.id)
                console.log(res.data.id);
                 
              }
              else {
                if (res.data.message === "User already exists") {
                   setLoginErr(res.data.message +" please login")
          
                  // setIsLogin(true);
                
                }
              }  
            }).catch(err=>console.log(err))
        }
        }
  };
  if (otp_box) {
    return (
      <>
        <Navbar />
           <div className=" flex justify-center items-center min-h-[90vh] bg-gray-100 p-2">
          <div className=" h-fit bg-white shadow-lg rounded-lg p-8 max-w-lg w-full  overflow-auto mt-10">
            <p className="text-sm text-red-300 mb-2 ">{ verification_error}</p>
            <p className="text-gray-600">verification code sent to your mail </p>
               <label className="block mt-4 text-gray-700 font-medium mb-1 ">Verification Code</label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(event)=>setOtp(event.target.value)}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none`}
              // placeholder="Enter verification code"
            />
            <div className="mt-5 flex justify-end">
              <button className=" bg-green-400 text-white pl-3 pr-3 h-[40px] content-center rounded-md" onClick={verifyOtp}>Verify</button>
            </div>
          </div>
          </div>
      </>
      )
  }

  return (
    <>       <Navbar />
    <div className=" flex justify-center items-center min-h-screen bg-gray-100 p-2">
      <div className=" h-fit bg-white shadow-lg rounded-lg p-8 max-w-lg w-full sm:h-[75vh] overflow-auto mt-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Login" : "Register"}
        </h2>
        <p className="text-sm text-red-400">{loginErr}</p>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Register-Specific Fields */}
          {!isLogin && (
            <>
              {/* Username */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none`}
                  placeholder="Enter your username"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              </div>

              {/* Mobile */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Mobile</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none`}
                  placeholder="Enter your mobile number"
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
              </div>

              {/* Pin Code */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Pin Code</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.pincode ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none`}
                  placeholder="Enter your pin code"
                />
                {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
              </div>

              {/* Street */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.street ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none`}
                  placeholder="Enter your street"
                />
                {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
              </div>

              {/* City */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-blue-300 focus:outline-none`}
                  placeholder="Enter your city"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Switch Button */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
              setLoginErr('');
            }}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
 </> );
};

export default AuthForm;
