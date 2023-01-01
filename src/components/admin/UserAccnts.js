import React from 'react'
import "../../styles/admin/useraccnts.css"
import "../../styles/admin/userContainer.css"

const UserAccnts = () => {
  return (
      <div className='useraccnts'>
        User Accounts
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
          </table>
        </div>
      </div>
  
  )
}

export default UserAccnts 