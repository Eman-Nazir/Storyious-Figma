
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminCreateAd = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editingAd = location.state; 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    buttonText: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("No file chosen"); 

  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingAd) {
      setFormData({
        title: editingAd.title || "",
        description: editingAd.description || "",
        buttonText: editingAd.buttonText || "",
      });

      if (editingAd.imageUrl) {
        const urlParts = editingAd.imageUrl.split("/");
        setImageName(urlParts[urlParts.length - 1]); 
      }
    }
  }, [editingAd]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("buttonText", formData.buttonText);
      if (imageFile) form.append("image", imageFile);

      if (editingAd) {
        await axios.put(
          `http://localhost:8000/api/stories/ads/${editingAd._id}`,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage(" Ad updated successfully!");
      } else {
        await axios.post("http://localhost:8000/api/stories/ads", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Ad created successfully!");
      }

      navigate("/admin/ad");
    } catch (err) {
      setMessage(" Error saving ad");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">
        {editingAd ? "Edit Ad" : "Create New Ad"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title (optional)"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="buttonText"
          placeholder="Button Text (optional)"
          value={formData.buttonText}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="w-full">
          <label className="block text-gray-700 text-sm mb-1">Upload Image</label>
          <div
            className="flex items-center border p-2 rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="flex-1 text-gray-600 truncate">{imageName}</span>
            <span className="ml-2 bg-gray-400 text-white px-3 py-1 rounded">
              Choose File
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
        >
          {loading ? "Saving..." : editingAd ? "Update Ad" : "Create Ad"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AdminCreateAd;
