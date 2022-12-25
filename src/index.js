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
import UserAccnts from './components/admin/UserAccnts'
import AdminAccnts from './components/admin/AdminAccnts'
import Registered from './components/admin/Registered'
import Pending from './components/admin/Pending'



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
          <Route path="User Accounts" element={<UserAccnts/>} />
          <Route path="Admin Accounts" element={<AdminAccnts/>} />
          <Route path="Registered" element={<Registered/>} />
          <Route path="Pending" element={<Pending/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);