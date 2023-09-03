import React, { useEffect, useState } from 'react'
import logo from '../Images/White-logo.png'
import '../css/Login.css'
import { useFormik } from 'formik';
import * as yup from 'yup'
import BusinessService from '../service/BusinessService';
import { useNavigate } from 'react-router-dom';
import InvestorService from '../service/InvestorService';
import AdminService from '../service/AdminService';

function Login() {
   const navigate = useNavigate();
   function checkRole(UserDetails) {
      let role=UserDetails.role
      delete UserDetails.role;
      console.log(UserDetails)
      if (role === "Business"){
         BusinessService.businessLogin(UserDetails)
         .then((response)=>{
               if(response.status===200){
                  localStorage.setItem("userDetail",JSON.stringify(response.data));
                  return navigate("/BusinessLanding");
               }
               else alert("Invalid Credential")
         })
         .catch((error)=>{
            console.log(error)
            alert("Invalid Credential")
         })
      }
     else if (role === "Investor"){
         InvestorService.investorLogin(UserDetails)
         .then((response)=>{
               if(response.status===200){
                  localStorage.setItem("userDetail",JSON.stringify(response.data));
                  return navigate("/BusinessListing");
               }
               else alert("Invalid Credential")
         })
         .catch((error)=>{
            console.log(error);
             alert("Invalid Credential")
         })
      }
      else{
         AdminService.adminLogin(UserDetails)
         .then((response)=>{
               if(response.status===200){
                  localStorage.setItem("userDetail",JSON.stringify(response.data));
                  return navigate("/AdminLanding");
               }
               else alert("Invalid Credential")
         })
         .catch((error)=>{
            console.log(error);
            alert("Invalid Credential")   
         })
      }
   }
   const btnstyle = {
      backgroundColor: '#01BFBd',
      color: 'white'
   }
   useEffect(() => { }, [])

   const login = useFormik({
      initialValues: {
         email: "",
         password: "",
         role: "",
      },
      validationSchema: yup.object({
         email: yup.string().email('Invalid email format!').required('Email is mandatory!'),
         password: yup.string().required("Password is mandatory!"),
         role: yup.string().required("Please select an role")
      }),
      onSubmit: values => {
         console.log(values);
         checkRole(values);

      }
   })
   return (
      <div className="login-box" id='login-div'>

         <div className="card card-outline card-warning">
            <div className="card-header text-center" id='img'>
               <a href="index.html" className="brand-link">
                  <img src={logo} alt="Logo" width="200" />
               </a>
            </div>
            <div className="card-body" >
               <form action="admin" method="post" onSubmit={login.handleSubmit}>
                  <div className="input-group mb-3">
                     <input type="email" className="form-control" placeholder="email" name='email'{...login.getFieldProps("email")} />
                     <div className="input-group-append">
                        <div className="input-group-text">
                           <span className="bi bi-person-fill"></span>
                        </div>
                     </div>

                  </div>
                  {login.touched.email && login.errors.email ? (<div className='text-danger myDiv'>{login.errors.email}</div>) : null}

                  <div className="input-group mb-4">
                     <input type="password" className="form-control" placeholder="Password"{...login.getFieldProps("password")} name='password' />

                     <div className="input-group-append">
                        <div className="input-group-text">
                           <span className="bi bi-lock-fill"></span>
                        </div>
                     </div>
                  </div>
                  <div className='text-danger myDiv'>{(login.touched.password && login.errors.password) ? login.errors.password : null} </div>
                  <div className="input-group mb-4">
                     <select className="form-control" name="role"{...login.getFieldProps("role")}>
                        <option>Select your Role</option>
                        <option value='Admin'>Admin</option>
                        <option value="Business">Business</option>
                        <option value='Investor'>Investor</option>
                     </select>
                     <div className="input-group-append">
                        <div className="input-group-text">
                           <span className="bi bi-people-fill"></span>
                        </div>
                     </div>
                  </div>
                  <div className='text-danger myDiv'>{(login.touched.role && login.errors.role) ? login.errors.role : null} </div>
                  <div className="row">
                     <div className="col-6 offset-3">
                        <button type="submit" className="btn btn-block" style={btnstyle} >Login</button>
                     </div>
                  </div>
               </form>
            </div>

         </div>

      </div>
   )
}

export default Login