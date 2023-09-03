import React from 'react'
import logo from '../Images/White-logo.png'
import '../css/Header.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem("userDetail");
        alert("Thank You");
        navigate("/Login");
    }
    return (
        <div id='header-div'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                 
                <img src={logo} width='5%' />
                    <Link to="/"className="navbar-brand text-white"> 
                    
                    Funds2Raise</Link>
                   
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={`/`} className='text-decoration-none nav-link active text-white'>
                                  Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/BusinessListing`} className='text-decoration-none nav-link text-white'>
                                   Browse_Business
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/Contact`} className='text-decoration-none nav-link text-white'>
                            Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/Register`} className='text-decoration-none nav-link text-white'>
                                  Register
                                </Link>
                            </li>
                           

                            {
                                localStorage.getItem("userDetail") ? (
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="#" onClick={handleLogout}>Logout</a>

                                    </li>
                                ) : (
                                    <li className="nav-item">
                                    <Link to={`/Login`} className='text-decoration-none nav-link text-white'>
                                      Login
                                    </Link>
                                </li>
                                )
                            }
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}
