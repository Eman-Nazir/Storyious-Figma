
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/common/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/*  Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg z-50">
        <AdminSidebar />
      </div>

      {/*  Scrollable Dashboard Content */}
      <div className="ml-64 flex-1 flex flex-col overflow-y-auto">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

