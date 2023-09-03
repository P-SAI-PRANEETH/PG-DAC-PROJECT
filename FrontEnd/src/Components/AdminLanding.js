import React, { useEffect, useState } from 'react'
import BusinessService from '../service/BusinessService'
import { Link } from 'react-router-dom';
export default function AdminLanding() {
    let i = 1;
    const [businesses, setBusiness] = useState([]);
    function deleteBusinesses(id){
        BusinessService.deleteBusiness(id)
        .then((response)=>{
            console.log(response.data);
            fetchData();
            alert("Businesses is deleted successfully")
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    function fetchData() {
        BusinessService.getAllBusiness()
            .then((response) => {
                setBusiness(response.data);
            })
            .catch((error) => {
                console.log("data not found", error);
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
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            businesses.map((business) => {
                                return (
                                    <tr key={business.id}>
                                        <th scope="row">{i++}</th>
                                        <td >{business.companyName}</td>
                                        <td >{business.companyDescription}</td>
                                        <td >{business.adrLine1}{","}{business.adrLine2}{","}{business.city}{","}{business.state}{",India-"}{business.pincode}</td>
                                        <td className='d-flex'>
                                            <Link to={`/Campaign/${business.id}`} className="btn mx-2" style={{ backgroundColor: "#01BFBd", color: "white" }} >Campaigns</Link>
                                            <button className='btn btn-danger'onClick={()=>deleteBusinesses(business.id)}>Delete</button>
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

