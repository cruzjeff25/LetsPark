import React from 'react'
import '../../styles/admin/adminaccnts.css'
import "../../styles/admin/adminContainer.css"


const AdminAccnts = () => {
  return (
    <div className='adminaccnts'>
      ADMIN ACCOUNTS
      <div className='adminContainer'>
          <div>
            <input type="text" placeholder="Search by ID or Name"></input>
            <button className='search'>Search</button>
            <button className='add'>+Add Admin</button>
          </div>
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Permission</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>032145212301</td>
              <td>ricky_Admin</td>
              <td>Chua Rex</td>
              <td>True</td>
            </tr>
            <tr>
              <td>032145212301998547</td>
              <td>Pits_Admin</td>
              <td>Tits Pitoclam</td>
              <td>False</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default AdminAccnts
