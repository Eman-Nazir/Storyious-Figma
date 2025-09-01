
import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const AdminDashboard = () => {
const { getDashboard, getCategories, getAuthors, admin, getStories,getBlogs  } = useContext(AdminContext);

  const [message, setMessage] = useState("Loading...");
  const [activePage, setActivePage] = useState("dashboard");
  const [categoryCount, setCategoryCount] = useState(0);
  const [authorCount, setAuthorCount] = useState(0);
  const [storyCount, setStoryCount] = useState(0);
const [blogCount, setBlogCount] = useState(0);


useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();
      setMessage(data.message || "Welcome to your Admin Dashboard");
    } catch {
      setMessage("Error loading data");
    }
  };

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      setCategoryCount(categories.length);
    } catch {
      setCategoryCount(0);
    }
  };

  const fetchAuthors = async () => {
    try {
      const authors = await getAuthors();
      setAuthorCount(authors.length);
    } catch {
      setAuthorCount(0);
    }
  };

  const fetchStories = async () => {
    try {
      const stories = await getStories();
      setStoryCount(stories.length);
    } catch {
      setStoryCount(0);
    }
  };

  const fetchBlogs = async () => {
  try {
    const blogs = await getBlogs();
    setBlogCount(blogs.length);
  } catch {
    setBlogCount(0);
  }
};

  fetchDashboard();
  fetchCategories();
  fetchAuthors();
  fetchStories();
   fetchBlogs();
}, [getDashboard, getCategories, getAuthors, getStories,getBlogs]);



  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold">Story Categories</h3>
                <p className="text-2xl font-bold">{categoryCount}</p>
              </div>
              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold">Authors</h3>
               <p className="text-2xl font-bold">{authorCount}</p>
              </div>
              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold">Stories</h3>
                  <p className="text-2xl font-bold">{storyCount}</p>
              </div>
              <div className="bg-white shadow rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold">Blogs</h3>
                <p className="text-2xl font-bold">{blogCount}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-bold text-[var(--primary-color)]">
            {activePage === "dashboard"
              ? "Dashboard"
              : activePage.replace("-", " ").toUpperCase()}
          </h1>
          <div className="flex items-center space-x-3">
            {admin?.profileImage && (
              <img
                src={admin.profileImage}
                alt="Admin"
                className="w-10 h-10 rounded-full"
              />
            )}
            <span className="font-medium">{admin?.name || "Admin"}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;