import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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

const AdminCreateAuthor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authorToEdit = location.state?.author || null;

  const [name, setName] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [fullBio, setFullBio] = useState("");
  const [image, setImage] = useState(null);
  const [socials, setSocials] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  // Pre-fill form if editing
  useEffect(() => {
    if (authorToEdit) {
      setName(authorToEdit.name || "");
      setShortBio(authorToEdit.shortBio || "");
      setFullBio(authorToEdit.fullBio || "");
      setIsVerified(authorToEdit.isVerified || false);

      const mappedSocials = (authorToEdit.socials || []).map((s) => {
        const platform = platforms.find((p) => p.name === s.icon.toLowerCase());
        return {
          name: platform?.name || s.icon.toLowerCase(),
          icon: platform?.icon || FaFacebookF,
          url: s.url || "",
        };
      });
      setSocials(mappedSocials);

      setImage(authorToEdit.image || null);
    }
  }, [authorToEdit]);

  const toggleSocial = (platformObj) => {
    const exists = socials.find((s) => s.name === platformObj.name);
    if (exists) {
      setSocials(socials.filter((s) => s.name !== platformObj.name));
    } else {
      setSocials([...socials, { ...platformObj, url: "" }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("shortBio", shortBio);
      formData.append("fullBio", fullBio);
      formData.append("isVerified", isVerified);
      if (image instanceof File) formData.append("image", image);

      socials.forEach((social, i) => {
        formData.append(`socials[${i}][icon]`, social.name);
        formData.append(`socials[${i}][url]`, social.url || "");
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
      }

      navigate("/admin/authors");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[var(--pink-dark)]">
        {authorToEdit ? "Edit Author" : "Create Author"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Short Bio"
          value={shortBio}
          onChange={(e) => setShortBio(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Full Bio"
          value={fullBio}
          onChange={(e) => setFullBio(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isVerified}
            onChange={() => setIsVerified(!isVerified)}
            className="w-4 h-4"
          />
          <label className="text-gray-700">Verified Author</label>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
        />

        <div>
          <label className="font-semibold text-[var(--pink-dark)]">Social Icons</label>
          <div className="flex gap-3 mt-2">
            {platforms.map((platformObj) => {
              const selected = socials.find((s) => s.name === platformObj.name);
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
