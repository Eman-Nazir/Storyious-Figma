import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useScrollToTop from "./hooks/useScrollToTop";

// Layouts
import PublicLayout from "./Layout/PublicLayout";
import AdminLayout from "./Layout/AdminLayout";

// Public pages
import PageWithoutAds from "./pages/PageWithoutAds";
import AllStories from "./pages/AllStories";
import BlogsPage from "./pages/BlogsPage";
import AuthorPage from "./pages/AuthorPage";
import FAQList from "./pages/FAQList";
import CPFRules from "./pages/CPFRules";
import FAQAnswer from "./pages/FAQAnswer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import WriteForUsPage from "./pages/WriteForUsPage";
import AboutUs from "./pages/AboutUs";
import VideoStoryPage from "./pages/VideoStoryPage";
import ContactUsPage from "./pages/ContactUsPage";
import CategoryDetailedPage from "./pages/CategoryDetailPage";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import FAQ from "./sections/WithAdds/FAQ";
import BlogDetailPage from "./pages/BlogDetailPage";
import StoryDetailPage from "./pages/StoryDetailedPage";

// Admin
import { AdminProvider } from "./context/AdminContext";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import AdminViewCategory from "./pages/adminPages/AdminViewCategory";
import AdminCreateCategory from "./pages/adminPages/AdminCreateCategory";
import AdminCreateAuthor from "./pages/adminPages/AdminCreateAuthor";
import AdminViewAuthor from "./pages/adminPages/AdminViewAuthor";
import AdminCreateStory from "./pages/adminPages/AdminCreateStory";
import AdminViewStories from "./pages/adminPages/AdminViewStories";
import AdminBlogCreate from "./pages/adminPages/AdminBlogCreate";
import AdminBlogView from "./pages/adminPages/AdminBlogView";
import AdminCreateFAQ from "./pages/adminPages/AdminCreateFaq";
import AdminViewFAQs from "./pages/adminPages/AdminViewFaq";
import AdminCreateAd from "./pages/adminPages/AdminCreateAd";
import AdminViewAd from "./pages/adminPages/AdminViewAd";
import AdminNewsletterView from "./pages/adminPages/AdminNewsLetterView";
import SearchResults from "./pages/SearchResultPage";

function App() {
  useScrollToTop();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PageWithoutAds />} />
          <Route path="/allstories" element={<AllStories />} />
          <Route path="/category/:categoryName" element={<CategoryDetailedPage />} /> 
          <Route path="/story/:id" element={<StoryDetailPage />} />
          <Route path="/Blog-Page" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/writers/:slug" element={<AuthorDetailPage />} />
          <Route path="/author-Page" element={<AuthorPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/faq/:category" element={<FAQ />} />
          <Route path="/CPF-Rules" element={<CPFRules />} />
          <Route path="/faqs" element={<FAQList />} />
          <Route path="/faqs/:slug" element={<FAQAnswer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/WriteFor-Us" element={<WriteForUsPage />} />
          <Route path="/About-Us" element={<AboutUs />} />
          <Route path="/Video-Page" element={<VideoStoryPage />} />
          <Route path="/ContactUs" element={<ContactUsPage />} />
          <Route path="/search" element={<SearchResults/>} />
        </Route>

        {/* Admin layout */}
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
          <Route path="story-categories/create" element={<AdminCreateCategory />} />
          <Route path="authors/create" element={<AdminCreateAuthor />} />
          <Route path="authors" element={<AdminViewAuthor />} />
          <Route path="stories/create" element={<AdminCreateStory />} />
          <Route path="stories" element={<AdminViewStories />} />
          <Route path="blogs/create" element={<AdminBlogCreate />} />
          <Route path="blogs" element={<AdminBlogView />} />
          <Route path="faqs/create" element={<AdminCreateFAQ />} />
          <Route path="faqs" element={<AdminViewFAQs />} />
          <Route path="ad/create" element={<AdminCreateAd />} />
          <Route path="ad" element={<AdminViewAd />} />
          <Route path="newsLetter" element={<AdminNewsletterView />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;



