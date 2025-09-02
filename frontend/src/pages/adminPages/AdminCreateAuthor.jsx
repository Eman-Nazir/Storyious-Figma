import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAuthorSchema } from "../../schemas/authorSchema.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaInstagram } from "react-icons/fa";

const platforms = [
  { name: "facebook", icon: FaFacebookF },
  { name: "twitter", icon: FaTwitter },
  { name: "linkedin", icon: FaLinkedinIn },
  { name: "pinterest", icon: FaPinterestP },
  { name: "instagram", icon: FaInstagram },
];

const AdminCreateAuthor = ({ refreshAuthors }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const authorToEdit = location.state?.author || null;

  const [previewImage, setPreviewImage] = useState(null);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(createAuthorSchema),
    defaultValues: {
      name: "",
      shortBio: "",
      fullBio: "",
      isVerified: false,
      image: null,
      socials: [],
    },
  });

  const watchSocials = watch("socials");

  useEffect(() => {
    if (authorToEdit) {
      setValue("name", authorToEdit.name || "");
      setValue("shortBio", authorToEdit.shortBio || "");
      setValue("fullBio", authorToEdit.fullBio || "");
      setValue("isVerified", authorToEdit.isVerified || false);
      setValue("socials", authorToEdit.socials || []);
      setPreviewImage(authorToEdit.image || null); 
    } else {
      reset({
        name: "",
        shortBio: "",
        fullBio: "",
        isVerified: false,
        image: null,
        socials: [],
      });
      setPreviewImage(null);
    }
  }, [authorToEdit, setValue, reset]);

  const toggleSocial = (platformObj) => {
    const socials = watchSocials || [];
    const exists = socials.find((s) => s.platform === platformObj.name);
    if (exists) {
      setValue("socials", socials.filter((s) => s.platform !== platformObj.name));
    } else {
      setValue("socials", [...socials, { platform: platformObj.name }]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("shortBio", data.shortBio);
      formData.append("fullBio", data.fullBio);
      formData.append("isVerified", data.isVerified);

      const fileInput = document.querySelector('input[name="image"]');
      if (fileInput && fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

      (data.socials || []).forEach((social, i) => {
        formData.append(`socials[${i}][platform]`, social.platform);
      });

      if (authorToEdit) {
        await axios.put(
          `http://localhost:8000/api/authors/${authorToEdit._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Author updated successfully!");
      } else {
        await axios.post("http://localhost:8000/api/authors", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Author created successfully!");
        reset({
          name: "",
          shortBio: "",
          fullBio: "",
          isVerified: false,
          image: null,
          socials: [],
        });
        setPreviewImage(null);
      }

      if (refreshAuthors) refreshAuthors();
      navigate("/admin/authors");

    } catch (err) {
      console.error(err.response || err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[var(--pink-dark)]">
        {authorToEdit ? "Edit Author" : "Create Author"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input type="text" placeholder="Name" {...register("name")} className="border p-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <textarea placeholder="Short Bio" {...register("shortBio")} className="border p-2 rounded" />
        {errors.shortBio && <p className="text-red-500 text-sm">{errors.shortBio.message}</p>}

        <textarea placeholder="Full Bio" {...register("fullBio")} className="border p-2 rounded" />
        {errors.fullBio && <p className="text-red-500 text-sm">{errors.fullBio.message}</p>}

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isVerified")} className="w-4 h-4" />
          <label className="text-gray-700">Verified Author</label>
        </div>

        {previewImage && (
          <div className="mb-2">
            <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded" />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          {...register("image")}
          name="image"
          onChange={handleImageChange}
          className="border p-2 rounded"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

        <div>
          <label className="font-semibold text-[var(--pink-dark)]">Social Icons</label>
          <div className="flex gap-3 mt-2">
            {platforms.map((platformObj) => {
              const selected = (watchSocials || []).find((s) => s.platform === platformObj.name);
              const Icon = platformObj.icon;
              return (
                <button
                  type="button"
                  key={platformObj.name}
                  onClick={() => toggleSocial(platformObj)}
                  className={`p-2 rounded border text-xl transition-all duration-150 ${
                    selected
                      ? "bg-[var(--pink-dark)] text-white border-[var(--pink-dark)] scale-110 shadow-lg"
                      : "bg-white text-gray-700 border-gray-300 hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <Icon />
                </button>
              );
            })}
          </div>
        </div>

        <button type="submit" className="mt-4 bg-[var(--pink-dark)] hover:bg-pink-700 text-white px-4 py-2 rounded-lg">
          {authorToEdit ? "Update Author" : "Create Author"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateAuthor;
