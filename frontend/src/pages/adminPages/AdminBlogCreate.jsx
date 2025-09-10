



import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../../schemas/blogSchema";

const AdminBlogCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingBlog = location.state?.blog;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      introText: "",
      cards: [
        { title: "", subtitle: "", description: "", button_text: "", button_link: "", image: null },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "cards",
  });

  useEffect(() => {
    if (editingBlog) {
      setValue("title", editingBlog.title || "");
      setValue("introText", editingBlog.introText || "");
      setValue(
        "cards",
        editingBlog.cards.length > 0
          ? editingBlog.cards.map((card) => ({
              title: card.title || "",
              subtitle: card.subtitle || "",
              description: card.description || "",
              button_text: card.button_text || "",
              button_link: card.button_link || "",
              image: null, 
              oldImage: card.image || "",
              fileName: card.image ? card.image.split("/").pop() : "",
            }))
          : [{ title: "", subtitle: "", description: "", button_text: "", button_link: "", image: null }]
      );
    }
  }, [editingBlog, setValue]);

  const addCard = () => {
    append({ title: "", subtitle: "", description: "", button_text: "", button_link: "", image: null });
  };

  const handleFileChange = (index, file) => {
    setValue(`cards.${index}.image`, file);
    setValue(`cards.${index}.fileName`, file.name);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("introText", data.introText);

      formData.append(
        "cards",
        JSON.stringify(
          data.cards.map((card) => ({
            title: card.title,
            subtitle: card.subtitle,
            description: card.description,
            button_text: card.button_text,
            button_link: card.button_link,
            oldImage: card.oldImage || "",
          }))
        )
      );

      data.cards.forEach((card) => {
        if (card.image) formData.append("images", card.image);
      });

      const res = editingBlog
        ? await axios.put(`http://localhost:8000/api/blogs/${editingBlog._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post("http://localhost:8000/api/blogs", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      if (res.data.success) {
        toast.success(editingBlog ? "Blog updated successfully!" : "Blog created successfully!");
        navigate("/admin/blogs");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save blog");
    }
  };

  const cards = watch("cards");

  return (
    <div className="container mx-auto p-6 bg-white shadow rounded-lg mb-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-6">{editingBlog ? "Edit Blog" : "Create Blog"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input
          type="text"
          placeholder="Main Title"
          {...register("title")}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <textarea
          placeholder="Intro Text"
          {...register("introText")}
          className="w-full border p-2 mb-2 rounded"
          rows="3"
        />

        {fields.map((card, index) => (
          <div key={card.id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Card {index + 1}</h2>
            <input
              type="text"
              placeholder="Card Title"
              {...register(`cards.${index}.title`)}
              className="w-full border p-2 mb-2 rounded"
            />
            {errors.cards?.[index]?.title && (
              <p className="text-red-500">{errors.cards[index].title.message}</p>
            )}

            <input
              type="text"
              placeholder="Subtitle"
              {...register(`cards.${index}.subtitle`)}
              className="w-full border p-2 mb-2 rounded"
            />
            <textarea
              placeholder="Description"
              {...register(`cards.${index}.description`)}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Button Text"
              {...register(`cards.${index}.button_text`)}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Button Link"
              {...register(`cards.${index}.button_link`)}
              className="w-full border p-2 mb-2 rounded"
            />

            <div>
              <input
                type="text"
                value={cards[index].fileName || card.oldImage?.split("/").pop() || ""}
                readOnly
                placeholder="Choose an image..."
                className="w-full border p-2 mb-1 rounded cursor-pointer bg-gray-50 text-gray-600"
                onClick={() => document.getElementById(`hiddenFileInput-${index}`).click()}
              />
              <input
                id={`hiddenFileInput-${index}`}
                type="file"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="hidden"
              />
              {errors.cards?.[index]?.image && (
                <p className="text-red-500">{errors.cards[index].image.message}</p>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addCard}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          + Add Card
        </button>
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 mx-4 py-2 rounded hover:bg-pink-700"
        >
          {editingBlog ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AdminBlogCreate;
