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
import Admin from './components/admin/Admin'
import Dashboard from './components/admin/Dashboard'
import UserAccounts from './components/admin/UserAccounts'
import ViewProfile from './components/admin/UserProfile/ViewProfile'
import AdminAccnts from './components/admin/AdminAccnts'
import Registered from './components/admin/ParkingSpace/Registered'
import Pending from './components/admin/ParkingSpace/Pending'
import ParkingSpaces from './components/admin/ParkingSpace/ParkingSpaces'
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
        <Route path="/Admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="UserAccounts" element={<UserAccounts/>} />
          <Route path="AdminAccounts" element={<AdminAccnts/>} />
          <Route path="ParkingSpaces" element={<ParkingSpaces/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/Admin/UserAccounts/ViewProfile" element={<Admin />}>
          <Route index element={<ViewProfile/>} />
          <Route path="ViewProfile" element={<ViewProfile/>} />
          <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/Admin/UserAccounts/ViewProfile/InProgress" element={<Admin />}>
          <Route index element={<InProgress/>} />
          <Route path="InProgress" element={<InProgress/>} />
          <Route path="*" element={<NoPage />} />
          </Route>
        <Route path="/Admin/ParkingSpaces" element={<Admin />}>
          <Route index element={<ParkingSpaces/>} />
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