import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BusinessService from '../../service/BusinessService';
import { useNavigate } from 'react-router-dom';
const AllCategory = () => {
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([]);
    let image;

    function fetchData() {
        BusinessService.getAllBusiness()
            .then((response) => {
                console.log(response.data);
                setBusinesses(response.data);
            })
            .catch((err) => {
                console.log("Data not found", err);

            })
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
            <div className="col-8  main-div" >
                {
                    businesses.map((business) => {
                        return (

                            <div className="card" key={business.id}>
                                <img className="card-img-top" src={`data:image/png;base64,${business.arr}`} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{business.companyName}</h5>
                                    <p className="card-text">{business.companyDescription}</p>
                                    <Link to={`/Campaign/${business.id}`} className="btn btn-primary">Browse Campaigns</Link>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </>
    )
}
export default AllCategory;