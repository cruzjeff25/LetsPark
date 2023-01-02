import React from 'react'
import "../../styles/admin/useraccnts.css"

const UserAccnts = () => {
  return (
      <div className='useraccnts'>
        <h1>User Accounts</h1>
        <div className='userContainer'>
          <div>
            <input type="text" placeholder="Search by id, name, phone number"></input>
            <button className='search'>SEARCH</button>
            <button className='excel'>EXCEL</button>
            <button className='csv'>CSV</button>
          </div>

          <table>
            <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone Number</th>
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

export default UserAccnts 