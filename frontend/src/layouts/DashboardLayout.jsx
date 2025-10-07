import React from "react";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-16 mb-10">
        <Navbar />
      </div>

      <main className="flex-1 flex justify-center items-start p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
