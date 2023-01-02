import React from 'react'
import {Link} from 'react-router-dom'
import "../../../styles/admin/inprogress.css"

const InProgress = () => {
  return (
      <div className='inprogress'>
        <h1>USER ACCOUNTS</h1>
        <div className='inprogressContainer'>
        <h1>VIEW USER IN PROGRESS PARKING -</h1>
        <div className='views-nav'>
            <Link  className='link' to="/Admin/UserAccounts/ViewProfile" > Go back to Profile</Link>
            </div>
          
          <div class="fix-width">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Address</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Duration</th>
              <th>Paid Through</th>
              <th>Paid</th>
              <th>Payment Date</th>
              <th>Plate Number</th>
            </tr>
            </thead>
            <hr></hr>
            <tbody>
              <tr>
                <td>VXXq1jygjMduQlyMCtPZoDXHQWR2</td>
                <td>Arca North, Maysan, Valenzuela</td>
                <td>December 13, 2022 at 5:30 PM</td>
                <td>December 13, 2022 at 8:30 PM</td>
                <td>3 Hours</td>
                <td>Paypal</td>
                <td>P50.00</td>
                <td>December 12, 2022</td>
                <td>TEST 123</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
  
  
  )
}

export default InProgress 