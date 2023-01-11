import React, { useRef, useState } from "react";
import "../../../styles/admin/registered.css";
import { useLocation } from "react-router-dom";
import { firestore } from "../../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ReactLoading from "react-loading";
import { useDownloadExcel } from "react-export-table-to-excel";
import { tab } from "@testing-library/user-event/dist/tab";

const spacesCollection = collection(firestore, "parking-spaces");

const OwnedSpaces = () => {
  const location = useLocation();
  const [spaces, setSpaces] = useState([]);
  const [noSpaces, setNoSpaces] = useState(false);
  const tableRef = useRef(null);

  onSnapshot(spacesCollection, (snapshot) => {
    if (snapshot.docs.length > 0) {
      setNoSpaces(false);
      let parkingSpaces = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data()["ownerId"] === location.state.id) {
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

  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value !== "") {
      setValue(e.target.value);
      const filterTable = spaces.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setSpaces([...spaces]);
    }
  };

  return (
    <div className="registered">
      <h1>USER ACCOUNTS</h1>
      <div className="container">
        <h1>VIEW USER OWNED SPACES-({location.state.name})</h1>
        <br />
        {noSpaces ? (
          <div style={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
            <p>No owned parking spaces.</p>
          </div>
        ) : spaces.length == 0 ? (
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
            <div>
              <input
                type="text"
                placeholder="Search by ID or Address"
                onChange={filterData}
              ></input>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th className="address">Address</th>
                  <th className="capacity">Capacity</th>
                  <th className="basis">Basis</th>
                  <th>Approved</th>
                </tr>
              </thead>
              <hr></hr>
              <tbody>
                {value.length > 0
                  ? tableFilter.map((space) => (
                      <tr>
                        <td>{space.id}</td>
                        <td>{space.address}</td>
                        <td>{space.capacity}</td>
                        <td>{space.dailyOrMonthly}</td>
                        <td>
                          {space.approved ? "Approved" : "Not approved yet"}
                        </td>
                      </tr>
                    ))
                  : spaces.map((space) => (
                      <tr>
                        <td>{space.id}</td>
                        <td>{space.address}</td>
                        <td>{space.capacity}</td>
                        <td>{space.dailyOrMonthly}</td>
                        <td>
                          {space.approved ? "Approved" : "Not approved yet"}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default OwnedSpaces;
