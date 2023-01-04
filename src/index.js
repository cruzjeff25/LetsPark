import React from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NoPage from './components/Nopage'
import Home from './components/Home'
import Terms from './components/TnC'
import Guidelines from './components/Guidelines'
import NavFooter from './components/NavFooter'
import ScrollToTop from "./components/ScrollToTop.js"
import Privacy from './components/privacyPolicy'
import Login from './components/admin/Login'
import Admin from './components/admin/Admin'
import Dashboard from './components/admin/Dashboard'
import UserAccounts from './components/admin/UserAccounts'
import ViewProfile from './components/admin/UserProfile/ViewProfile'
import AdminAccnts from './components/admin/AdminAccnts'
import Registered from './components/admin/ParkingSpace/Registered'
import Pending from './components/admin/ParkingSpace/Pending'
import ViewSpace from './components/admin/ParkingSpace/ViewSpace'
import ParkingSession from './components/admin/ParkingSpace/ParkingSession'
import ParkingReviews from './components/admin/ParkingSpace/ParkingReviews'
import Documents from './components/admin/ParkingSpace/Documents'
import InProgress from './components/admin/UserProfile/InProgress'



export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<NavFooter />}>
          <Route index element={<Home />} />
          <Route path="Privacy Policy" element={<Privacy/>} />
          <Route path="Terms & Conditions" element={<Terms />} />
          <Route path="Guidelines" element={<Guidelines/>} />
          <Route path="*" element={<NoPage />} />
        </Route>

        <Route path="/Admin/Login" element={<Login />}>
          <Route index element={<Login/>} />
          <Route path="*" element={<NoPage />} />
        </Route>

        <Route path="/Admin/" element={<Admin/>}>
          <Route path="Dashboard" element={<Dashboard/>} />
          <Route path="UserAccounts" element={<UserAccounts/>} />
          <Route path="AdminAccounts" element={<AdminAccnts/>} />
          <Route path="" element={<NoPage />} />
        </Route>

        <Route path="/Admin/UserAccounts/ViewProfile" element={<Admin />}>
          <Route index element={<ViewProfile/>} />
          <Route path="InProgress" element={<InProgress/>} />
          <Route path="*" element={<NoPage />} />
        </Route>

        <Route path="/Admin/ParkingSpaces/Registered" element={<Admin />}>
          <Route index element={<Registered/>} />
          <Route path="ViewSpace" element={<ViewSpace/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/Admin/ParkingSpaces/Pending" element={<Admin />}>
          <Route index element={<Pending/>} />
          <Route path="ViewSpace" element={<ViewSpace/>} />
          <Route path="*" element={<NoPage />} />
        </Route>

        <Route path="/Admin/ParkingSpaces/Registered/ViewSpace" element={<Admin />}>
          <Route index element={<ViewSpace/>} />
          <Route path="Registered" element={<Registered/>} />
          <Route path="Pending" element={<Pending/>} />
          <Route path="ParkingSessions" element={<ParkingSession/>} />
          <Route path="ParkingReviews" element={<ParkingReviews/>} />
          <Route path="Documents" element={<Documents/>} />
          <Route path="*" element={<NoPage />} />
        </Route>

      </Routes>


    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);