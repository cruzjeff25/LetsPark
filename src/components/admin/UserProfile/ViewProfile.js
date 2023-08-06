import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../styles/admin/userprofile.css";
import { firestore } from "../../../firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import ReactLoading from "react-loading";
import LoadingComponent from "../loading";
import FirebaseServices from "../../../services/firebase_services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const usersCollection = collection(firestore, "user-data");
const spacesCollection = collection(firestore, "parking-spaces");

const ViewProfile = () => {
  const notifyError = () => toast.error("Name is empty!");
  const notifySuccess = () => toast.success("Save successful!");
  const location = useLocation();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState();
  const name = useRef("");
  const phone = useRef("");
  const docRef = doc(usersCollection, location.state.id);
  const [ownedSpaces, setOwnedSpaces] = useState(0);
  const [nameIsNull, setNameIsNull] = useState(false);

  const [saveNotice, setSaveNotice] = useState(false);
  const toggleSaveNotice = () => {
    if (name.current.length == 0) {
      notifyError();
      return;
    }

    setSaveNotice(!saveNotice);
  };

  const getUserProfile = async () => {
    setLoading(true);
    await getDoc(docRef).then((snap) => {
      if (snap.exists) {
        name.current = snap.data()["name"];
        phone.current = snap.data()["phoneNumber"];
        setUser(snap.data());
      }
    });
    setLoading(false);
  };

  onSnapshot(spacesCollection, (snapshot) => {
    let owned = 0;
    snapshot.docs.forEach((doc) => {
      if (doc.data()["ownerId"] === location.state.id) {
        owned += 1;
      }
    });
    setOwnedSpaces(owned);
  });

  const updateDetails = async () => {
    setUpdating(true);
    await FirebaseServices.updateUserDetails(
      location.state.id,
      name.current,
      phone.current
    );
    setUpdating(false);
    toggleSaveNotice();
    notifySuccess();
  };

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : user == null ? (
        <LoadingComponent />
      ) : (
        <div className="viewprofile">
          <h1>USER ACCOUNTS</h1>
          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>
                {!location.state.isEdit
                  ? "VIEW USER PROFILE"
                  : "EDIT USER PROFILE"}{" "}
                - ({user.name})
              </h1>
              {location.state.isEdit ? (
                <div style={{ display: "flex", margin: "10px 20px 10px 0" }}>
                  <button
                    onClick={() => {
                      getUserProfile();
                    }}
                    className="excel"
                    style={{ backgroundColor: "#D22B2B" }}
                  >
                    CANCEL
                  </button>
                  <button
                    className="csv"
                    style={{ backgroundColor: "#097969" }}
                    onClick={toggleSaveNotice}
                  >
                    SAVE
                  </button>
                </div>
              ) : null}
            </div>

            <div className="con">
              <div className="right-con">
                <div className="top">
                  <div className="left">
                    <label for="id">ID</label>
                    <br />
                    <input id="id" type="text" value={user.id} disabled />
                    <br />
                    <br />
                    <label for="email">Email</label>
                    <br />
                    <input id="email" type="text" value={user.email} disabled />
                  </div>
                  <div className="right">
                    <label for="name">Name</label>
                    <br />
                    <input
                      onChange={(e) => {
                        name.current = e.target.value;
                      }}
                      style={{ border: nameIsNull ? "1px solid red" : "" }}
                      id="name"
                      type="text"
                      defaultValue={user.name}
                      disabled={!location.state.isEdit}
                    />
                    {nameIsNull ? (
                      <p style={{ fontSize: "12px", color: "red" }}>
                        This is a required field.
                      </p>
                    ) : null}
                    <br />
                    <br />
                    <label for="phone">Phone Number</label>
                    <br />
                    <input
                      onChange={(e) => {
                        phone.current = e.target.value;
                      }}
                      id="phone"
                      type="text"
                      defaultValue={user.phoneNumber}
                      disabled
                    />
                    <br />
                    <br />
                  </div>
                </div>

                <div className="bottom">
                  <label for="owned">Spaces Owned</label>
                  <br />
                  <input id="owned" type="text" value={ownedSpaces} disabled />
                  <br />
                </div>
              </div>

              <div className="left-con">
                <div className="img-con">
                  <img src={`${user.imageUrl}`} alt="logo" />
                </div>
              </div>
            </div>

            <div className="views-nav">
              <Link
                className="link"
                to="/Admin/UserAccounts/ViewProfile/InProgress"
                state={{ name: user.name, id: location.state.id }}
              >
                {" "}
                View in Progress Parking
              </Link>
              <Link
                className="link"
                to="/Admin/UserAccounts/ViewProfile/Upcoming"
                state={{ name: user.name, id: location.state.id }}
              >
                {" "}
                View Upcoming Parking
              </Link>
              <Link
                className="link"
                to="/Admin/UserAccounts/ViewProfile/History"
                state={{ name: user.name, id: location.state.id }}
              >
                {" "}
                View Parking History
              </Link>
              <Link
                className="link"
                to="/Admin/UserAccounts/ViewProfile/OwnedSpaces"
                state={{ name: user.name, id: location.state.id }}
              >
                {" "}
                View Parking Spaces
              </Link>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        theme="colored"
        pauseOnHover={false}
        hideProgressBar={true}
      />
      {saveNotice && (
        <div className="modal">
          <div
            className="overlay"
            style={{ backgroundColor: "red" }}
            onClick={toggleSaveNotice}
          ></div>
          <div className="modal-content">
            {updating ? (
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
                <h3>Save changes</h3>
                <br />
                <p style={{ fontSize: "14px" }}>
                  Are you sure you want to save changes ?
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
                    onClick={toggleSaveNotice}
                    style={{
                      color: "#888888",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </p>
                  <button
                    onClick={updateDetails}
                    style={{
                      backgroundColor: "#4888ff",
                      color: "white",
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "12px",
                    }}
                  >
                    Save
                  </button>
                </div>
                <button className="close-modal" onClick={toggleSaveNotice}>
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

export default ViewProfile;
