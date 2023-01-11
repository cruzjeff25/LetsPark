import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/admin/useraccnts.css";
import { firestore } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ReactLoading from "react-loading";
import { useDownloadExcel } from "react-export-table-to-excel";
import FirebaseServices from "../../services/firebase_services";

const usersCollection = collection(firestore, "user-data");

const UserAccounts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [noAccounts, setNoAccounts] = useState(false);
  const selectedIndex = useRef();
  const docId = useRef("");
  const tableRef = useRef(null);
  const [deleting, setDeleting] = useState();
  const [deleteNotice, setDeleteNotice] = useState(false);
  const toggleDeleteNotice = () => {
    setDeleteNotice(!deleteNotice);
  };

  onSnapshot(usersCollection, (snapshot) => {
    if (snapshot.docs.length > 0) {
      setNoAccounts(false);
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({
          Name: doc.data()["name"],
          Email: doc.data()["email"],
          Phone: doc.data()["phoneNumber"],
          id: doc.id,
        });
      });
      setUsers(data);
    } else {
      setNoAccounts(true);
    }
  });

  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value !== "") {
      setValue(e.target.value);
      const filterTable = users.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setUsers([...users]);
    }
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "users",
    sheet: "Users",
  });

  const deleteUser = async () => {
    setDeleting(true);
    await FirebaseServices.deleteUser(docId.current);
    setDeleting(false);
    toggleDeleteNotice();
  };

  return (
    <>
      <div className="useraccnts">
        <h1>USER ACCOUNTS</h1>
        <div className="userContainer">
          <div>
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

          <table ref={tableRef}>
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
              {noAccounts ? (
                <tr>
                  <td colSpan={4}>No registered accounts.</td>
                </tr>
              ) : users.length == 0 ? (
                <tr>
                  <td colSpan={4}>
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
                  </td>
                </tr>
              ) : value.length > 0 ? (
                tableFilter.map((user, index) => (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.Email}</td>
                    <td>{user.Name}</td>
                    <td>
                      {user.Phone}
                      <div className="kebab-menu">
                        <button
                          className="kebab-menu"
                          onClick={() => {
                            docId.current = user.id;
                            selectedIndex.current = index;
                            setIsOpen(!isOpen);
                          }}
                        ></button>
                        {index == selectedIndex.current && isOpen && (
                          <ul>
                            <li>
                              <Link
                                className="link"
                                style={{ textDecoration: "none" }}
                                to="/Admin/UserAccounts/ViewProfile"
                                state={{ id: docId.current }}
                              >
                                {" "}
                                View User Profile
                              </Link>{" "}
                            </li>
                            <li>
                              <Link
                                className="link"
                                style={{ textDecoration: "none" }}
                                to="/Admin/UserAccounts/ViewProfile"
                                state={{ id: docId.current }}
                              >
                                {" "}
                                Edit User
                              </Link>
                            </li>
                            <li>Delete User</li>
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                users.map((user, index) => (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.Email}</td>
                    <td>{user.Name}</td>
                    <td>
                      {user.Phone}
                      <div className="kebab-menu">
                        <button
                          className="kebab-menu"
                          onClick={() => {
                            docId.current = user.id;
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
                                to="/Admin/UserAccounts/ViewProfile"
                                state={{ id: docId.current, isEdit: false }}
                              >
                                {" "}
                                View User Profile
                              </Link>{" "}
                            </li>
                            <li>
                              <Link
                                className="link"
                                style={{
                                  textDecoration: "none",
                                  color: "#888888",
                                }}
                                to="/Admin/UserAccounts/ViewProfile"
                                state={{ id: docId.current, isEdit: true }}
                              >
                                {" "}
                                Edit User
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                setIsOpen();
                                toggleDeleteNotice();
                              }}
                              style={{ color: "#888888", cursor: "pointer" }}
                            >
                              Delete User
                            </li>
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
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
                <h3>Delete user ?</h3>
                <br />
                <p style={{ fontSize: "14px" }}>
                  Are you sure you want to remove or delete this user ?
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
                    onClick={deleteUser}
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

export default UserAccounts;
