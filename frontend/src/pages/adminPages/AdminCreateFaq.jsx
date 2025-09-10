import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const faqSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters long" }),
  answer: z
    .string()
    .min(10, { message: "Answer must be at least 10 characters long" }),
});

const AdminCreateFAQ = ({ onFAQCreated }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(faqSchema),
  });

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
        {/* Question Field */}
        <div>
          <label className="block font-medium">Question</label>
          <input
            type="text"
            {...register("question")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter question"
          />
          {errors.question && (
            <p className="text-red-500 text-sm mt-1">
              {errors.question.message}
            </p>
          )}
        </div>

        {/* Answer Field */}
        <div>
          <label className="block font-medium">Answer</label>
          <textarea
            {...register("answer")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter answer"
          ></textarea>
          {errors.answer && (
            <p className="text-red-500 text-sm mt-1">
              {errors.answer.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
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
