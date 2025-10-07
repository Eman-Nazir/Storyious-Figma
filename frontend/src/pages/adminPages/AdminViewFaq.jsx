import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminViewFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const [expanded, setExpanded] = useState({});

  const fetchFAQs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/faqs");
      setFaqs(response.data?.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching FAQs");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/faqs/categories");
      setCategories(response.data?.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching categories");
    }
  };

  useEffect(() => {
    fetchFAQs();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/faqs/${id}`);
      toast.success("FAQ deleted successfully");
      setFaqs(faqs.filter((faq) => faq._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting FAQ");
    }
  };

  const startEdit = (faq) => {
    setEditId(faq._id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
    setEditCategory(faq.category);
  };

  const handleEditSave = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/faqs/${id}`, {
        question: editQuestion,
        answer: editAnswer,
        category: editCategory,
      });

      toast.success("FAQ updated successfully");
      setFaqs(faqs.map((faq) => (faq._id === id ? response.data.data : faq)));
      setEditId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating FAQ");
    }
  };

  const getCategoryLabel = (category) => {
    return category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqs = filteredFaqs.slice(indexOfFirstItem, indexOfLastItem);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4 bg-white shadow rounded mt-6">
      <h2 className="text-lg font-bold mb-4">All FAQs</h2>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded w-1/2"
        />

        <div className="flex items-center space-x-2">
          <label className="text-gray-700">Que per page:</label>
          <input
            type="number"
            min="1"
            max="50"
            value={itemsPerPage}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value > 0 && value <= 50) {
                setItemsPerPage(value);
                setCurrentPage(1);
              }
            }}
            className="border border-gray-300 rounded-lg px-2 py-1 w-20 text-sm focus:ring-2 focus:ring-pink-300 outline-none"
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : currentFaqs.length === 0 ? (
        <p>No FAQs found</p>
      ) : (
        <ul className="space-y-3">
          {currentFaqs.map((faq) => (
            <li key={faq._id} className="border p-3 rounded">
              {editId === faq._id ? (
                <div>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full border px-2 py-1 rounded mb-2"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {getCategoryLabel(cat)}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={editQuestion}
                    onChange={(e) => setEditQuestion(e.target.value)}
                    className="w-full border px-2 py-1 rounded mb-2"
                  />

                  <textarea
                    value={editAnswer}
                    onChange={(e) => setEditAnswer(e.target.value)}
                    className="w-full border px-2 py-1 rounded mb-2"
                    rows="3"
                  />

                  <button
                    onClick={() => handleEditSave(faq._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                      {getCategoryLabel(faq.category)}
                    </span>
                  </div>

                  <p
                    className={`text-gray-600 mt-2 ${
                      expanded[faq._id] ? "" : "line-clamp-2"
                    }`}
                  >
                    {faq.answer}
                  </p>

                  <button
                    onClick={() => toggleExpand(faq._id)}
                    className="text-pink-500 text-sm underline mt-1"
                  >
                    {expanded[faq._id] ? "Show Less" : "Show More"}
                  </button>

                  <span className="text-xs text-gray-400 block mt-1">
                    Slug: {faq.slug}
                  </span>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => startEdit(faq)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminViewFAQs;
