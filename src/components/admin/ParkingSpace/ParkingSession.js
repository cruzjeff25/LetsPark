import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/admin/inprogress.css";
import { firestore } from "../../../firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import ReactLoading from "react-loading";
import { useDownloadExcel } from "react-export-table-to-excel";

const ParkingSession = () => {
  const location = useLocation();
  const parkingSessionCollection = collection(
    firestore,
    `parking-spaces/${location.state.id}/parking-sessions`
  );
  const [sessions, setSessions] = useState([]);
  const [noSessions, setNoSessions] = useState(false);
  const tableRef = useRef(null);

  onSnapshot(parkingSessionCollection, (snapshot) => {
    if (snapshot.docs.length > 0) {
      setNoSessions(false);
      setSessions(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
      setNoSessions(true);
    }
  });

  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value !== "") {
      setValue(e.target.value);
      const filterTable = sessions.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setNoSessions([...sessions]);
    }
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `parking-sessions-${location.state.id}`,
    sheet: "Parking Sessions",
  });

  function getDate(date) {
    return (
      new Date(date).toDateString() + ", " + new Date(date).toLocaleTimeString()
    );
  }

  return (
    <div className="inprogress">
      <h1>REGISTERED SPACES</h1>
      <div className="inprogressContainer">
        <h1>VIEW SPACE PARKING SESSIONS-({location.state.id})</h1>
        <br />
        {/* <div className='views-nav'>
          <Link className='link' to="/Admin/UserAccounts/ViewProfile" > Go back to Profile</Link>
        </div> */}
        {noSessions ? (
          <div style={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
            <p>No parking sessions yet.</p>
          </div>
        ) : sessions.length == 0 ? (
          <div
            className="loadingContainer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ReactLoading
              type={"bars"}
              color={"#0096FF"}
              height={"20px"}
              width={"20px"}
            />
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                onChange={filterData}
                type="text"
                placeholder="Search by id, name, phone number"
              ></input>
              {/* <button className="search">SEARCH</button> */}
              <button className="excel" onClick={onDownload}>
                EXPORT TO EXCEL
              </button>
            </div>
            <br />
            <div class="fix-width">
              <table ref={tableRef}>
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
                  {value.length > 0
                    ? tableFilter.map((parking) => (
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
                      ))
                    : sessions.map((parking) => (
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
          </>
        )}
      </div>
    </div>
  );
};

export default ParkingSession;
