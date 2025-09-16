import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminViewFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [editCategory, setEditCategory] = useState("");

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

  useEffect(() => {
    fetchFAQs();
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

      setFaqs(
        faqs.map((faq) =>
          faq._id === id ? response.data.data : faq
        )
      );

      setEditId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating FAQ");
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      general: "General",
      scary: "Scary Stories",
      moral: "Moral Stories",
      fairytales: "Fairytales",
      fables: "Fables",
      classic: "Classic Stories",
      bedtime: "Bedtime Stories"
    };
    
    return categories[category] || category;
  };

  return (
    <div className="p-4 bg-white shadow rounded mt-6">
      <h2 className="text-lg font-bold mb-4">All FAQs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : faqs.length === 0 ? (
        <p>No FAQs found</p>
      ) : (
        <ul className="space-y-3">
          {faqs.map((faq) => (
            <li key={faq._id} className="border p-3 rounded">
              {editId === faq._id ? (
                <div>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full border px-2 py-1 rounded mb-2"
                  >
                    <option value="general">General</option>
                    <option value="scary">Scary Stories</option>
                    <option value="moral">Moral Stories</option>
                    <option value="fairytales">Fairytales</option>
                    <option value="fables">Fables</option>
                    <option value="classic">Classic Stories</option>
                    <option value="bedtime">Bedtime Stories</option>
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
                  <p className="text-gray-600 mt-2">{faq.answer}</p>
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
    </div>
  );
};

export default AdminViewFAQs;