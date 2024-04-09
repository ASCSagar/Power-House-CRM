import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import Login from "./pages/Login/Login";
import Error from "./pages/Error/Error";
import Dashboard from "./components/Dashboard/Dashboard";
import NeedHelp from "./pages/Need Help/NeedHelp";
import Profile from "./pages/Profile/Profile";
import Contact from "./pages/Contact/ContactUS";
import Footer from "./components/Footer/Footer";
import { useState } from "react";

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
      <Routes>
        <Route path="*" element={<Error />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/FAQS" element={<NeedHelp />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
      </Routes>
      {loction !== "/" && <Footer />}
    </body>
  );
}

export default App;
