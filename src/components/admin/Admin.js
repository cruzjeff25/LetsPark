import { useContext, useState } from "react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../../styles/admin/admin.css";
import logo from "../../img/logo.png";
import { GoDashboard } from "react-icons/go";
import { BiUser, BiLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { TbParking } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { UserContext } from "../..";

const Admin = (props) => {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="sidebar">
        <img src={logo} alt="logo" width="60%" height="20%" />
        <div className="line"></div>

        <Link
          className="link"
          to="/Admin/Dashboard"
          style={{ display: user.data.permission === true ? "block" : "none" }}
        >
          <GoDashboard /> Dashboard
        </Link>
        <Link
          className="link"
          to="/Admin/UserAccounts"
          style={{ display: user.data.permission === true ? "block" : "none" }}
        >
          <BiUser /> User Accounts
        </Link>

        {/* parking space drop down */}
        <div
          className={active ? "navSpaces_active" : "navSpaces"}
          style={{ display: user.data.permission === true ? "block" : "none" }}
        >
          <p
            className="link"
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => {
              setActive(!active);
            }}
          >
            <TbParking /> Parking Spaces
          </p>
          <div className="spaces">
            <Link className="link" to="/Admin/ParkingSpaces/Registered">
              Registered
            </Link>
            <Link className="link" to="/Admin/ParkingSpaces/Pending">
              Pending
            </Link>
          </div>
        </div>
        <Link
          className="link"
          to="/Admin/AdminAccounts"
          style={{ display: user.data.permission === true ? "block" : "none" }}
        >
          <RiAdminLine /> Admin Accounts
        </Link>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            style={{
              cursor: "pointer",
              margin: "20px",
              padding: "10px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BiLogOut style={{ marginRight: "5px" }} /> Logout
          </button>
        </div>
      </div>

      <div className="topbar">
        <h1>
          <FaUserAlt /> {user.data.name}
        </h1>
      </div>
      <Outlet />
    </>
  );
};

export default Admin;
