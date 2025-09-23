import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const faqSchema = z.object({
  question: z.string().min(5, { message: "Question must be at least 5 characters long" }),
  answer: z.string().min(10, { message: "Answer must be at least 10 characters long" }),
  category: z.string().min(1, { message: "Category is required" }),
});

const AdminCreateFAQ = ({ onFAQCreated }) => {
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: { category: "general" },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/faqs/categories");
        setCategories(res.data.data);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/faqs", data);
      toast.success("FAQ created successfully");
      reset();
      if (onFAQCreated) onFAQCreated(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating FAQ");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Create FAQ</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <select {...register("category")} className="w-full border px-3 py-2 rounded">
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace("-", " ")}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Question */}
        <div>
          <label className="block font-medium">Question</label>
          <input
            type="text"
            {...register("question")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter question"
          />
          {errors.question && (
            <p className="text-red-500 text-sm mt-1">{errors.question.message}</p>
          )}
        </div>

        {/* Answer */}
        <div>
          <label className="block font-medium">Answer</label>
          <textarea
            {...register("answer")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter answer"
            rows="4"
          ></textarea>
          {errors.answer && (
            <p className="text-red-500 text-sm mt-1">{errors.answer.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-pink-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add FAQ"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateFAQ;
