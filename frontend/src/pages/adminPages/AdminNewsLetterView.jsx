import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pencil, Trash2, Save, X } from "lucide-react";

const AdminNewsletterView = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editEmail, setEditEmail] = useState("");

  const fetchSubscribers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/newsletter");
      setSubscribers(data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/newsletter/${id}`);
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      toast.success("Subscriber deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting subscriber");
    }
  };

  const startEdit = (subscriber) => {
    setEditId(subscriber._id);
    setEditEmail(subscriber.email);
  };

  const handleEditSave = async (id) => {
    try {
      const { data } = await axios.put(`http://localhost:8000/api/newsletter/${id}`, {
        email: editEmail,
      });
      setSubscribers((prev) => prev.map((s) => (s._id === id ? data : s)));
      toast.success("Subscriber updated successfully!");
      setEditId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating subscriber");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">Subscribers</h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-200 text-pink-900">
              <th className="p-3 border-b border-pink-300 text-left font-semibold">
                Email
              </th>
              <th className="p-3 border-b border-pink-300 text-left font-semibold">
                Subscribed On
              </th>
              <th className="p-3 border-b border-pink-300 text-left font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : subscribers.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500 italic">
                  No subscribers found.
                </td>
              </tr>
            ) : (
              subscribers.map((sub, index) => (
                <tr
                  key={sub._id}
                  className={`${
                    index % 2 === 0 ? "bg-pink-50" : "bg-white"
                  } hover:bg-pink-100 transition`}
                >
                  <td className="p-3 border-b border-pink-200">
                    {editId === sub._id ? (
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="border border-pink-400 rounded px-2 py-1 w-full"
                      />
                    ) : (
                      sub.email
                    )}
                  </td>
                  <td className="p-3 border-b border-pink-200">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border-b border-pink-200 flex items-center gap-3">
                    {editId === sub._id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(sub._id)}
                          className="text-green-600 hover:text-green-800"
                          title="Save"
                        >
                          <Save size={20} />
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="text-gray-600 hover:text-gray-800"
                          title="Cancel"
                        >
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(sub)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(sub._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNewsletterView;
