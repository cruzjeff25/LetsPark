import React from 'react'
import "../../styles/admin/useraccnts.css"

const UserAccounts = () => {
  return (
      <div className='useraccnts'>
        <h1>USER ACCOUNTS</h1>
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
              <th>ID</th>
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

export default UserAccounts 