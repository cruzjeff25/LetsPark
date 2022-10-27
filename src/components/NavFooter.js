import React from 'react'
import {Outlet, Link } from 'react-router-dom'
import "../styles/style.css"
import logo from "../img/logo.png"
import apk from "../LetsPark.apk"
import privacy from "../privacy.pdf"

const NavFooter = () => {
  return (
    <>
    <nav className='nav'>
    <Link to="/">
      <div className='logo'>
        <img src={logo} alt="logo" width="120px"/>
        <h1>Let's Park!</h1>
      </div>
    </Link>
    <button><a href={apk} download>Download</a></button>
  </nav>
  <Outlet />

  <footer>
        <div className='con-1'>
          <div className='column1'>
            <Link className='logo' to="/">
              <img src={logo} alt="logo" width="200px"/>
              <h1>Let's Park!</h1>
            </Link>
          </div>
          <div className='column2'>
            <ul>
              <li>
                <a href={privacy} target='_blank' className='link'>Privacy Policy</a>
              </li>
              <li>
                <Link  className='link' to="/Terms & Conditions">Terms and Conditions</Link>
              </li>
              <li>
                <Link  className='link' to="/Guidelines">Guidelines</Link>
              </li>
              <button><a href={apk} download>Download</a></button>
            </ul>
          </div>
        </div>
        <div className='con-2'>
          <div>
            <p>Let's Park is an app developed by four students from Pamantasan ng Lungsod ng Valenzuela</p>
          </div>
          <div>
            <p>&#169; Copyright Let's Park! 2022</p>
          </div>
        </div>
      </footer>
  </>
  
  )
}

export default NavFooter