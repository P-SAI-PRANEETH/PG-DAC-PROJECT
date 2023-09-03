import React, { useEffect, useState } from 'react'
import '../css/BusiRegi.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import BusinessService from '../service/BusinessService'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function BusinessRegister() {
    const navigate = useNavigate();
    const [cities,setCities]=useState([]);
    let details = {};
    useEffect(()=>{
        BusinessService.getAllCities()
        .then((response)=>{
            console.log(response.data);
            setCities(response.data);
        })
        .catch((error)=>{
            console.log("Data not found",error);
        })
    },[])
    let image;
    const states = ["Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry"]
    const category = ['Carpenter', 'FootWear', 'Textile', 'Hardware', 'Restaurant', 'Medical', 'ArtandCraft', 'Stationery']

    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const validate="/^\d{6}$"
    const BusinessForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            companyName: '',
            companyDescription: '',
            category: '',
            adrLine1: '',
            adrLine2: '',
            city: '',
            state: '',
            pincode: '',
            imageFileName: ''
        },

        onSubmit: (values) => {
            console.log(values)
            details = values;
            image = values.imageFileName;
            console.log(image);
            let formData = new FormData();
            formData.append("image", image);
            delete details.imageFileName;
            let category2 = details.category.toUpperCase();
            details.category = category2;
            console.log(details);
            BusinessService.createBusiness1(details)
                .then((response) => {
                    console.log(response.data);
                    axios.post(`http://localhost:8080/business/image/${values.email}/uploadImage`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then((response) => {
                            console.log(response.data);
                            alert("Thank you for registering,You are being redirected to login page")
                            navigate("/Login")

                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((error) => {
                    console.log(error)
                })

        },
       validationSchema:yup.object({
        email: yup.string().email('Invalid Email Format').required('Email is mandatory!'),
        password: yup
            .string()
            .matches(passwordRules, { message: "Please create a stronger password" })
            .required("Password is mandatory!"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Re-entering password is mandatory!"),
        companyName: yup.string().required('Company name is mandatory!'),
        companyDescription: yup.string().required('Description field is mandatory!'),
        category: yup.string().required('You must choose a category'),
        adrLine1: yup.string().required('Address line-1 is mandatory!'),
        adrLine2: yup.string().required('Address line-2 is mandatory!'),
        city: yup.string().required('City is mandatory!'),
        state: yup.string().required('State is mandatory!'),
        pincode: yup.number().min(100000).max(999999).required('Pincode is mandatory!'),
        imageFileName: yup.mixed().required('Upload your image, it is mandatory!').test("FILE_SIZE", "Image maximum size limit is 3mb!", (value) => value && value.size < 5 * 1024 * 1024).test("FILE_TYPE", "Only png, jpeg or jpg formats are accepted", (value) => value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
    })

    })
    return (
        <div className='w-50 p-4 mb-4' id='business-register-div'>
            <form className="row g-3" onSubmit={BusinessForm.handleSubmit}>
                <div className="col-md-12 row" id='credentials'>
                    <label htmlFor="email" className="form-label col-2">Email</label>
                    <input type="email" className="form-control col-10" id="email" name='email' {...BusinessForm.getFieldProps('email')} />
                    {BusinessForm.touched.email && BusinessForm.errors.email ? (<div className='error'>{BusinessForm.errors.email}</div>) : null}
                </div>
                <div className="col-md-12 row" id='credentials'>
                    <label htmlFor="password" className="form-label col-2">Password</label>
                    <input type="password" className="form-control col-10" name='password' id="password" {...BusinessForm.getFieldProps('password')} />
                    {BusinessForm.touched.password && BusinessForm.errors.password ? (<div className='error'>{BusinessForm.errors.password}</div>) : null}
                </div>
                <div className="col-md-12 row" id='credentials'>
                    <label htmlFor="confirmPassword" className="form-label col-2">Re-Type Password</label>
                    <input type="password" className="form-control col-10" name='confirmPassword' id="confirmPassword" {...BusinessForm.getFieldProps('confirmPassword')} />
                    {BusinessForm.touched.confirmPassword && BusinessForm.errors.confirmPassword ? (<div className='error'>{BusinessForm.errors.confirmPassword}</div>) : null}
                </div>
                <div className="col-md-12 row" id='credentials'>
                    <label htmlFor="companyName" className="form-label col-2">Company Name</label>
                    <input type="text" className="form-control col-10" name='companyName' id="companyName" placeholder='Company name' {...BusinessForm.getFieldProps('companyName')} />
                    {BusinessForm.touched.companyName && BusinessForm.errors.companyName ? (<div className='error'>{BusinessForm.errors.companyName}</div>) : null}
                </div>
                <div className="col-md-12 row" id='credentials'>
                    <label htmlFor="companyDescription" className="form-label col-2">Company Description</label>
                    <textarea className="form-control col-10" placeholder="Write about your company" name='companyDescription' id="companyDescription" {...BusinessForm.getFieldProps('companyDescription')} />
                    {BusinessForm.touched.companyDescription && BusinessForm.errors.companyDescription ? (<div className='error'>{BusinessForm.errors.companyDescription}</div>) : null}
                </div>
                <div className="col-md-12 row" id='credentials'>
                    <label className="form-label col-2" htmlFor="imageFileName">Upload your Image</label>
                    <input type="file"className="form-control col-10" name='imageFileName' id="imageFileName" onChange={(event) => BusinessForm.setFieldValue('imageFileName', event.target.files[0])} />
                    {BusinessForm.touched.imageFileName && BusinessForm.errors.imageFileName ? (<div className='error'>{BusinessForm.errors.imageFileName}</div>) : null}
                </div>
                <div className="col-md-12 row">
                    <label htmlFor="category" className="form-label col-2">Select Category</label><br />
                    <select id="category" name='category' className="form-select form-select-lg col-10" {...BusinessForm.getFieldProps('category')}>
                        <option defaultValue>Select a Category</option>
                        {
                            category.map((category) => (<option value={category} key={category}>{category}</option>))
                        }
                    </select>
                    {BusinessForm.touched.category && BusinessForm.errors.category ? (<div className='error'>{BusinessForm.errors.category}</div>) : null}
                </div>
                <div className="col-md-6" id='credentials'>
                    <label htmlFor="adrLine1" className="form-label">Address</label>
                    <input type="text" className="form-control" name='adrLine1' id="adrLine1" placeholder="1234 Main St" {...BusinessForm.getFieldProps('adrLine1')} />
                    {BusinessForm.touched.adrLine1 && BusinessForm.errors.adrLine1 ? (<div className='error'>{BusinessForm.errors.adrLine1}</div>) : null}
                </div>
                <div className="col-md-6" id='credentials'>
                    <label htmlFor="adrLine2" className="form-label">Address 2</label>
                    <input type="text" className="form-control" name='adrLine2' id="adrLine2" placeholder="Apartment, studio, or floor" {...BusinessForm.getFieldProps('adrLine2')} />
                    {BusinessForm.touched.adrLine2 && BusinessForm.errors.adrLine2 ? (<div className='error'>{BusinessForm.errors.adrLine2}</div>) : null}
                </div>
                
               
                
                <div className="col-md-4">
                    <label htmlFor="state" className="form-label">state</label>
                    <select id="state" name='state' className="form-select form-select-lg" {...BusinessForm.getFieldProps('state')} placeholder='Select a state'>
                        <option defaultValue >Select a State</option>
                        {
                            states.map((state) =>  (<option value={state} key={state}>{state}</option>))
                        }
                    </select>
                    {BusinessForm.touched.state && BusinessForm.errors.state ? (<div className='error'>{BusinessForm.errors.state}</div>) : null}
                </div>
                <div className="col-md-4">
                    <label htmlFor="city" className="form-label">City</label>
                    <select id="city" name='city' className="form-select form-select-lg" {...BusinessForm.getFieldProps('city')} placeholder='Select a City'>
                        <option defaultValue >Select a City</option>
                        {
                            cities.map((city) => (<option value={city.name} key={city.id}>{city.name}</option>))
                        }
                    </select>
                    {BusinessForm.touched.city && BusinessForm.errors.city ? (<div className='error'>{BusinessForm.errors.city}</div>) : null}
                </div>
                <div className="col-md-4">
                    <label htmlFor="pincode" className="form-label">Pincode</label>
                    <input type="text" className="form-control" name='pincode' id="pincode" {...BusinessForm.getFieldProps('pincode')}  />
                    {BusinessForm.touched.pincode && BusinessForm.errors.pincode ? (<div className='error'>{BusinessForm.errors.pincode}</div>) : null}
                </div>

                <div className="col-12 mt-2">
                    <button type="submit" className="btn" id='btn1'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}