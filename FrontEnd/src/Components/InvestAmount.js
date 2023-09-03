import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PaymentService from '../service/PaymentService';
import * as yup from "yup"
import { Border } from 'react-bootstrap-icons';
import "../css/InvestAmount.css"
export default function InvestAmount() {
    
    const {CampaignId}=useParams();
   const [userDetails,setUserDetails]=useState({});
    const invest=useFormik({
        initialValues: {
           amount:null,
           campaignId:CampaignId
         },
         validationSchema: yup.object({
           amount: yup.number().required("Please enter the amount").min(500)
         }),
         onSubmit: values => {
           console.log(values);
           PaymentService.createTransaction(values)
           .then((response)=>{
             console.log(response.data);
             alert("Thank you for investment")
           })
           .catch((error)=>{
            console.log("Data not found",error)
           })
         }
        
    })
    useEffect(()=>{
        
     setUserDetails(JSON.parse(localStorage.getItem("userDetail")));
    
    },[])
    return (
        <form className="form  myForm"onSubmit={invest.handleSubmit}>
          
            <div>
            <h5 className='text-left ml-3'>{userDetails.firstName},</h5>
            <div className="form-group mx-sm-3 mb-2 d-inline-block">
                <input type="number" className="form-control" id="amount"name="amount" placeholder="Enter Amount" {...invest.getFieldProps("amount")}/>
                <input type="hidden"name="campaignId"{...invest.getFieldProps("campaignId")}></input>
            </div>
          
            <button type="submit" className="btn btn-primary">Pay</button>
           
            <p className='text-danger text-left mx-5'>{(invest.touched.amount && invest.errors.amount) ? invest.errors.amount : null} </p>
            </div>
        </form>
    )
}
