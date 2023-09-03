import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Header from "./Components/Header";
import FootWear from "./Components/category/FootWear";
import Medical from "./Components/category/Medical";
import Restaurant from "./Components/category/Restaurant";
import Carpenter from "./Components/category/Carpenter";
import Textile from "./Components/category/Textile";
import Hardware from "./Components/category/Hardware";
import AllCategory from "./Components/category/AllCategory";
import BusinessListing from "./Components/BusinessListing";
import About from "./Components/About";
import Contact from "./Components/Contact";
import PaymentGateWay from './Components/PaymentGateWay'
import Campaign from './Components/Campaign'
import BusinessLanding from "./Components/BusinessLanding";
import AdminLanding from "./Components/AdminLanding";
import InvestAmount from "./Components/InvestAmount";


function App() {
  return (
    <div className="App">

      {/* <Login></Login> */}

      <Router>
        <Header></Header>
        {/* <Register></Register> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/Campaign/:id" element={<Campaign/>}/>
          <Route path="/PaymentGateWay" element={<PaymentGateWay/>}/>
          <Route path="/BusinessLanding" element={<BusinessLanding/>}></Route>
          <Route path="/InvestAmount/:CampaignId"element={<InvestAmount/>}></Route>
          <Route path="/AdminLanding" element={<AdminLanding/>}></Route>
          <Route path="/BusinessListing"  element={<BusinessListing />}>
          <Route path="AllCategory" element={<AllCategory />}></Route>
            <Route path="Medical"  element={<Medical />}></Route>
            <Route path="Restaurant" element={<Restaurant />}></Route>
            <Route path="Carpenter" element={<Carpenter />}></Route>
            <Route path="Textile" element={<Textile />}></Route>
            <Route path="Hardware" element={<Hardware />}></Route>
            <Route path="FootWear" element={<FootWear />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
