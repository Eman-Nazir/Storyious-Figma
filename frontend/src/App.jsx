import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PageWithoutAds from "./pages/PageWithoutAds";
import AllStories from "./pages/AllStories";
import BedtimeDetailedPage from "./pages/BedtimeDetailedPage";
import MoralStoryDetailedPage from "./pages/MoralStoryDetailedPage";
import ClassicStoryDetailedPage from "./pages/ClassicStoryDetailedPage";
import ScaryStoryDetailedPage from "./pages/ScaryStoryDetailedPage";
import FablesStoryDetailedPage from "./pages/FablesStoryDetailedPage";
import FairytalesDetailedPage from "./pages/FairytalesDetailedPage";
import JackStoryDetailPage from "./pages/JackStoryDetailPage";
import SilentCradleStoryDetailPage from "./pages/SilentCradleDetailPage";
import ElijahQuestStoryDetailPage from "./pages/ElijahQuestStoryDetailedPage";
import BlogsPage from "./pages/BlogsPage";
import BlogOneDetailPage from "./pages/BlogOneDetailPage";
import BlogTwoDetailPage from "./pages/BlogTwoDetailPage";
import BlogThreeDetailPage from "./pages/BlogThreeDetailPage";
import BlogFourDetailPage from "./pages/BlogFourDetailPage";
import WriterPage from "./pages/WriterPage";
import KazimAliDetailPage from "./pages/KazimAliDetailPage";
import AliNadeemDetailPage from "./pages/AliNadeemDetailPage";
import DeenaMdDetailPage from "./pages/DeenaMdDetailPage";
import AbubakerAliDetailPage from "./pages/AbubakerAliDetailPage";
import FAQList from "./pages/FAQList";
import CPFRules from "./pages/CPFRules";
import FAQAnswer from "./pages/FAQAnswer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import WriteForUsPage from "./pages/WriteForUsPage";
import AboutUs from "./pages/AboutUs";
import VideoStoryPage from "./pages/VideoStoryPage";
import Jack1stDayVideoDetailPage from "./pages/Jack1stDayVideoDetailPage";
import SilentCradelVideoDetailPage from "./pages/SilentCradelVideoDetailPage";
import ElijahQuestVideoDetailPage from "./pages/ElijahQuestVideoDetailPage";
import ContactUsPage from "./pages/ContactUsPage";
import SearchPage from "./pages/SearchPage";
import ChasingSunsetDetailPage from "./pages/ChasingSunsetDetailPage";
import HiddenGemsDetailPage from "./pages/HiddenGemsDetailPage";
import TravelTripDetailPage from "./pages/TravelTripDetailPage";

// Admin imports
import AdminLogin from "./pages/adminPages/AdminLogin";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import { AdminProvider } from "./context/AdminContext";

import useScrollToTop from "./hooks/useScrollToTop";
import AdminViewCategory from "./pages/adminPages/AdminViewCategory";
import AdminCreateCategory from "./pages/adminPages/AdminCreateCategory";
import AdminLayout from "./components/common/AdminLayout";
import AdminCreateAuthor from "./pages/adminPages/AdminCreateAuthor";
import AdminViewAuthor from "./pages/adminPages/AdminViewAuthor";

function App() {
  useScrollToTop();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PageWithoutAds />} />
        <Route path="/allstories" element={<AllStories />} />
        <Route path="/BedTime-Detailed" element={<BedtimeDetailedPage />} />
        <Route
          path="/MoralStory-Detailed"
          element={<MoralStoryDetailedPage />}
        />
        <Route
          path="/ClassicStory-Detailed"
          element={<ClassicStoryDetailedPage />}
        />
        <Route
          path="/ScaryStory-Detailed"
          element={<ScaryStoryDetailedPage />}
        />
        <Route
          path="/FablesStory-Detailed"
          element={<FablesStoryDetailedPage />}
        />
        <Route
          path="/Fairytales-Detailed"
          element={<FairytalesDetailedPage />}
        />
        <Route path="/Jack-1st-Day" element={<JackStoryDetailPage />} />
        <Route
          path="/Silent-Cradle"
          element={<SilentCradleStoryDetailPage />}
        />
        <Route path="/Elijah-Quest" element={<ElijahQuestStoryDetailPage />} />
        <Route path="/Blog-Page" element={<BlogsPage />} />
        <Route path="/BlogOne-Page" element={<BlogOneDetailPage />} />
        <Route path="/BlogTwo-Page" element={<BlogTwoDetailPage />} />
        <Route path="/BlogThree-Page" element={<BlogThreeDetailPage />} />
        <Route path="/BlogFour-Page" element={<BlogFourDetailPage />} />
        <Route path="/Writer-Page" element={<WriterPage />} />
        <Route path="/Kazim-Ali" element={<KazimAliDetailPage />} />
        <Route path="/Abubaker-Ali" element={<AbubakerAliDetailPage />} />
        <Route path="/Ali-Nadeem" element={<AliNadeemDetailPage />} />
        <Route path="/Deena-Md" element={<DeenaMdDetailPage />} />
        <Route path="/CPF-Rules" element={<CPFRules />} />
        <Route path="/faqs" element={<FAQList />} />
        <Route path="/faqs/:slug" element={<FAQAnswer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/WriteFor-Us" element={<WriteForUsPage />} />
        <Route path="/About-Us" element={<AboutUs />} />
        <Route path="/Video-Page" element={<VideoStoryPage />} />
        <Route path="/Jack1stVideo" element={<Jack1stDayVideoDetailPage />} />
        <Route
          path="/SilentCradleVideo"
          element={<SilentCradelVideoDetailPage />}
        />
        <Route
          path="/ElijahQuestVideo"
          element={<ElijahQuestVideoDetailPage />}
        />
        <Route path="/ContactUs" element={<ContactUsPage />} />
        <Route path="/SearchPage" element={<SearchPage />} />
        <Route
          path="/TravelTipsDetailedPage"
          element={<TravelTripDetailPage />}
        />
        <Route
          path="/ChasingSunsetsDetailedPage"
          element={<ChasingSunsetDetailPage />}
        />
        <Route
          path="/HiddenGemsDetailedPage"
          element={<HiddenGemsDetailPage />}
        />

        <Route
          path="/admin/login"
          element={
            <AdminProvider>
              <AdminLogin />
            </AdminProvider>
          }
        />

        <Route
          path="/admin/*"
          element={
            <AdminProvider>
              <AdminLayout />
            </AdminProvider>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="story-categories" element={<AdminViewCategory />} />
          <Route
            path="story-categories/create"
            element={<AdminCreateCategory />}
          />
          <Route path="authors/create" element={<AdminCreateAuthor />} />
          <Route path="authors" element={<AdminViewAuthor />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
