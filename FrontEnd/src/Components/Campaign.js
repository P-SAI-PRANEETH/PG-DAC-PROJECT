import React, { useState, useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom";
import PaymentGateWay from "./PaymentGateWay";
import { useNavigate } from 'react-router-dom';
import BusinessService from "../service/BusinessService";
const Campaign = () => {
    const [flag, setFlag] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    let i = 1;
    console.log(useParams())
    function handleSubmit(id) {
        if (localStorage.getItem("userDetail")) {
            navigate(`/InvestAmount/${id}`);
        }
        else {
            alert("You are not logged in,Pleases login first");
            navigate("/Login");
        }
    }
    function fetchData() {
        BusinessService.getCampaignsForBusiness(id)
            .then((response) => {
                setCampaigns(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log("data not found", error)
            })
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
            <div className="container">
                <table class="table">
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
                                    <tr key={campaign.campaignId}>
                                        <th scope="row">{i++}</th>
                                        <td >{campaign.title}</td>
                                        <td >{campaign.description}</td>
                                        <td >{campaign.goalAmount}</td>
                                        <td >{campaign.currentAmount}</td>
                                        <td >{campaign.startDate}</td>
                                        <td>
                                         <button className="btn"style={{ backgroundColor: "#01BFBd", color: "white" }} onClick={() => handleSubmit(campaign.campaignId)}>Invest</button>
                                            {/* <Link to={`/InvestAmount/${campaign.campaignId}`} className="btn" style={{ backgroundColor: "#01BFBd", color: "white" }}onClick={() => handleSubmit()}>Invest</Link> */}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Campaign;