



import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";

const AdminCreateStory = () => {
  const [title, setTitle] = useState("");
  const [introText, setIntroText] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/authors");
        setAuthors(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching authors:", error);
        toast.error("Failed to load authors");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        setCategories(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchAuthors();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !introText || !content || !authorId || !categoryId) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("introText", introText);
      formData.append("content", content);
      formData.append("author", authorId);
      formData.append("category", categoryId);

      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }

      await axios.post("http://localhost:8000/api/stories/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Story created successfully!");
      setTitle("");
      setIntroText("");
      setContent("");
      setAuthorId("");
      setCategoryId("");
      setFeaturedImage(null);
    } catch (error) {
      console.error("Error creating story:", error);
      toast.error("Failed to create story");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Intro Text */}
        <div>
          <label className="block mb-1 font-medium">Intro Text</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows="3"
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="prose">
          <label className="block mb-1 font-medium">Content</label>
          <Editor
            apiKey="5ivm8p6aaxaabgeylol7bmbun306lc0v5huip0lrnyiacd3u" 
            value={content}
            init={{
              height: 400,
              menubar: true,
              plugins:
                "advlist autolink lists link image charmap preview anchor " +
                "searchreplace visualblocks code fullscreen " +
                "insertdatetime media table help wordcount",
              toolbar:
                "undo redo | blocks | " +
                "bold italic underline forecolor backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "link image media | removeformat | fullscreen preview",
              automatic_uploads: true,
              file_picker_types: "image",
              file_picker_callback: (cb, value, meta) => {
                if (meta.filetype === "image") {
                  const input = document.createElement("input");
                  input.setAttribute("type", "file");
                  input.setAttribute("accept", "image/*");
                  input.onchange = function () {
                    const file = this.files[0];
                    const reader = new FileReader();
                    reader.onload = function () {
                      cb(reader.result, { title: file.name });
                    };
                    reader.readAsDataURL(file);
                  };
                  input.click();
                }
              },
            }}
            onEditorChange={(newContent) => setContent(newContent)}
          />


        </div>

        {/* Author */}
        <div>
          <label className="block mb-1 font-medium">Author</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block mb-1 font-medium">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          Create Story
        </button>
      </form>
    </div>
  );
};

export default AdminCreateStory;










