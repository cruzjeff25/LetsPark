import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../styles/admin/view.css";
import logo from "../../../img/logo.png";
import warning from "../../../img/attention.png";
import { firestore } from "../../../firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import ReactLoading from "react-loading";
import LoadingComponent from "../loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FirebaseServices from "../../../services/firebase_services";

const spacesCollection = collection(firestore, "parking-spaces");

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const notify = (message) => toast.error(message);
  const notifySuccess = () => toast.success("Save successful!");
  const notifyApprove = () => toast.success("Parking space approved!");
  const [space, setSpace] = useState();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState();
  const docRef = doc(spacesCollection, location.state.id);

  const status = useRef(false);
  const address = useRef("");
  const phone = useRef("");
  const capacity = useRef(0);
  const basis = useRef("");
  const info = useRef("");
  const rules = useRef("");

  const [saveNotice, setSaveNotice] = useState(false);

  const toggleSaveNotice = () => {
    if (address.current.length == 0) {
      notify("Address is empty!");
      return;
    }

    if (phone.current.length == 0) {
      notify("Phone number is empty!");
      return;
    }

    if (capacity.current.length == 0) {
      notify("Capacity is empty!");
      return;
    }

    if (info.current.length == 0) {
      notify("Parking space information is empty!");
      return;
    }

    if (rules.current.length == 0) {
      notify("Rules is empty!");
      return;
    }

    if (rules.current === info.current) {
      notify("Space information and rules cannot be the same!");
      return;
    }

    setSaveNotice(!saveNotice);
  };

  const getUserProfile = async () => {
    setLoading(true);
    await getDoc(docRef).then((snap) => {
      if (snap.exists) {
        status.current = snap.data()["disabled"];
        address.current = snap.data()["address"];
        phone.current = snap.data()["caretakerPhoneNumber"];
        capacity.current = snap.data()["capacity"];
        basis.current = snap.data()["dailyOrMonthly"];
        info.current = snap.data()["info"];
        rules.current = snap.data()["rules"];
        setSpace(snap.data());
      }
    });
    setLoading(false);
  };

  const updateSpace = async () => {
    setUpdating(true);
    await FirebaseServices.updateSpaceDetails(location.state.id, {
      status: status.current,
      address: address.current,
      phone: phone.current,
      capacity: capacity.current,
      basis: basis.current,
      info: info.current,
      rules: rules.current,
    });
    setUpdating(false);
    toggleSaveNotice();
    notifySuccess();
  };

  const approveSpace = async () => {
    setUpdating(true);
    await FirebaseServices.approveSpace(location.state.id);
    setUpdating(false);
    toggleSaveNotice();
    navigate("/Admin/ParkingSpaces/Pending", { state: { approved: true } });
  };

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : space == null ? (
        <LoadingComponent />
      ) : (
        <div className="parkingSpace">
          <h1>PARKING SPACES</h1>

          <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>
                {!location.state.isEditing
                  ? "VIEW PARKING SPACE"
                  : "EDIT PARKING SPACE"}
                -({space.id})
              </h1>
              {location.state.isEditing ? (
                <div style={{ display: "flex", margin: "10px 20px 10px 0" }}>
                  <button
                    onClick={""}
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
              <div className="left-con">
                <div className="img-con">
                  <img src={logo} alt="logo" />
                </div>
                <label for="id">Parking Space ID</label>
                <br />
                <input id="id" type="text" value={space.id} readonly disabled />
                <br />
                <br />
                <label for="status">Status</label>
                <br />
                {!location.state.isEditing ? (
                  <input
                    id="id"
                    type="text"
                    defaultValue={space.disabled ? "Disabled" : "Enabled"}
                    disabled
                  />
                ) : (
                  <select
                    id="status"
                    defaultValue={status.current}
                    onChange={(e) => {
                      status.current = e.target.value;
                    }}
                  >
                    <option value={false}>Enable</option>
                    <option value={true}>Disable</option>
                  </select>
                )}

                {!space.approved ? (
                  <div className="confirmation">
                    <img
                      src={warning}
                      alt="warning"
                      width="40px"
                      height="40px"
                    />
                    <p>This parking space is not yet confirmed</p>
                    <p>Confirm this parking space now?</p>
                    <button onClick={toggleSaveNotice}>Confirm</button>
                  </div>
                ) : null}
              </div>
              <div className="right-con">
                <div className="top">
                  <div className="left">
                    <label for="address">Address</label>
                    <br />
                    <input
                      onChange={(e) => {
                        address.current = e.target.value;
                      }}
                      id="address"
                      type="text"
                      defaultValue={address.current}
                      readonly={!location.state.isEditing}
                      disabled={!location.state.isEditing}
                    />

                    <br />
                    <br />
                    <label for="phone">Caretaker Phone Number</label>
                    <br />
                    <input
                      defaultValue={phone.current}
                      onChange={(e) => {
                        phone.current = e.target.value;
                      }}
                      id="phone"
                      type="text"
                      readonly={!location.state.isEditing}
                      disabled={!location.state.isEditing}
                    />
                  </div>
                  <div className="right">
                    <br />
                    <label for="capacity">Capacity</label>
                    <br />
                    <input
                      defaultValue={capacity.current}
                      onChange={(e) => {
                        capacity.current = e.target.value;
                      }}
                      id="capacity"
                      type="number"
                      min={10}
                      readonly={!location.state.isEditing}
                      disabled={!location.state.isEditing}
                    />

                    <br />
                    <br />
                    <label for="basis">Basis</label>
                    <br />
                    {location.state.isEditing ? (
                      <select
                        id="status"
                        defaultValue={basis.current}
                        onChange={(e) => {
                          basis.current = e.target.value;
                        }}
                      >
                        <option value="Daily">Daily</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                    ) : (
                      <input
                        id="basis"
                        type="text"
                        defaultValue={space.dailyOrMonthly}
                        disabled={!location.state.isEditing}
                      />
                    )}
                    <br />
                    <br />
                  </div>
                </div>
                <div className="bottom">
                  <label for="geo">Geoposition</label>
                  <br />
                  <input
                    id="geo"
                    type="text"
                    defaultValue={`${space.geoposition[0]}, ${space.geoposition[1]}`}
                    disabled
                  />
                  <br />
                  <label for="features">Features</label>
                  <br />
                  <input
                    id="features"
                    type="text"
                    defaultValue={space.features}
                    disabled
                  />
                  <br />
                  <label for="info">Parking Space Information</label>
                  <br />
                  <textarea
                    id="info"
                    type="text"
                    defaultValue={info.current}
                    onChange={(e) => {
                      info.current = e.target.value;
                    }}
                    rows="5"
                    cols="80"
                    readonly={!location.state.isEditing}
                    disabled={!location.state.isEditing}
                  />
                  <br />
                  <br />
                  <label for="rules">Rules</label>
                  <br />
                  <textarea
                    id="rules"
                    type="text"
                    defaultValue={rules.current}
                    onChange={(e) => {
                      rules.current = e.target.value;
                    }}
                    rows="5"
                    cols="80"
                    readonly={!location.state.isEditing}
                    disabled={!location.state.isEditing}
                  />
                </div>
              </div>
            </div>
            <div className="views-nav">
              {location.state.approved ? (
                <Link
                  className="link"
                  to="ParkingSessions"
                  state={{ id: space.id }}
                >
                  {" "}
                  View Parking Session
                </Link>
              ) : null}
              {location.state.approved ? (
                <Link
                  className="link"
                  to="ParkingReviews"
                  state={{ id: space.id }}
                >
                  {" "}
                  View Parking Reviews
                </Link>
              ) : null}
              <Link
                className="link"
                to="Documents"
                state={{ id: space.id, documents: [...space.certificates] }}
              >
                {" "}
                View Documents
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
                <h3>
                  {location.state.approved ? "Save changes" : "Approve space"}
                </h3>
                <br />
                <p style={{ fontSize: "14px" }}>
                  {location.state.approved
                    ? "Are you sure you want to save changes ?"
                    : "Are you sure you want to approve this space ?"}
                </p>
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "12px",
                    color: "#888888",
                  }}
                >
                  Once approve, this space can now receive and accept parking
                  reservations.
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
                    onClick={
                      location.state.approved ? updateSpace : approveSpace
                    }
                    style={{
                      backgroundColor: "#4888ff",
                      color: "white",
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "12px",
                    }}
                  >
                    {location.state.approved ? "Save" : "Approve"}
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

export default View;
