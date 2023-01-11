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
          <input class='input1'type="text" placeholder="Search by ID or Name"></input>
          <button className='search'>SEARCH</button>
          <a button class="button" className='add'href="#add_admin">ADD ADMIN</a>
          <div id="add_admin" class="overlay">
	<div class="popup">
		<h2>ADD AN ADMIN ACCOUNT</h2>
    
		<a class="close" href="">&times;</a>
		<div class="content">
      <form>
        <div className='inputform'>
          <div class="item">
      <label>First Name:  
    <input type="text" placeholder="Enter First Name"></input>
    </label>
    </div>
    <div class="item">
    <label>Last Name:  
    <input type="text" placeholder="Enter Last Name"></input>
    </label>
    </div>

    <div class="item">
    <label>Username:  
    <input type="text" placeholder="Enter Username"></input>
    </label>
    </div>
    <div class="item">
    <label>Password:  
    <input type="password" placeholder=""></input>
    </label>
    </div>

    <div class="item">
    <label>Confirm Password:  
    <input type="password" placeholder=""></input>
    </label>
    </div>
    </div>
    <div className='button'>
    <button>Add Admin</button>
    <button >Cancel</button>
    </div>
    </form>
    
    </div>
	</div>
</div>
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
