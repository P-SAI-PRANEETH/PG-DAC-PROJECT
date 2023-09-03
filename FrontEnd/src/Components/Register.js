import React, { useState } from 'react'
import '../css/register.css'
import Header from './Header'
import BusinessRegister from './BusinessRegister'
import InvestorRegister from './InvestorRegister'
import { Link } from 'react-router-dom'




export default function Register() {
    const style = {
        width: '18rem'
    }
    const [brStyle,SetbrStyle]=useState({
        display:"none"
    })
    const [IrStyle,SetIrStyle] = useState({
        display:"none"
    })
    const displayBR=()=>{
        if (brStyle.display==="none") {
            SetbrStyle({
                display:"block"
            })
        }
        if(IrStyle.display==="block"){
            SetIrStyle({
                display:"none"
            })
        }
    }
    const displayIR=()=>{
        if (IrStyle.display==="none") {
            SetIrStyle({
                display:"block"
            })
        }
        if(brStyle.display==="block"){
            SetbrStyle({
                display:"none"
            })
        }
    }
    return (
        <>
            {/* <Header></Header> */}
            <div className='container' id='register-div'>
                <div className='row'>
                    <div className="card col-sm" style={style}>
                        {/* <img src="..." className="card-img-top" alt="..."> */}
                        <div className="card-body">
                        <h5 className="card-title">Business</h5>
                            <p className="card-text">We welcome businesses to sign-up and create campaigns in order to raise funds.</p>
                            <button className='btn' id='btn' onClick={displayBR}>Register</button>
                            
                        </div>
                    </div>
                    <div className="card col-sm" style={style}>
                        {/* <img src="..." className="card-img-top" alt="..."> */}
                        <div className="card-body">
                        <h5 className="card-title">Investor</h5>
                            <p className="card-text">We welcome investors to sign-up and invest into the businesses which are to ther liking, for providing support to let them grow.</p>
                            <button className='btn' id='btn' onClick={displayIR}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id='Br' style={brStyle}>
                <BusinessRegister />
            </div>
            <div id='Ir' style={IrStyle}>
                <InvestorRegister />
            </div>
        </>
    )
}
