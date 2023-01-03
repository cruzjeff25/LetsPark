import React from 'react'
import '../../../styles/admin/parkingReviews.css'


const ParkingReviews = () => {
  return (
    <div className='reviews'> 
        <h1>Parking Space Reviews</h1>
        <div className='container'>
          <div>
            <input type="text" placeholder="Search by name or rate"></input>
            <button className='search'>SEARCH</button>
            <button className='excel'>EXCEL</button>
            <button className='csv'>CSV</button>
          </div>
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Reviewer</th>
              <th>Rate</th>
              <th>Review</th>
            </tr>
            </thead>
            <hr></hr>
            <tbody>
              <tr>
                <td>123</td>
                <td>@yahoo.com</td>
                <td>najdfdjf</td>
                <td>09123456789</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ParkingReviews