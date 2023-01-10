import React, { useRef, useState } from 'react'
import '../../styles/admin/adminaccnts.css'
import "../../styles/admin/adminContainer.css"
import { firestore } from '../../firebase';
import { collection, onSnapshot } from "firebase/firestore";
import ReactLoading from 'react-loading';

const usersCollection = collection(firestore, 'admin');

const AdminAccnts = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const selectedIndex = useRef();
  const docId = useRef("");

  onSnapshot(usersCollection, (snapshot) => {
    setAdmins(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });

  return (
    <div className='adminaccnts'>
      <h1>ADMIN ACCOUNTS</h1>
      <div className='adminContainer'>
        <div>
          <input type="text" placeholder="Search by ID or Name"></input>
          <button className='search'>SEARCH</button>
          <button className='add'>ADD ADMIN</button>
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
            {admins.map((admin, index) => (
              <tr>
                <td>{admin.id}</td>
                <td>{admin.username}</td>
                <td>{admin.name}</td>
                <td>{admin.permission ? "True" : "False"}
                  <div className="kebab-menu">
                    <button className="kebab-menu" onClick={() => {
                      docId.current = admin.id;
                      selectedIndex.current = index;
                      setIsOpen(!isOpen);
                    }}></button>
                    {(index == selectedIndex.current) && isOpen && (
                      <ul>
                        <li>Disable permission</li>
                        <li>Delete admin</li>
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

export default AdminAccnts
