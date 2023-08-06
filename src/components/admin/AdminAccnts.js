import React, { useRef, useState } from "react";
import "../../styles/admin/adminaccnts.css";
import "../../styles/admin/adminContainer.css";
import { firestore } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ReactLoading from "react-loading";
import FirebaseServices from "../../services/firebase_services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const usersCollection = collection(firestore, "admin");

const AdminAccnts = () => {
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const [isOpen, setIsOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedIndex = useRef();
  const docId = useRef("");

  const fName = useRef("");
  const lName = useRef("");
  const userName = useRef("");
  const password = useRef("");
  const confirmPass = useRef("");

  const [showAdminForm, setShowAdminForm] = useState(false);
  const toggleShowAdminForm = () => {
    fName.current = "";
    lName.current = "";
    userName.current = "";
    password.current = "";
    confirmPass.current = "";

    setShowAdminForm(!showAdminForm);
  };

  const [disableNotice, setDisableNotice] = useState();
  const toggleDisableNotice = () => {
    setDisableNotice(!disableNotice);
  };

  const [deleteNotice, setDeleteNotice] = useState();
  const toggleDeleteNotice = () => {
    setDeleteNotice(!deleteNotice);
  };

  onSnapshot(usersCollection, (snapshot) => {
    setAdmins(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });

  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value !== "") {
      setValue(e.target.value);
      const filterTable = admins.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setAdmins([...admins]);
    }
  };

  const addAdmin = async () => {
    if (fName.current.length == 0) {
      notifyError("First name is empty!");
      return;
    }

    if (lName.current.length == 0) {
      notifyError("Last name is empty!");
      return;
    }

    if (userName.current.length == 0) {
      notifyError("Username is empty!");
      return;
    }

    if (password.current.length == 0) {
      notifyError("Password is empty!");
      return;
    }

    if (confirmPass.current.length == 0) {
      notifyError("Please confirm your password!");
      return;
    }

    if (password.current !== confirmPass.current) {
      notifyError("Password does not match!");
      return;
    }

    setLoading(true);
    await FirebaseServices.addAmin({
      name: fName.current + " " + lName.current,
      password: password.current,
      permission: true,
      username: userName.current,
    });
    setLoading(false);
    toggleShowAdminForm();
    notifySuccess("Admin details added succesfully!");
  };

  const disableAdmin = async () => {
    setLoading(true);
    await FirebaseServices.disableAdmin(docId.current);
    setLoading(false);
    toggleDisableNotice();
    notifySuccess("Admin's permission disabled.");
  };

  const deleteAdmin = async () => {
    setLoading(true);
    await FirebaseServices.deleteAdmin(docId.current);
    setLoading(false);
    toggleDisableNotice();
    notifySuccess("Admin succesfully deleted.");
  };

  return (
    <>
      <div className="adminaccnts">
        <h1>ADMIN ACCOUNTS</h1>

        <div className="adminContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <input
              onClick={() => {
                if (isOpen) {
                  setIsOpen(!isOpen);
                }
              }}
              onChange={filterData}
              class="input1"
              type="text"
              placeholder="Search by ID or Name"
            ></input>
            <button
              onClick={() => {
                if (isOpen) {
                  setIsOpen(!isOpen);
                }
                toggleShowAdminForm();
              }}
              className="bttn"
            >
              ADD ADMIN
            </button>
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
              {value.length > 0
                ? tableFilter.map((admin, index) => (
                    <tr>
                      <td>{admin.id}</td>
                      <td>{admin.username}</td>
                      <td>{admin.name}</td>
                      <td>
                        {admin.permission ? "True" : "False"}
                        <div className="kebab-menu">
                          <button
                            className="kebab-menu"
                            onClick={() => {
                              docId.current = admin.id;
                              selectedIndex.current = index;
                              setIsOpen(!isOpen);
                            }}
                          ></button>
                          {index == selectedIndex.current && isOpen && (
                            <ul>
                              <li
                                onClick={() => {
                                  setIsOpen();
                                  toggleDisableNotice();
                                }}
                                style={{
                                  color: "#888888",
                                  cursor: "pointer",
                                }}
                              >
                                Disable permission
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
                                Delete admin
                              </li>
                            </ul>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                : admins.map((admin, index) => (
                    <tr>
                      <td>{admin.id}</td>
                      <td>{admin.username}</td>
                      <td>{admin.name}</td>
                      <td>
                        {admin.permission ? "True" : "False"}
                        <div className="kebab-menu">
                          <button
                            className="kebab-menu"
                            onClick={() => {
                              docId.current = admin.id;
                              selectedIndex.current = index;
                              setIsOpen(!isOpen);
                            }}
                          ></button>
                          {index == selectedIndex.current && isOpen && (
                            <ul>
                              <li
                                onClick={() => {
                                  setIsOpen();
                                  toggleDisableNotice();
                                }}
                                style={{
                                  color: "#888888",
                                  cursor: "pointer",
                                }}
                              >
                                Disable permission
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
                                Delete admin
                              </li>
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
      <ToastContainer
        theme="colored"
        pauseOnHover={false}
        hideProgressBar={true}
      />
      {showAdminForm && (
        <div className="modal">
          <div
            className="overlay"
            style={{ backgroundColor: "red" }}
            onClick={toggleShowAdminForm}
          ></div>
          <div className="modal-content">
            <h3>Add new admin</h3>
            <p style={{ color: "#888888", fontSize: "12px" }}>
              You are currently adding new admin account
            </p>
            <br />
            <div style={{ opacity: loading ? "0.3" : "1" }}>
              <div className="fieldRow">
                <input
                  onChange={(e) => {
                    fName.current = e.target.value;
                  }}
                  className="field"
                  type="text"
                  placeholder="First Name"
                  disabled={loading}
                />
                <input
                  onChange={(e) => {
                    lName.current = e.target.value;
                  }}
                  className="field"
                  type="text"
                  placeholder="Last Name"
                  disabled={loading}
                />
              </div>
              <div className="fieldRow">
                <input
                  onChange={(e) => {
                    userName.current = e.target.value;
                  }}
                  className="field"
                  type="text"
                  placeholder="Username"
                  disabled={loading}
                />
              </div>
              <div className="fieldRow">
                <input
                  onChange={(e) => {
                    password.current = e.target.value;
                  }}
                  className="field"
                  type="password"
                  placeholder="Password"
                  disabled={loading}
                />
                <input
                  onChange={(e) => {
                    confirmPass.current = e.target.value;
                  }}
                  className="field"
                  type="password"
                  placeholder="Confirm password"
                  disabled={loading}
                />
              </div>
            </div>

            {loading ? (
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
                  color={"#4888ff"}
                  height={"19px"}
                  width={"19px"}
                />
              </div>
            ) : (
              <div
                className="fieldRow"
                style={{ alignItems: "center", justifyContent: "end" }}
              >
                <p
                  onClick={toggleShowAdminForm}
                  style={{
                    color: "#888888",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </p>
                <button
                  onClick={() => {
                    addAdmin();
                  }}
                  style={{
                    cursor: "pointer",
                    margin: "10px",
                    backgroundColor: "#4888ff",
                    padding: "10px",
                    color: "white",
                    borderRadius: "12px",
                    width: "100px",
                  }}
                >
                  ADD ADMIN
                </button>
              </div>
            )}

            <button className="close-modal" onClick={toggleShowAdminForm}>
              x
            </button>
          </div>
        </div>
      )}
      {disableNotice && (
        <div className="modal">
          <div className="overlay" onClick={toggleDisableNotice}></div>
          <div className="modal-content">
            {loading ? (
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
                <h3>Disable admin permission</h3>
                <br />
                <p style={{ fontSize: "14px" }}>
                  Are you sure you want to disable permission for this admin ?
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
                    onClick={toggleDisableNotice}
                    style={{
                      color: "#888888",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </p>
                  <button
                    onClick={disableAdmin}
                    style={{
                      backgroundColor: "#D22B2B",
                      color: "white",
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "12px",
                    }}
                  >
                    Disable
                  </button>
                </div>
                <button className="close-modal" onClick={toggleDisableNotice}>
                  x
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {deleteNotice && (
        <div className="modal">
          <div className="overlay" onClick={toggleDeleteNotice}></div>
          <div className="modal-content">
            {loading ? (
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
                <h3>Delete admin</h3>
                <br />
                <p style={{ fontSize: "14px" }}>
                  Are you sure you want to delete this admin ?
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
                    onClick={deleteAdmin}
                    style={{
                      backgroundColor: "#D22B2B",
                      color: "white",
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "12px",
                    }}
                  >
                    Delete admin
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

export default AdminAccnts;
