import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAuthorSchema } from "../../schemas/authorSchema.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";

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

  const [selectedImageName, setSelectedImageName] = useState("");
  const [socialInputs, setSocialInputs] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
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

  useEffect(() => {
    if (authorToEdit) {
      setValue("name", authorToEdit.name || "");
      setValue("shortBio", authorToEdit.shortBio || "");
      setValue("fullBio", authorToEdit.fullBio || "");
      setValue("isVerified", authorToEdit.isVerified || false);

      const initialSocials = {};
      if (authorToEdit.socials) {
        authorToEdit.socials.forEach(social => {
          if (social.platform) {
            initialSocials[social.platform] = social.url || "";
          }
        });
      }
      setSocialInputs(initialSocials);

      if (authorToEdit.image) {
        const parts = authorToEdit.image.split("/");
        setSelectedImageName(parts[parts.length - 1]);
      }
    } else {
      reset({
        name: "",
        shortBio: "",
        fullBio: "",
        isVerified: false,
        image: null,
        socials: [],
      });
      setSelectedImageName("");
      setSocialInputs({});
    }
  }, [authorToEdit, setValue, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageName(file.name);
    }
  };

  const handleSocialChange = (platform, url) => {
    setSocialInputs(prev => ({ ...prev, [platform]: url }));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("shortBio", data.shortBio);
      formData.append("fullBio", data.fullBio);
      formData.append("isVerified", data.isVerified);

      const socialsWithUrls = platforms.map(platform => ({
        platform: platform.name,
        url: socialInputs[platform.name] || ""
      }));
      formData.append("socials", JSON.stringify(socialsWithUrls));

      const fileInput = document.querySelector('input[name="image"]');
      if (fileInput && fileInput.files[0]) {
        formData.append("image", fileInput.files[0]);
      }

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
        });
        setSelectedImageName("");
        setSocialInputs({});
      }

      if (refreshAuthors) refreshAuthors();

      setTimeout(() => {
        navigate("/admin/authors");
      }, 1500);
    } catch (err) {
      console.error(err.response || err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="text-2xl font-bold mb-4 text-[var(--pink-dark)]">
        {authorToEdit ? "Edit Author" : "Create Author"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="border p-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <textarea
          placeholder="Short Bio"
          {...register("shortBio")}
          className="border p-2 rounded"
        />
        {errors.shortBio && (
          <p className="text-red-500 text-sm">{errors.shortBio.message}</p>
        )}

        <textarea
          placeholder="Full Bio"
          {...register("fullBio")}
          className="border p-2 rounded"
        />
        {errors.fullBio && (
          <p className="text-red-500 text-sm">{errors.fullBio.message}</p>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isVerified")}
            className="w-4 h-4"
          />
          <label className="text-gray-700">Verified Author</label>
        </div>

        <div>
          <label className="block font-semibold text-[var(--pink-dark)] mb-1">
            Author Image
          </label>
          <div className="relative">
            <input
              type="text"
              value={selectedImageName || ""}
              readOnly
              placeholder="Choose an image..."
              className="border p-2 rounded w-full cursor-pointer bg-gray-50 text-gray-600"
              onClick={() =>
                document.getElementById("hiddenFileInput").click()
              }
            />
            <input
              id="hiddenFileInput"
              type="file"
              accept="image/*"
              {...register("image")}
              name="image"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Social Links with URLs */}
        <div>
          <label className="font-semibold text-[var(--pink-dark)]">
            Social Links
          </label>
          <div className="flex flex-col gap-3 mt-2">
            {platforms.map((platformObj) => {
              const Icon = platformObj.icon;
              const urlValue = socialInputs[platformObj.name] || "";

              return (
                <div
                  key={platformObj.name}
                  className="flex items-center gap-3 border p-2 rounded"
                >
                  <Icon className="text-xl text-[var(--pink-dark)]" />
                  <input
                    type="url"
                    placeholder={`Enter ${platformObj.name} link`}
                    value={urlValue}
                    onChange={(e) => handleSocialChange(platformObj.name, e.target.value)}
                    className="flex-1 border rounded px-2 py-1"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-[var(--pink-dark)] hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
        >
          {authorToEdit ? "Update Author" : "Create Author"}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateAuthor;