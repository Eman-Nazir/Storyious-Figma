import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Folders,
  User,
  BookOpen,
  PenSquare,
  HelpCircle,
  Megaphone,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ activePage, setActivePage }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      children: null,
    },
    {
      name: "Story Categories",
      key: "storyCategories",
      icon: Folders,
      children: [
        {
          name: "View All",
          key: "storyCategories-view",
          path: "/admin/story-categories",
        },
        {
          name: "Create New",
          key: "storyCategories-create",
          path: "/admin/story-categories/create",
        },
      ],
    },
    {
      name: "Authors",
      key: "authors",
      icon: User,
      children: [
        { name: "View All", key: "authors-view", path: "/admin/authors" },
        { name: "Create New", key: "authors-create", path: "/admin/authors/create" },
      ],
    },
    {
      name: "Stories",
      key: "stories",
      icon: BookOpen,
      children: [
        { name: "View All", key: "stories-view", path: "/admin/stories" },
        { name: "Create New", key: "stories-create", path: "/admin/stories/create" },
      ],
    },
    {
      name: "Blogs",
      key: "blog",
      icon: PenSquare,
      children: [
        { name: "View All", key: "blog-view", path: "/admin/blogs" },
        { name: "Create New", key: "blog-create", path: "/admin/blogs/create" },
      ],
    },
    {
      name: "FAQs",
      key: "faq",
      icon: HelpCircle,
      children: [
        { name: "View All", key: "faq-view", path: "/admin/faqs" },
        { name: "Create New", key: "faq-create", path: "/admin/faqs/create" },
      ],
    },
    {
      name: "Ads",
      key: "ads",
      icon: Megaphone,
      children: [
        { name: "View All", key: "ad-view", path: "/admin/ad" },
        { name: "Create New", key: "ad-create", path: "/admin/ad/create" },
      ],
    },
    {
      name: "Subscribers",
      key: "newsLetter",
      icon: Mail,
      children: [{ name: "View All", key: "newsLetter-view", path: "/admin/newsLetter" }],
    },
  ];

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
      <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-6">
        Admin Panel
      </h2>
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.key}>
              <div
                onClick={() =>
                  item.children ? toggleDropdown(item.key) : navigate(item.path)
                }
                className={`flex justify-between items-center p-2 rounded cursor-pointer font-medium ${
                  activePage === item.key ? "bg-blue-100" : "hover:bg-blue-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {Icon && <Icon size={18} className="text-gray-600" />}
                  <span>{item.name}</span>
                </div>
                {item.children && (
                  <span className="text-gray-500">
                    {openDropdown === item.key ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </span>
                )}
              </div>

              {item.children && openDropdown === item.key && (
                <ul className="ml-8 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <li
                      key={child.key}
                      onClick={() => navigate(child.path)}
                      className={`p-2 rounded cursor-pointer text-sm ${
                        activePage === child.key
                          ? "bg-blue-200"
                          : "hover:bg-blue-50"
                      }`}
                    >
                      {child.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
