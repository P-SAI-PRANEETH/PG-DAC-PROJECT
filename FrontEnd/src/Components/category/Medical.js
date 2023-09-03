import React, { useEffect, useState } from 'react';
import BusinessService from '../../service/BusinessService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Medical=()=>{
    const navigate=useNavigate();
    const [businesses,setBusinesses]=useState([]);
    function handleNavigation(id) {
        if (localStorage.getItem("userDetail")) {
            navigate(`/Campaign/${id}`);
        }
        else {
            alert("You are not logged in,Pleases login first");
            navigate("/Login");
        }
    }
    function fetchData(){
        BusinessService.getBusinessesForCategory("Medical")
        .then((response)=>{
            setBusinesses(response.data)
            console.log(response.data);
        })
        .catch((error)=>{
            console.log("data not found",error)
        })
    }
    useEffect(()=>{
        fetchData();
    },[])
    return(
        <>
        <div className="col-8  main-div" >
            {
                businesses.map((business) => {
                    return (
                       
                            <div className="card"key={business.id}  >
                                <img className="card-img-top" src={`data:image/png;base64,${business.arr}`} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{business.companyName}</h5>
                                    <p className="card-text">{business.companyDescription}</p>
                                    <Link to={`/Campaign/${business.id}`} className="btn btn-primary">Browse Campaigns</Link>
                                    {/* <button className="btn btn-primary" onClick={() => handleNavigation(business.id)}>Browse Campaigns</button> */}
                                </div>
                            </div>
                       
                    )
                })
            }
            </div>
        </>
    )
}
export default Medical;