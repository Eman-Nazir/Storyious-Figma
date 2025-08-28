import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AdminCreateCategory = () => {
  const location = useLocation();
  const editCategory = location.state?.category || null;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  // Pre-fill form if editing
  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name || "");
      setDescription(editCategory.description || "");
    }
  }, [editCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Category name is required");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (image) formData.append("image", image);

      if (editCategory) {
        // Update existing category
        await axios.put(
          `http://localhost:8000/api/categories/${editCategory._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Category updated successfully!");
      } else {
        // Create new category
        await axios.post(
          "http://localhost:8000/api/categories/create",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Category created successfully!");
        setName("");
        setDescription("");
        setImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to save category");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {editCategory ? "Edit Category" : "Create New Category"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />

          {/* Show existing image if editing & no new one picked */}
          {editCategory?.image && !image && (
            <img
              src={`http://localhost:8000/uploads/${editCategory.image}`}
              alt={editCategory.name}
              className="h-24 w-24 mt-2 object-cover rounded"
            />
          )}

          {/* Show preview if new image selected */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-24 w-24 mt-2 object-cover rounded"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--pink-dark)] text-white px-4 py-2 rounded"
        >
          {loading
            ? "Saving..."
            : editCategory
            ? "Update Category"
            : "Create Category"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCategory;
