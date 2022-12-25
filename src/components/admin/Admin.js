import { useState } from 'react'
import React from 'react'
import {Link, Outlet } from 'react-router-dom'
import "../../styles/admin/admin.css"
import logo from "../../img/logo.png"


const Admin = () => {
  const [active, setActive] = useState(false);

  return (
    <>
        <div className='sidebar'>
          
          <img src={logo} alt="logo" width="160px" height="150px"/>
          <div className='line'></div>
          <Link  className='link' to="/Admin/">Dashboard</Link> 
          <Link  className='link' to="/Admin/User Accounts">User Accounts</Link> 
          
          <div className={active ? "navSpaces_active" : "navSpaces"}>
            <Link className='parkingSpaces' onClick={() => setActive(!active) }>
            Parking Spaces
            </Link>
            <div className='spaces'>
              <Link  className='link' to="/Admin/Registered">Registered</Link> 
              <Link  className='link' to="/Admin/Pending">Pending</Link> 
            </div>
          </div>
          
          <Link  className='link' to="/Admin/Admin Accounts">Admin Accounts</Link> 
        </div>

        <div className='topbar'>
          
        </div>
        <Outlet/>

    </>

    
  )
}

export default Admin