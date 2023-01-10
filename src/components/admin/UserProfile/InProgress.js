import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "../../../styles/admin/inprogress.css"
import { firestore } from '../../../firebase';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import ReactLoading from 'react-loading';

const InProgress = () => {

  const location = useLocation();
  const userParkingsCollection = collection(firestore, `user-data/${location.state.id}/user-parkings`);
  const [inProgressParkings, setInProgressParkings] = useState([]);
  const [noInProgress, setNoInProgress] = useState(false);

  onSnapshot(userParkingsCollection, (snapshot) => {
    if (snapshot.docs.length > 0) {
      setNoInProgress(false);
      let inProgress = [];
      let now = new Date().getTime();
      snapshot.docs.forEach((doc) => {
        if (doc.data()["inProgress"] === true && (now >= doc.data()["arrival"] && now < doc.data()["departure"])) {
          inProgress.push({ ...doc.data(), id: doc.id });
        }
      });
      if (inProgress.length > 0) {
        setInProgressParkings(inProgress);
      } else {
        setNoInProgress(true);
      }

    } else {
      setNoInProgress(true);
    }

  });

  function getDate(date) {
    return new Date(date).toDateString() + ", " + new Date(date).toLocaleTimeString();
  }
  return (
    <div className='inprogress'>
      <h1>USER ACCOUNTS</h1>
      <div className='inprogressContainer'>
        <h1>VIEW USER IN PROGRESS PARKING-({location.state.name})</h1>
        <br />
        <div>
          <input type="text" placeholder="Search by ID or Address"></input>
          <button className='search'>SEARCH</button>
        </div>
        {/* <div className='views-nav'>
          <Link className='link' to="/Admin/UserAccounts/ViewProfile" > Go back to Profile</Link>
        </div> */}
        <br />
        {noInProgress ?
          <div style={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
            <p>No in progress parkings.</p>
          </div> : inProgressParkings.length == 0 ?
            <div className='loadingContainer' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ReactLoading type={"bars"} color={"#0096FF"} height={"20px"} width={"20px"} />
            </div> : <div class="fix-width">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Address</th>
                    <th>Arrival</th>
                    <th>Departure</th>
                    <th>Duration</th>
                    <th>Paid Through</th>
                    <th>Paid</th>
                    <th>Payment Date</th>
                    <th>Plate Number</th>
                  </tr>
                </thead>
                <hr></hr>
                <tbody>
                  {inProgressParkings.map((parking) => (
                    <tr>
                      <td>{parking.parkingId}</td>
                      <td>{parking.address}</td>
                      <td>{getDate(parking.arrival)}</td>
                      <td>{getDate(parking.departure)}</td>
                      <td>{parking.duration}</td>
                      <td>Paypal</td>
                      <td>P{parking.price}.00</td>
                      <td>{getDate(parking.paymentDate)}</td>
                      <td>{parking.plateNumber}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
        }
      </div>
    </div>
  )
}

export default InProgress 