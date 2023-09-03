import React, { useEffect } from 'react'
import Header from './Header'
import img1 from '../Images/img6.png'
import img2 from '../Images/img5.jpg'
import img3 from '../Images/img3.jpg'
import '../css/homepage.css'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import carpenter from '../Images/carpenter.jpg'
import BusinessService from '../service/BusinessService';
import { Link } from 'react-router-dom'
import "../css/homepage.css"

export default function HomePage() {
    const [index, setIndex] = useState(0);
    let i;
    const [businesses, setBusinesses] = useState([]);
    for (i = 3; i < businesses.length; i++) {
        businesses.pop();
    }
    function fetchData() {
        BusinessService.getAllBusiness()
            .then((response) => {
                console.log(response.data);
                setBusinesses(response.data);
            })
            .catch((error) => {
                console.log("data not found", error);
            })
    }
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div id='cardiv'>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img src={img1} id='imgcar' />
                    <Carousel.Caption>
                        <div id='box'>
                        <h3>Vision</h3>
                            <p>To democratize access to capital and provide an alternative source of funding for individuals, organizations, and businesses to fund their projects, ventures, or causes by engaging the crowd.</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={img2} id='imgcar' />
                    <Carousel.Caption>
                        <div id='box'>
                        <h3>Innovation</h3>
                            <p>Our aim is to facilitate innovation and creativity by providing an alternative approach to finance that challenges traditional funding models.</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={img3} id='imgcar' />
                    <Carousel.Caption>
                        <div id='box'>
                        <h3>Mission</h3>
                            <p>To provide a platform for individuals and organizations to raise funds for their projects, ventures, or causes.</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            {/* main-div */}
            <div className="col-12 main-div1" >
                {
                    businesses.map((business) => {
                        return (
                          
                                <div className="card"key={business.id} >
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
        </div>
    )
}
