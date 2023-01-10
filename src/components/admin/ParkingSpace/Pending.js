import React, { useState, useRef } from 'react';
import '../../../styles/admin/registered.css'
import { RxBorderDotted, RxEnter } from 'react-icons/rx';
import { Link, useNavigate } from "react-router-dom";
import { firestore } from '../../../firebase';
import { collection, onSnapshot } from "firebase/firestore";
import ReactLoading from 'react-loading';

const spacesCollection = collection(firestore, 'parking-spaces');

const Pending = () => {

  let navigate = useNavigate();
  const [spaces, setSpaces] = useState([]);
  const [noSpaces, setNoSpaces] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = useRef();
  const docId = useRef("");

  onSnapshot(spacesCollection, (snapshot) => {
    if (snapshot.docs.length > 0) {
      setNoSpaces(false);
      let parkingSpaces = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data()["approved"] === false) {
          parkingSpaces.push({ ...doc.data(), id: doc.id });
        }
      });
      if (parkingSpaces.length > 0) {
        setSpaces(parkingSpaces);
      } else {
        setNoSpaces(true);
      }

    } else {
      setNoSpaces(true);
    }
  });

  return (
    <div className='registered'>
      <h1>REGISTERED PARKING SPACES</h1>
      <div className='container'>
        {noSpaces ?
          <div style={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
            <p>All parking spaces are approved.</p>
          </div> : spaces.length == 0 ?
            <div className='loadingContainer' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ReactLoading type={"bars"} color={"#0096FF"} height={"20px"} width={"20px"} />
            </div> : <>
              <div>
                <input type="text" placeholder="Search by ID or Address"></input>
                <button className='search'>SEARCH</button>
                <button className='excel'>EXCEL</button>
                <button className='csv'>CSV</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th className='address'>Address</th>
                    <th className='capacity'>Capacity</th>
                    <th className='basis'>Basis</th>
                    <th>Owner ID</th>
                    <th>Owner Name</th>
                  </tr>
                </thead>
                <hr></hr>
                <tbody>
                  {spaces.map((space, index) => (
                    <tr>
                      <td>PS121020216515</td>
                      <td>Arca North Maysan, Valenzuela</td>
                      <td>10</td>
                      <td>Daily</td>
                      <td>kzm5656f54sdfsdf654</td>
                      <td>Chua Rex
                        <div className="kebab-menu">
                          <button className="kebab-menu" onClick={() => {
                            docId.current = space.id;
                            selectedIndex.current = index;
                            setIsOpen(!isOpen);
                          }}></button>
                          {(index == selectedIndex.current) && isOpen && (
                            <ul>
                              <li><Link className='link' style={{ textDecoration: "none" }} to="/Admin/ParkingSpaces/Registered/ViewSpace" state={{ id: docId.current, approved: false }}> View Space</Link> </li>
                              <li><Link className='link' style={{ textDecoration: "none" }} to="/Admin/ParkingSpaces/Registered/ViewSpace" state={{ id: docId.current, approved: false }}> Edit Space</Link></li>
                              <li>Delete Space</li>
                            </ul>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
        }
      </div>
    </div>
  )
}

export default Pending;