import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/admin/inprogress.css";
import { firestore } from "../../../firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import ReactLoading from "react-loading";
import { useDownloadExcel } from "react-export-table-to-excel";

const History = () => {
  const location = useLocation();
  const userParkingsCollection = collection(
    firestore,
    `user-data/${location.state.id}/user-parkings`
  );
  const [historyParkings, setHistoryParkings] = useState([]);
  const [noHistory, setNoHistory] = useState(false);
  const tableRef = useRef(null);

  onSnapshot(userParkingsCollection, (snapshot) => {
    if (snapshot.docs.length > 0) {
      setNoHistory(false);
      let history = [];
      let now = new Date().getTime();
      snapshot.docs.forEach((doc) => {
        if (doc.data()["departure"] <= now) {
          history.push({ ...doc.data(), id: doc.id });
        }
      });
      if (history.length > 0) {
        setHistoryParkings(history);
      } else {
        setNoHistory(true);
      }
    } else {
      setNoHistory(true);
    }
  });

  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value !== "") {
      setValue(e.target.value);
      const filterTable = historyParkings.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setHistoryParkings([...historyParkings]);
    }
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `history-sessions-user${location.state.id}`,
    sheet: "History",
  });

  function getDate(date) {
    return (
      new Date(date).toDateString() + ", " + new Date(date).toLocaleTimeString()
    );
  }
  return (
    <div className="inprogress">
      <h1>USER ACCOUNTS</h1>
      <div className="inprogressContainer">
        <h1>VIEW USER PARKING HISTORY-({location.state.name})</h1>
        <br />
        {/* <div className='views-nav'>
          <Link className='link' to="/Admin/UserAccounts/ViewProfile" > Go back to Profile</Link>
        </div> */}
        <br />
        {noHistory ? (
          <div style={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
            <p>No finished parking sessions.</p>
          </div>
        ) : historyParkings.length == 0 ? (
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
                type="text"
                placeholder="Search by ID or Address"
                onChange={filterData}
              ></input>
              <button className="search" onClick={onDownload}>
                EXPORT TO EXCEL
              </button>
            </div>
            <div class="fix-width">
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
                    : historyParkings.map((parking) => (
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

export default History;
