import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login/Login";
import Error from "./pages/Error/Error";
import NeedHelp from "./pages/Need Help/NeedHelp";
import Profile from "./pages/Profile/Profile";
import Contact from "./pages/Contact/ContactUS";

import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";

import Company from "./components/Company/Company";

import Site from "./components/Site/Site";
import GroupSite from "./components/GroupSite/GroupSite";

import Quote from "./components/Quote/Quote";
import GroupQuote from "./components/GroupQuote/GroupQuote";
import Note from "./components/Note/Note";

function App() {
  const loction = useLocation().pathname;
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <body className={toggleSidebar ? "toggle-sidebar" : ""}>
      {loction !== "/" && (
        <Header
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
      )}
      {loction !== "/" && <SideBar />}
      <ToastContainer theme="colored" position="top-center" autoClose={3000} />
      <Routes>
        <Route path="*" element={<Error />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/FAQS" element={<NeedHelp />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>

        <Route path="/Companies" element={<Company />}></Route>

        <Route path="/Sites" element={<Site />}></Route>
        <Route path="/GroupSites" element={<GroupSite />}></Route>

        <Route path="/Quotes" element={<Quote />}></Route>
        <Route path="/GroupQuotes" element={<GroupQuote />}></Route>

        <Route path="/Notes" element={<Note/>}></Route>
        <Route path="/Note/:noteId" element={<Note/>}></Route>
      </Routes>
      {loction !== "/" && <Footer />}
    </body>
  );
}

export default App;
