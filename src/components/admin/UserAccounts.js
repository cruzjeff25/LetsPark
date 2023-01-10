import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import "../../styles/admin/useraccnts.css"
import { firestore } from '../../firebase';
import { collection, onSnapshot } from "firebase/firestore";
import ReactLoading from 'react-loading';

const usersCollection = collection(firestore, 'user-data');

const UserAccounts = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [noAccounts, setNoAccounts] = useState(false);
  const selectedIndex = useRef();
  const docId = useRef("");

  onSnapshot(usersCollection, (snapshot) => {

    if (snapshot.docs.length > 0) {
      setNoAccounts(false);
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUsers(data);
    } else {
      setNoAccounts(true);
    }

  });

  

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
            {noAccounts ? <tr>
              <td colSpan={4}>
                No registered accounts.
              </td>
            </tr> : users.length == 0 ?
              <tr>
                <td colSpan={4}>
                  <div className='loadingContainer' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ReactLoading type={"bars"} color={"#0096FF"} height={"20px"} width={"20px"} />
                  </div>
                </td>
              </tr> : users.map((user, index) => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.phoneNumber}
                    <div className="kebab-menu">
                      <button className="kebab-menu" onClick={() => {
                        docId.current = user.id;
                        selectedIndex.current = index;
                        setIsOpen(!isOpen);
                      }}></button>
                      {(index == selectedIndex.current) && isOpen && (
                        <ul>
                          <li><Link className='link' style={{textDecoration: "none"}} to="/Admin/UserAccounts/ViewProfile" state={{ id: docId.current }}> View User Profile</Link> </li>
                          <li><Link className='link' style={{textDecoration: "none"}} to="/Admin/UserAccounts/ViewProfile" state={{ id: docId.current }}> Edit User</Link></li>
                          <li>Delete User</li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>
    </div>

  )
}

export default UserAccounts 