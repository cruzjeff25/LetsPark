import { useState } from 'react'
import React from 'react'
import {Link, Outlet } from 'react-router-dom'
import "../../styles/admin/admin.css"
import logo from "../../img/logo.png"
import { GoDashboard } from "react-icons/go";
import { BiUser } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import {  TbParking } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";


const Admin = () => {
  // parking space drop down
  const [active, setActive] = useState(false);

  return (
    <>
        <div className='sidebar'>
          
          <img src={logo} alt="logo" width="60%" height="20%"/>
          <div className='line'></div>
          <Link  className='link' to="/Admin/Dashboard" ><GoDashboard/>   Dashboard</Link> 
          <Link  className='link' to="/Admin/UserAccounts" ><BiUser/>   User Accounts</Link> 
          
          {/* parking space drop down */}
          <div className={active ? "navSpaces_active" : "navSpaces"}>
            <Link className='link' onClick={() => {setActive(!active)}}>
            <TbParking/>   Parking Spaces
            </Link>
            <div className='spaces'>
              <Link  className='link' to="/Admin/ParkingSpaces/Registered">Registered</Link> 
              <Link  className='link' to="/Admin/ParkingSpaces/Pending">Pending</Link> 
            </div>
          </div>
          
          <Link  className='link' to="/Admin/AdminAccounts"><RiAdminLine/>   Admin Accounts</Link> 
        </div>

        <div className='topbar'>
          <h1><FaUserAlt/> JUAN MAMA</h1>
        </div>
        <Outlet/>

    </>

    
  )
}

export default Admin