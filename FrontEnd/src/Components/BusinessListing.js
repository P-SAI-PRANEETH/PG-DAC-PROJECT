import React from "react";
import "../css/BusinessListing.css"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AllCategory from "./category/AllCategory";
import FootWear from "./category/FootWear";
import Medical from "./category/Medical";
import Restaurant from "./category/Restaurant";
import Carpenter from "./category/Carpenter";
import Hardware from "./category/Hardware";
import Textile from "./category/Textile";
const BusinessListing = () => {
    const myStyles = {
        height: "25%",
        color: "red"
    };
    return (
        <>
            <div className="container ">
                <div className="d-flex" >
                    <div className="col-2 sub-div p-3 " >
                        <p className="font-weight-bold" >CATEGORIES</p>
                        <hr/>
                        <Link to="AllCategory" className="d-block mb-2 text-decoration-none">
                            <span>
                            All Categories
                            </span>
                            
                        </Link>
                        <Link to="FootWear" className="d-block mb-2 text-decoration-none">
                            <span>FootWear</span>
                        </Link>
                        <Link to="Medical" className="d-block mb-2 text-decoration-none">
                            <span>Medical</span>
                        </Link>
                        <Link to="Restaurant" className="d-block mb-2 text-decoration-none">
                            <span>Restaurants</span>
                        </Link>
                        <Link to="Carpenter" className="d-block mb-2 text-decoration-none">
                            <span>Carpenters</span>
                        </Link>
                        <Link to="Textile" className="d-block mb-2 text-decoration-none">
                            <span>Textile</span>
                        </Link>
                        <Link to="Hardware" className="d-block mb-2 text-decoration-none">
                            <span>Hardware</span>
                        </Link>

                    </div>
                    <Routes>
                       <Route path="/" element={<AllCategory />}></Route>
                       <Route path="AllCategory" element={<AllCategory />}></Route>
                        <Route path="FootWear" element={<FootWear />}></Route>
                        <Route path="Medical" element={<Medical />}></Route>
                        <Route path="Restaurant" element={<Restaurant />}></Route>
                        <Route path="Carpenter" element={<Carpenter />}></Route>
                        <Route path="Textile" element={<Textile />}></Route>
                        <Route path="Hardware" element={<Hardware />}></Route>
                    </Routes>

                </div>
            </div>
        </>
    )

}
export default BusinessListing;
