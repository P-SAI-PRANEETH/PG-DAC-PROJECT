import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom';
import InvestorService from '../service/InvestorService';

export default function InvestorRegister() {
    const navigate = useNavigate();
    function storeData(details) {
        InvestorService.createInvestor(details)
            .then((response) => {
                alert("Thank you for registering!. You are being redirected to the login page!");
                navigate('/Login');
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const InvestorForm = useFormik({
        initialValues: {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:''
        },
        onSubmit: (values)=>{
            storeData(values);
        },
        validationSchema: yup.object({
            firstName: yup.string().required("First name is mandatory!"),
            lastName: yup.string().required(" Last name Is Mandatory!"),
            email: yup.string().email('Invalid email format!').required('Email is mandatory!'),
            password: yup
            .string()
            .matches(passwordRules, { message: "Please create a stronger password" })
            .required("Password is mandatory!"),
            confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Re-Type password is mandatory!"),
        })
    })
    return (
        <div className='w-50' id='business-register-div'>
            <form className="row g-3" onSubmit={InvestorForm.handleSubmit}>
                <div className="col-md-12 row" id='credentials'>
                    <label htmlFor="inputFirstName" className="form-label col-2">First Name</label>
                    <input type="text" className="form-control col-10" name='firstName' id="inputFirstName" {...InvestorForm.getFieldProps('firstName')}/>
                    {InvestorForm.touched.firstName && InvestorForm.errors.firstName ? (<div className='error'>{InvestorForm.errors.firstName}</div>):null}
                </div>
                <div className="col-md-12 row" id='credentials'>
                    <label htmlFor="inputLastName" className="form-label col-2">Last Name</label>
                    <input type="text" className="form-control col-10" name='lastName' id="inputLastName" {...InvestorForm.getFieldProps('lastName')}/>
                    {InvestorForm.touched.lastName && InvestorForm.errors.lastName ? (<div className='error'>{InvestorForm.errors.lastName}</div>):null}
                </div>
                <div className="col-md-12 row" id='credentials'>
                    <label htmlFor="inputEmail" className="form-label col-2">Email</label>
                    <input type="email" className="form-control col-10" name='email' id="inputEmail" {...InvestorForm.getFieldProps('email')}/>
                    {InvestorForm.touched.email && InvestorForm.errors.email ? (<div className='error'>{InvestorForm.errors.email}</div>):null}
                </div>
                <div className="col-md-12 row" id='credentials'>
                    <label htmlFor="inputPassword" className="form-label col-2">Password</label>
                    <input type="password" className="form-control col-10" name='password' id="inputPassword" {...InvestorForm.getFieldProps('password')}/>
                    {InvestorForm.touched.password && InvestorForm.errors.password ? (<div className='error'>{InvestorForm.errors.password}</div>):null}
                </div>
                <div className="col-md-12 row" id='credentials'>
                    <label htmlFor="inputconfirmPassword" className="form-label col-2">Re-Type Password</label>
                    <input type="password" className="form-control col-10" name='confirmPassword' id="inputconfirmPassword" {...InvestorForm.getFieldProps('confirmPassword')}/>
                    {InvestorForm.touched.confirmPassword && InvestorForm.errors.confirmPassword ? (<div className='error'>{InvestorForm.errors.confirmPassword}</div>):null}
                </div>

                <div className="col-12 mt-2">
                    <button type="submit" className="btn" id='btn'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}
