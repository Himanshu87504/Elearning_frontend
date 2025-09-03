import React from "react";
import Sidebar from "./Sidebar";
import "./common.css";

const Layout = ({ children }) => {
  return (
    <div className="dashboard-admin">
      <Sidebar />
      {/* <h1>in layout parent</h1> */}
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
