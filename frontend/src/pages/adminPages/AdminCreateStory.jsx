import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storySchema, updateStorySchema } from "../../schemas/storySchema";

const AdminCreateStory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editStory = location.state?.story || null;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editStory ? updateStorySchema : storySchema),
    defaultValues: {
      title: editStory?.title || "",
      introText: editStory?.introText || "",
      content: editStory?.content || "",
      authorId: editStory?.author?._id || "",
      categoryId: editStory?.category?._id || "",
      featuredImage: null,
    },
  });

  const fileInputRef = useRef(null);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedImageName, setSelectedImageName] = useState(
    editStory?.featuredImage
      ? "Current file: " + editStory.featuredImage.split("/").pop()
      : ""
  );

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/authors");
        setAuthors(res.data?.data || []);
      } catch {
        toast.error("Failed to load authors");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        setCategories(res.data?.data || []);
      } catch {
        toast.error("Failed to load categories");
      }
    };

    fetchAuthors();
    fetchCategories();
  }, []);

  

useEffect(() => {
  if (editStory && authors.length > 0 && categories.length > 0) {
    reset({
      title: editStory.title || "",
      introText: editStory.introText || "",
      content: editStory.content || "",
      authorId: editStory.author?._id || "",
      categoryId: editStory.category?._id || "",
      featuredImage: null,
    });

    if (editStory.featuredImage) {
      const parts = editStory.featuredImage.split("/");
      setSelectedImageName("Current file: " + parts[parts.length - 1]);
    }
  }
}, [editStory, authors, categories, reset]);




  const calculateReadTime = (text) => {
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.ceil(words / 200) + " min read";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("featuredImage", file); 
      setSelectedImageName(file.name);
    } else {
      setSelectedImageName(
        editStory?.featuredImage
          ? "Current file: " + editStory.featuredImage.split("/").pop()
          : ""
      );
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("introText", data.introText);
      formData.append("content", data.content);
      formData.append("author", data.authorId);
      formData.append("category", data.categoryId);
      formData.append("meta[readTime]", calculateReadTime(data.content));
      formData.append("meta[views]", editStory?.meta?.views || 0);

      if (data.featuredImage instanceof File) {
        formData.append("featuredImage", data.featuredImage);
      }

      if (editStory) {
        await axios.put(
          `http://localhost:8000/api/stories/${editStory._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success("Story updated successfully!");
      } else {
        await axios.post("http://localhost:8000/api/stories/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Story created successfully!");
      }

      navigate("/admin/stories");
    } catch (error) {
      toast.error("Failed to save story");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">
        {editStory ? "Edit Story" : "Create New Story"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Intro Text */}
        <div>
          <label className="block mb-1 font-medium">Intro Text</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows="3"
            {...register("introText")}
          />
          {errors.introText && (
            <p className="text-red-500">{errors.introText.message}</p>
          )}
        </div>

        {/* Content Editor */}
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
                onEditorChange={field.onChange}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block mb-1 font-medium">Author</label>
          <select
            className="w-full border px-3 py-2 rounded"
            {...register("authorId")}
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
          {errors.authorId && (
            <p className="text-red-500">{errors.authorId.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            className="w-full border px-3 py-2 rounded"
            {...register("categoryId")}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Featured Image */}
        <div>
          <label className="block mb-1 font-medium">Featured Image</label>
          <div className="relative">
            <input
              type="text"
              value={selectedImageName || ""}
              readOnly
              placeholder="Choose an image..."
              className="border p-2 rounded w-full cursor-pointer bg-gray-50 text-gray-600"
              onClick={triggerFileInput}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          {errors.featuredImage && (
            <p className="text-red-500">{errors.featuredImage.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          {editStory ? "Update Story" : "Create Story"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateStory;
