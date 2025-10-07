import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

const AdminCreateStory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingStory = location.state?.story || null;

  const [title, setTitle] = useState(editingStory?.title || "");
  const [introText, setIntroText] = useState(editingStory?.introText || "");
  const [content, setContent] = useState(editingStory?.content || "");
  const [author, setAuthor] = useState(editingStory?.author?._id || "");
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    editingStory?.categories?.map((c) => c._id) || []
  );
  const [status, setStatus] = useState(editingStory?.status || "active");
  const [type, setType] = useState(editingStory?.type || "written");
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(editingStory?.videoUrl || "");
  const [featuredImage, setFeaturedImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { content: editingStory?.content || "" },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:8000/api/authors"),
          axios.get("http://localhost:8000/api/categories"),
        ]);
        setAuthors(authorsRes.data?.data || []);
        setCategories(categoriesRes.data?.data || []);
      } catch (err) {
        console.error("Error fetching authors/categories", err);
        toast.error("Failed to load authors or categories");
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("introText", introText);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("categories", JSON.stringify(selectedCategories));
      formData.append("type", type);
      formData.append("videoUrl", videoUrl);
      formData.append("status", status);

      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }
      if (videoFile) {
        formData.append("videoFile", videoFile);
      }

      if (editingStory) {
        await axios.put(
          `http://localhost:8000/api/stories/${editingStory._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Story updated successfully");
      } else {
        await axios.post("http://localhost:8000/api/stories/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Story created successfully");
      }

      setTimeout(() => navigate("/admin/stories"), 1000);
    } catch (err) {
      console.error("Error saving story", err);
      toast.error("Failed to save story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-pink-600 mb-6">
        {editingStory ? "Edit Story" : "Create Story"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            Story Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={100}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 
                       text-lg font-medium placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400
                       transition duration-200"
            placeholder="Enter a catchy story title..."
          />
          <div className="flex justify-between mt-1">
            <p className="text-sm text-gray-500">
              Keep it short and engaging — max 100 characters
            </p>
            <span className="text-sm text-gray-400">{title.length}/100</span>
          </div>
        </div>

        {/* Intro Text */}
        <div>
          <label className="block font-medium mb-1">Intro Text</label>
          <textarea
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            rows="2"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-pink-300"
          />
        </div>

        {/* Content with Editor */}
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor
                apiKey="5ivm8p6aaxaabgeylol7bmbun306lc0v5huip0lrnyiacd3u"
                value={field.value}
                init={{
                  height: 400,
                  menubar: true,
                  plugins:
                    "advlist autolink lists link image media charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime table help wordcount",
                  toolbar:
                    "undo redo | blocks | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | removeformat | fullscreen preview",
                  automatic_uploads: true,
                  file_picker_types: "image media",
                  file_picker_callback: async function (callback, value, meta) {
                    const input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.setAttribute(
                      "accept",
                      meta.filetype === "image" ? "image/*" : "video/*"
                    );

                    input.onchange = async function () {
                      const file = this.files[0];
                      const formData = new FormData();
                      formData.append("file", file);

                      try {
                        const res = await axios.post(
                          "http://localhost:8000/api/uploads",
                          formData,
                          {
                            headers: { "Content-Type": "multipart/form-data" },
                          }
                        );
                        callback(res.data.url, { title: file.name });
                      } catch (err) {
                        console.error(err);
                        alert("Upload failed: " + err.message);
                      }
                    };

                    input.click();
                  },
                  images_upload_handler: async function (
                    blobInfo,
                    success,
                    failure
                  ) {
                    const formData = new FormData();
                    formData.append("file", blobInfo.blob());

                    try {
                      const res = await axios.post(
                        "http://localhost:8000/api/uploads",
                        formData,
                        {
                          headers: { "Content-Type": "multipart/form-data" },
                        }
                      );
                      success(res.data.url);
                    } catch (err) {
                      console.error(err);
                      failure("Upload failed: " + err.message);
                    }
                  },
                }}
                onEditorChange={(newValue) => {
                  field.onChange(newValue);
                  setContent(newValue);
                }}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-pink-300"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block font-medium mb-1">Story Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-pink-300"
          >
            <option value="written">Written</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/* Video Options */}
        {type === "video" && (
          <>
            <div>
              <label className="block font-medium mb-1">Video File</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="w-full border rounded-lg px-3 py-2"
              />
              {editingStory?.videoFile && (
                <video
                  src={editingStory.videoFile}
                  controls
                  className="mt-2 w-64 rounded"
                />
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                YouTube / Vimeo URL
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-pink-300"
                placeholder="https://youtube.com/..."
              />
            </div>
          </>
        )}

        {/* Featured Image */}
        <div>
          <label className="block font-medium mb-1">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
            className="w-full border rounded-lg px-3 py-2"
          />
          {editingStory?.featuredImage && (
            <img
              src={editingStory.featuredImage}
              alt="preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block font-medium mb-1">Author</label>
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-pink-300"
          >
            <option value="">Select Author</option>
            {authors.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div>
          <label className="block font-medium mb-2">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <label
                key={cat._id}
                className="flex items-center gap-1 border rounded px-2 py-1 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat._id)}
                  onChange={() => handleCategoryChange(cat._id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingStory
              ? "Update Story"
              : "Create Story"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateStory;





