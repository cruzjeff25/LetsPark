import React, { useState, useRef, useEffect } from "react";
import "../../../styles/admin/registered.css";
import { RxBorderDotted, RxEnter } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { firestore } from "../../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ReactLoading from "react-loading";
import { useDownloadExcel } from "react-export-table-to-excel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FirebaseServices from "../../../services/firebase_services";

const spacesCollection = collection(firestore, "parking-spaces");

const Pending = () => {
  const location = useLocation();
  const notify = () => toast.success("Space successfully deleted!");
  const notifyApprove = () => toast.success("Parking space approved!");
  const [spaces, setSpaces] = useState([]);
  const [deleting, setDeleting] = useState();
  const [noSpaces, setNoSpaces] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndex = useRef();
  const docId = useRef("");
  const tableRef = useRef(null);

  const [deleteNotice, setDeleteNotice] = useState(false);

  const toggleDeleteNotice = () => {
    setDeleteNotice(!deleteNotice);
  };

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

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "pending-spaces",
    sheet: "Pending",
  });

  const deleteSpace = async () => {
    setDeleting(true);
    await FirebaseServices.deleteSpace(docId.current);
    setDeleting(false);
    toggleDeleteNotice();
    notify();
  };

  useEffect(() => {
    if (location.state != null) {
      notifyApprove();
    }
  }, []);

  return (
    <>
      <div className="registered">
        <h1>PENDING PARKING SPACES</h1>
        <div className="container">
          {noSpaces ? (
            <div
              style={{ textAlign: "center", fontSize: "14px", color: "gray" }}
            >
              <p>No parking space awaiting for approval.</p>
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
                  onClick={() => {
                    if (isOpen) {
                      setIsOpen(!isOpen);
                    }
                  }}
                  type="text"
                  placeholder="Search by ID or Address"
                  onChange={filterData}
                ></input>
                <button className="excel" onClick={onDownload}>
                  EXPORT TO EXCEL
                </button>
              </div>
              <table ref={tableRef}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th className="address">Address</th>
                    <th className="capacity">Capacity</th>
                    <th className="basis">Basis</th>
                    <th>Owner ID</th>
                    <th>Owner Name</th>
                  </tr>
                </thead>
                <hr></hr>
                <tbody>
                  {value.length > 0
                    ? tableFilter.map((space, index) => (
                        <tr>
                          <td>{space.id}</td>
                          <td>{space.address}</td>
                          <td>{space.capacity}</td>
                          <td>{space.dailyOrMonthly}</td>
                          <td>{space.ownerId}</td>
                          <td>
                            {space.ownerName}
                            <div className="kebab-menu">
                              <button
                                className="kebab-menu"
                                onClick={() => {
                                  docId.current = space.id;
                                  selectedIndex.current = index;
                                  setIsOpen(!isOpen);
                                }}
                              ></button>
                              {index == selectedIndex.current && isOpen && (
                                <ul>
                                  <li>
                                    <Link
                                      className="link"
                                      style={{
                                        textDecoration: "none",
                                        color: "#888888",
                                      }}
                                      to="/Admin/ParkingSpaces/Registered/ViewSpace"
                                      state={{
                                        id: docId.current,
                                        approved: false,
                                      }}
                                    >
                                      {" "}
                                      View Space
                                    </Link>{" "}
                                  </li>
                                  <li
                                    onClick={() => {
                                      setIsOpen();
                                      toggleDeleteNotice();
                                    }}
                                    style={{
                                      color: "#888888",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Delete Space
                                  </li>
                                </ul>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    : spaces.map((space, index) => (
                        <tr>
                          <td>{space.id}</td>
                          <td>{space.address}</td>
                          <td>{space.capacity}</td>
                          <td>{space.dailyOrMonthly}</td>
                          <td>{space.ownerId}</td>
                          <td>
                            {space.ownerName}
                            <div className="kebab-menu">
                              <button
                                className="kebab-menu"
                                onClick={() => {
                                  docId.current = space.id;
                                  selectedIndex.current = index;
                                  setIsOpen(!isOpen);
                                }}
                              ></button>
                              {index == selectedIndex.current && isOpen && (
                                <ul>
                                  <li>
                                    <Link
                                      className="link"
                                      style={{
                                        textDecoration: "none",
                                        color: "#888888",
                                      }}
                                      to="/Admin/ParkingSpaces/Registered/ViewSpace"
                                      state={{
                                        id: docId.current,
                                        approved: false,
                                      }}
                                    >
                                      {" "}
                                      View Space
                                    </Link>{" "}
                                  </li>
                                  <li
                                    onClick={() => {
                                      setIsOpen();
                                      toggleDeleteNotice();
                                    }}
                                    style={{
                                      color: "#888888",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Delete Space
                                  </li>
                                </ul>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </>
          )}
          <ToastContainer
            theme="colored"
            pauseOnHover={false}
            hideProgressBar={true}
          />
        </div>
      </div>
      <ToastContainer
        theme="colored"
        pauseOnHover={false}
        hideProgressBar={true}
      />
      {deleteNotice && (
        <div className="modal">
          <div
            className="overlay"
            style={{ backgroundColor: "red" }}
            onClick={toggleDeleteNotice}
          ></div>
          <div className="modal-content">
            {deleting ? (
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
                <h3>Delete space</h3>
                <br />
                <p style={{ fontSize: "14px" }}>
                  Are you sure you want to delete this space ?
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    fontSize: "14px",
                  }}
                >
                  <p
                    onClick={toggleDeleteNotice}
                    style={{
                      color: "#888888",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </p>
                  <button
                    onClick={deleteSpace}
                    style={{
                      backgroundColor: "#D22B2B",
                      color: "white",
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "12px",
                    }}
                  >
                    Delete
                  </button>
                </div>
                <button className="close-modal" onClick={toggleDeleteNotice}>
                  x
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Pending;
