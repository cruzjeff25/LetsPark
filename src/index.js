import React from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NoPage from './components/Nopage'
import Home from './components/Home'
import Privacy from './components/PrivacyPolicy'
import Terms from './components/TnC'
import Guidelines from './components/Guidelines'
import NavFooter from './components/NavFooter'
import ScrollToTop from "./components/ScrollToTop.js"



export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<NavFooter />}>
          <Route index element={<Home />} />
          <Route path="Privacy Policy" element={<Privacy />} />
          <Route path="Terms & Conditions" element={<Terms />} />
          <Route path="Guidelines" element={<Guidelines/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);