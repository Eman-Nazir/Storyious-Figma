import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import defaultAdminAvatar from "../../assets/images/defaultUserAvatar.png"; 

const AdminDashboard = () => {
  const {
    getDashboard,
    getCategories,
    getAuthors,
    admin,
    getStories,
    getBlogs,
    getFAQs,
    getSubscribers,
    getAds,
  } = useContext(AdminContext);

  const [message, setMessage] = useState("Loading...");
  const [categoryCount, setCategoryCount] = useState(0);
  const [authorCount, setAuthorCount] = useState(0);
  const [storyCount, setStoryCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [faqCount, setFaqCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [adsCount, setAdsCount] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getDashboard();
        setMessage(data.message || "Welcome to your Admin Dashboard");

        setCategoryCount((await getCategories()).length);
        setAuthorCount((await getAuthors()).length);
        setStoryCount((await getStories()).length);
        setBlogCount((await getBlogs()).length);
        setFaqCount((await getFAQs()).length);
        setSubscriberCount((await getSubscribers()).length);
        setAdsCount((await getAds()).length);
      } catch {
        setMessage("Error loading data");
      }
    };

    fetchAll();
  }, [
    getDashboard,
    getCategories,
    getAuthors,
    getStories,
    getBlogs,
    getFAQs,
    getSubscribers,
    getAds,
  ]);

  return (
    <div className="p-6">
      {/* 🔹 Admin Info Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow rounded-xl p-5 mb-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <img
            src={admin?.profileImage || defaultAdminAvatar}
            alt="Admin Avatar"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
          />
          <div>
            <h1 className="text-2xl font-bold text-[var(--primary-color)]">
              {admin?.name || "Admin User"}
            </h1>
            <p className="text-sm text-gray-500">
              Role: <span className="font-medium text-gray-700">Administrator</span>
            </p>
          </div>
        </div>
        <div className="mt-3 md:mt-0 text-gray-600">
          <p>{message}</p>
        </div>
      </div>

      {/* 🔹 Dashboard Overview */}
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
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold">FAQs</h3>
          <p className="text-2xl font-bold">{faqCount}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold">Ads</h3>
          <p className="text-2xl font-bold">{adsCount}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold">Subscribers</h3>
          <p className="text-2xl font-bold">{subscriberCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
