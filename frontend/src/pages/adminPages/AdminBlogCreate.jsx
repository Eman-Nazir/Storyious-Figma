import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "../../schemas/blogSchema";

const AdminBlogCreate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingBlog = location.state?.blog;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
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

  const { fields, append, remove } = useFieldArray({
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

  const removeCard = (index) => {
    remove(index);
  };

  const handleFileChange = (index, file) => {
    setValue(`cards.${index}.image`, file);
    setValue(`cards.${index}.fileName`, file.name);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("introText", data.introText);

      const cardsData = data.cards.map((card) => ({
        title: card.title,
        subtitle: card.subtitle,
        description: card.description,
        button_text: card.button_text,
        button_link: card.button_link,
        oldImage: card.oldImage || "",
      }));

      formData.append("cards", JSON.stringify(cardsData));

      data.cards.forEach((card, index) => {
        if (card.image && card.image instanceof File) {
          formData.append("images", card.image);
        }
      });

      const res = editingBlog
        ? await axios.put(`http://localhost:8000/api/blogs/${editingBlog._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axios.post("http://localhost:8000/api/blogs", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      if (res.status >= 200 && res.status < 300) {
        toast.success(editingBlog ? "Blog updated successfully!" : "Blog created successfully!");
        
        if (!editingBlog) {
          reset();
        }
        
        setTimeout(() => {
          navigate("/admin/blogs");
        }, 1500);
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      console.error("Error saving blog:", err);
      toast.error(" Failed to save blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cards = watch("cards");

  return (
    <div className="container mx-auto p-6 bg-white shadow rounded-lg mb-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-6">{editingBlog ? "Edit Blog" : "Create Blog"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
          <input
            type="text"
            placeholder="Main Title"
            {...register("title")}
            className="w-full border p-2 rounded"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Intro Text</label>
          <textarea
            placeholder="Intro Text"
            {...register("introText")}
            className="w-full border p-2 rounded"
            rows="3"
          />
        </div>

        {fields.map((card, index) => (
          <div key={card.id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Card {index + 1}</h2>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCard(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove Card
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Title</label>
                <input
                  type="text"
                  placeholder="Card Title"
                  {...register(`cards.${index}.title`)}
                  className="w-full border p-2 rounded"
                />
                {errors.cards?.[index]?.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.cards[index].title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="Subtitle"
                  {...register(`cards.${index}.subtitle`)}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Description"
                {...register(`cards.${index}.description`)}
                className="w-full border p-2 rounded"
                rows="3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                  type="text"
                  placeholder="Button Text"
                  {...register(`cards.${index}.button_text`)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                <input
                  type="text"
                  placeholder="Button Link"
                  {...register(`cards.${index}.button_link`)}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>


          <div className="mt-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
  
  <div className="flex items-center">
    <input
      type="text"
      value={
        cards[index].image
          ? cards[index].image.name
          : cards[index].fileName || "No file chosen"
      }
      readOnly
      className="flex-1 border rounded-l px-3 py-2 text-sm text-gray-600 bg-gray-50"
    />

    <input
      type="file"
      id={`file-${index}`}
      style={{ display: "none" }}
      accept="image/*"
      onChange={(e) => handleFileChange(index, e.target.files[0])}
    />

    <label
      htmlFor={`file-${index}`}
      className="px-4 py-2 bg-gray-200 border border-l-0 rounded-r cursor-pointer text-sm text-gray-700 hover:bg-gray-300"
    >
      Choose File
    </label>
  </div>
</div>


            
          </div>
        ))}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={addCard}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            + Add Card
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : editingBlog ? "Update Blog" : "Create Blog"}
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default AdminBlogCreate;










