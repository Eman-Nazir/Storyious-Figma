
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, updateCategorySchema } from "../../schemas/categorySchema.js";

const AdminCreateCategory = () => {
  const location = useLocation();
  const editCategory = location.state?.category || null;

  const schema = editCategory ? updateCategorySchema : categorySchema;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      image: null,
    },
  });

  const image = watch("image");

  useEffect(() => {
    if (editCategory) {
      setValue("name", editCategory.name || "");
      setValue("description", editCategory.description || "");
    }
  }, [editCategory, setValue]);

  // const onSubmit = async (data) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("name", data.name);
  //     formData.append("description", data.description);

  //     if (data.image && data.image.length > 0) {
  //       formData.append("image", data.image[0]); 
  //     }

  //     if (editCategory) {
  //       await axios.put(
  //         `http://localhost:8000/api/categories/${editCategory._id}`,
  //         formData,
  //         { headers: { "Content-Type": "multipart/form-data" } }
  //       );
  //       toast.success(" Category updated successfully!");
  //     } else {
  //       await axios.post(
  //         "http://localhost:8000/api/categories/create",
  //         formData,
  //         { headers: { "Content-Type": "multipart/form-data" } }
  //       );
  //       toast.success(" Category created successfully!");
  //       reset(); 
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(" Failed to save category");
  //   }
  // };



  const onSubmit = async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); 
    }

    if (editCategory) {
      // Wait for update API
      await axios.put(
        `http://localhost:8000/api/categories/${editCategory._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Category updated successfully!");
    } else {
      // Wait for create API
      await axios.post(
        "http://localhost:8000/api/categories/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Category created successfully!");
      reset(); 
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to save category");
  }
};

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-md mx-auto mt-10">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold mb-4">
        {editCategory ? "Edit Category" : "Create New Category"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Category Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          {/* ✅ Show existing Cloudinary image if editing */}
          {editCategory?.image && !image?.length && (
            <img
              src={editCategory.image}
              alt={editCategory.name}
              className="h-24 w-24 mt-2 object-cover rounded"
            />
          )}

          {/* ✅ Show new local preview if uploading */}
          {image?.length > 0 && (
            <img
              src={URL.createObjectURL(image[0])}
              alt="Preview"
              className="h-24 w-24 mt-2 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[var(--pink-dark)] text-white px-4 py-2 rounded"
        >
          {isSubmitting
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
