import React from 'react'
import '../css/Contact.css'
import { useFormik } from 'formik'
import * as yup from 'yup'

export default function Contact() {
    const ContactForm = useFormik({
        initialValues: {
            name:'',
            email:'',
            subject:'',
            message:''
        },
        onSubmit:(values)=>{},
        validationSchema: yup.object({
            name: yup.string().required('Name field is mandatory!'),
            email: yup.string().email('Invalid email format!').required('Email field is mandatory!'),
            subject: yup.string().required('Subject field is mandatory!'),
            message: yup.string().required('Message field is mandatory!')
        })
    })
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center" data-aos="fade-up" id='info'>
                    <div className="col-lg-10">
                        <div className="info-wrap">
                            <div className="row">
                            <div className="col-lg-4 info">
                                    <i className="bi bi-geo-alt"></i>
                                    <h4>Location:</h4>
                                    <p>17/3, Madhukunj Society <br />Pune, Maharashtra</p>
                                </div>

                                <div className="col-lg-4 info mt-4 mt-lg-0">
                                    <i className="bi bi-envelope"></i>
                                    <h4>Email:</h4>
                                    <p>funds2raise.support@gmail.com<br />funds2raise.admin@gmail.com</p>
                                </div>

                                <div className="col-lg-4 info mt-4 mt-lg-0">
                                    <i className="bi bi-phone"></i>
                                    <h4>Call:</h4>
                                    <p>+91 9315093424<br />+91 6304221439</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='contact-form'>
                    <form action="" onSubmit={ContactForm.handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 form-group">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required {...ContactForm.getFieldProps('name')}/>
                                {ContactForm.touched.name && ContactForm.errors.name ? (<div classNameName='error'>{ContactForm.errors.name}</div>):null}
                            </div>
                            <div className="col-md-6 form-group">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required {...ContactForm.getFieldProps('email')}/>
                                {ContactForm.touched.email && ContactForm.errors.email ? (<div classNameName='error'>{ContactForm.errors.email}</div>):null}
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required {...ContactForm.getFieldProps('subject')}/>
                            {ContactForm.touched.subject && ContactForm.errors.subject ? (<div classNameName='error'>{ContactForm.errors.subject}</div>):null}
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" name="message" rows="5" placeholder="Message" required {...ContactForm.getFieldProps('message')}></textarea>
                            {ContactForm.touched.message && ContactForm.errors.message ? (<div classNameName='error'>{ContactForm.errors.message}</div>):null}
                        </div>
                        <div>
                            <a href="#" className="btn" id='btn'>Submit</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
