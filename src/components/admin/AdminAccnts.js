import React, {useState} from 'react'
import '../../styles/admin/adminaccnts.css'
import "../../styles/admin/adminContainer.css"


const AdminAccnts = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='adminaccnts'>
      <h1>ADMIN ACCOUNTS</h1>
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
              <td>True
              <div className="kebab-menu">
      <button className="kebab-menu" onClick={() => setIsOpen(!isOpen)}></button>
      {isOpen && (
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
              </td>
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
