import React from 'react'
import {Link} from 'react-router-dom'
import '../../../styles/admin/view.css'
import logo from '../../../img/logo.png'
import warning from '../../../img/attention.png'

const View = () => {
  return (

    <div className='parkingSpace'>
      <h1>PARKING SPACES</h1>

      <div className='container'>
        <h1>VIEW PARKING SPACE -</h1>

        <div className='con'>
          <div className='left-con'>
            <div className='img-con'>
              <img src={logo} alt='logo'/>
            </div>
            <label for="id">Parking Space ID</label>
            <br/>
            <input id="id" type="text" value="id123456789" readonly/>
            <br/>
            <br/>
            <label for="status">Status</label>
            <br/>
            <select id="status">
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
            <div className='confirmation'>
              <img src={warning} alt='warning' width='40px' height='40px'/>
              <p>This parking space is not yet confirmed</p>
              <p>Confirm this parking space now?</p>
              <button>Confirm</button>
            </div>
          </div>

          <div className='right-con'>

            <div className='top'>
              <div className='left'>
                <label for="address">Address</label>
                <br/>
                <input id="address" type="text" value="Address" readonly/>
                <br/>
                <br/>
                <label for="phone">Caretaker Phone Number</label>
                <br/>
                <input id="phone" type="text" value="09123456789" readonly/>
              </div>
              <div className='right'>
                <br/>
                <label for="capacity">Capacity</label>
                <br/>
                <input id="capacity" type="text" value="10" readonly/>
                <br/>
                <br/>
                <label for="basis">Basis</label>
                <br/>
                <input id="basis" type="text" value="Daily" readonly/>
                <br/>
                <br/>
              </div>
            </div>

            <div className='bottom'>
                <label for="geo">Geoposition</label>
                <br/>
                <input id="geo" type="text" value="10" readonly/>
                <br/>
                <label for="features">Features</label>
                <br/>
                <input id="features" type="text" value="CCTV" readonly/>
                <br/>
                <label for="info">Parking Space Information</label>
                <br/>
                <textarea id="info" type="text" value="Near Arca North" rows="5" cols="80" readonly/>
                <br/>
                <br/>
                <label for="rules">Rules</label>
                <br/>
                <textarea id="rules" type="text" value="Be On Time" rows="5" cols="80" readonly/>
            </div>
          </div>
        </div>
        <div className='views-nav'>
            <Link  className='link' to="ParkingSessions" > View Parking Session</Link> 
            <Link  className='link' to="ParkingReviews" > View Parking Reviews</Link> 
            <Link  className='link' to="Documents" > View Documents</Link>
          </div>
      </div>
    </div>


  )
}

export default View