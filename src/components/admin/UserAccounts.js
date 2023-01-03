import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import "../../styles/admin/useraccnts.css"

const UserAccounts = () => {
  const [isOpen, setIsOpen] = useState(false);
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
                <td>VXXq1jygjMduQlyMCtPZoDXHQWR2</td>
                <td>chuarex55@gmail.com</td>
                <td>Chua Rex</td>
                <td>09123456789
                <div className="kebab-menu">
      <button className="kebab-menu" onClick={() => setIsOpen(!isOpen)}></button>
      {isOpen && (
        <ul>
          <li><Link  className='link' to="/Admin/UserAccounts/ViewProfile" > View User Profile</Link> </li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
  )
}

export default UserAccounts 