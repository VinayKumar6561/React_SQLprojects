import React from "react";
import Navbar from "./Navbar";
import PropertyForm from "./PropertyForm";
import PropertyCards from "./PropertyCards";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  return (
    <div>
      <Navbar />
      {role === "Agent" ? (
        <PropertyForm agentId={localStorage.getItem("userId")} />
      ) : (
        <PropertyCards />
      )}
    </div>
  );
};

export default Dashboard;