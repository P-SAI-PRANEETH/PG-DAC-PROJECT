
import React, { useState, useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom";
import PaymentGateWay from "./PaymentGateWay";
import { useNavigate } from 'react-router-dom';
import BusinessService from "../service/BusinessService";
import { useFormik } from "formik";
import * as yup from 'yup'
import '../css/BusinessLanding.css'

export default function NewCampaign() {
    let i = 1;
    let userDetails;
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [id, setId] = useState(0);

    const campaignForm = useFormik({
        initialValues: {
            title: '',
            description: '',
            goalAmount: '',
            startDate: '',
            endDate: ''
        },
        onSubmit: (values) => {
            console.log(values);
            storeCampaign(values);
            fetchData(userDetails.id);

        },
        validationSchema: yup.object({
            title: yup.string().required("Title is mandatory!"),
            description: yup.string().required("Description is mandatory!"),
            goalAmount: yup.number().required("Goal amount is mandatory!"),
            startDate: yup.date().required("Start Date is mandatory!"),
            endDate: yup.date().required("End date is mandatory!")
        })
    })

    function handleSubmit() {
        if (flag)
            navigate("/InvestAmount")
        else navigate("/Login")
    }
    function storeCampaign(formDetails) {
        
        BusinessService.createCampaign(id, formDetails)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log("data not found", error)
            })
    }
    function fetchData(businessId) {

        BusinessService.getCampaignsForBusiness(businessId)
            .then((response) => {
                console.log(response.data);
                setCampaigns(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        userDetails = JSON.parse(localStorage.getItem("userDetail"));
        setId(userDetails.id);
        fetchData(userDetails.id);
    }, [campaigns])



    return (
        <>
            <h2>Campaigns</h2>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Goal Amount</th>
                            <th scope="col">Current Amount</th>
                            <th scope="col">Start Date</th>
                            <th scope="col" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            campaigns.map((campaign) => {
                                return (
                                    <tr key={campaign.id}>
                                        <th scope="row">{i++}</th>
                                        <td >{campaign.title}</td>
                                        <td >{campaign.description}</td>
                                        <td >{campaign.goalAmount}</td>
                                        <td >{campaign.currentAmount}</td>
                                        <td >{campaign.startDate}</td>
                                        <td>
                                            <Link to="/PaymentGateWay" className="btn" style={{ backgroundColor: "#01BFBd", color: "white" }} onClick={() => handleSubmit()}>Invest</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <h2 className="myHeading">Create New Campaign</h2>
            <div className="container">
          
                <form className=" myHeading w-50" onSubmit={campaignForm.handleSubmit}>
                    <div className="col-md-12 row mb-3">
                        <label for="title" className="form-label col-2">Title</label>
                        <input type="text" className="form-control col-10" id="title" name="title" aria-describedby="title" {...campaignForm.getFieldProps('title')} />
                        {campaignForm.touched.title && campaignForm.errors.title ? (<div className="text-danger">{campaignForm.errors.title}</div>) : null}
                    </div>
                    <div className="col-md-12 row mb-3 my-2">
                        <label for="description" className="form-label col-2">Description</label>
                        <textarea className="form-control col-10" name="description" id="description" {...campaignForm.getFieldProps('description')} />
                        {campaignForm.touched.description && campaignForm.errors.description ? (<div className="text-danger">{campaignForm.errors.description}</div>) : null}
                    </div>
                    <div className="col-md-12 row">
                        <label for="goalAmount" className="form-label col-2">Goal Amount</label>
                        <input type="number" className="form-control col-10" name="goalAmount" id="goalAmount" {...campaignForm.getFieldProps('goalAmount')} />
                        {campaignForm.touched.goalAmount && campaignForm.errors.goalAmount ? (<div className="text-danger">{campaignForm.errors.goalAmount}</div>) : null}
                    </div>
                    <div className="col-md-12 row">
                        <label for="startDate" className="form-label col-2">Start Date</label>
                        <input type="date" className="form-control col-10" name="startDate" id="startDate" {...campaignForm.getFieldProps('startDate')} />
                        {campaignForm.touched.startDate && campaignForm.errors.startDate ? (<div className="text-danger">{campaignForm.errors.startDate}</div>) : null}
                    </div>
                    <div className="col-md-12 row">
                        <label for="endDate" className="form-label col-2">End Date</label>
                        <input type="date" className="form-control col-10" name="endDate" id="endDate" {...campaignForm.getFieldProps('endDate')} />
                        {campaignForm.touched.endDate && campaignForm.errors.endDate ? (<div className="text-danger">{campaignForm.errors.endDate}</div>) : null}
                    </div>
                    <div className="col-12 mt-2">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}