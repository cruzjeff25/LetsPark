import React from 'react'
import {Link} from 'react-router-dom'
import '../../../styles/admin/userprofile.css'
import logo from '../../../img/logo.png'


const ViewProfile = () => {
  return (

    <div className='viewprofile'>
      <h1>USER ACCOUNTS</h1>

      <div className='container'>
        <h1>VIEW USER PROFILE -</h1>
        <div className='con'>
          <div className='right-con'>
            <div className='top'>
              <div className='left'>
                <label for="id">ID</label>
                <br/>
                <input id="id" type="text" value="VXXq1jygjMduQlyMCtPZoDXHQWR2" readonly/>
                <br/>
                <br/>
                <label for="email">Email</label>
                <br/>
                <input id="email" type="text" value="chuarex55@gmail.com" readonly/>
              </div>
              <div className='right'>
                <label for="name">Name</label>
                <br/>
                <input id="name" type="text" value="Chua Rex" readonly/>
                <br/>
                <br/>
                <label for="phone">Phone Number</label>
                <br/>
                <input id="phone" type="text" value="09123456789" readonly/>
                <br/>
                <br/>
              </div>
            </div>

            <div className='bottom'>
                <label for="owned">Spaces Owned</label>
                <br/>
                <input id="owned" type="text" value="0" readonly/>
                <br/>
            </div>
          </div>
          
          <div className='left-con'>
            <div className='img-con'>
              <img src={logo} alt='logo'/>
            </div>
          </div>
        </div>
        
        <div className='views-nav'>
            <Link  className='link' to="/Admin/UserAccounts/ViewProfile/InProgress" > View in Progress Parking</Link> 
            <Link  className='link' to="/Admin/UserProfile/Upcoming" > View Upcoming Parking</Link> 
            <Link  className='link' to="/Admin/UserProfile/History" > View Parking History</Link>
            <Link  className='link' to="/Admin/UserProfile/Spaces" > View Parking Spaces</Link>
          </div>
      </div>
    </div>


  )
}

export default ViewProfile