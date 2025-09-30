import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import recaptcha from '../../assets/images/recaptcha.png';

const SubmissionForm = () => {
  const initialData = {
    name: '',
    age: '',
    city: '',
    country: '',
    qualification: '',
    institution: '',
    profession: '',
    email: '',
    phone: '',
    about: '',
    reason: '',
  };

  const [formData, setFormData] = useState(initialData);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialData);
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name?.trim() || !formData.email?.trim() || !formData.phone?.trim()) {
      toast.error("Name, Email, and Phone are required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] && formData[key].trim() !== '') {
          formDataToSend.append(key, formData[key].trim());
        }
      });

      if (file) {
        formDataToSend.append("file", file);
        console.log("File appended:", file.name);
      }

      const response = await fetch("http://localhost:8000/api/submissions/create", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      console.log("✅ Submission success:", data);
      toast.success("Form submitted successfully!");
      handleReset();
    } catch (err) {
      console.error("❌ Error submitting form:", err.message);
      toast.error(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-[1200px] mx-auto bg-white border border-[var(--border-gray)] rounded-lg my-10 md:mx-12 shadow-sm p-6 lg:mx-22"
      >
        <h2 className="text-2xl font-bold mb-2 text-center text-[var(--text-dark)]">Submission Form</h2>
        <p className="text-center text-[var(--text-muted)] mb-6">
          Please fill in the required fields and upload your article (.doc or .docx).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Name', name: 'name', placeholder: 'Write your name here', required: true },
            { label: 'Age', name: 'age', placeholder: 'Ex: 25 Years', required: false },
            { label: 'Email', name: 'email', placeholder: 'Write your email here', required: true },
            { label: 'City', name: 'city', placeholder: 'Write your city here', required: false },
            { label: 'Country', name: 'country', placeholder: 'Write your country here', required: false },
            { label: 'Qualification', name: 'qualification', placeholder: 'Ex: Masters or Graduate', required: false },
            { label: 'Profession', name: 'profession', placeholder: 'Ex: Teacher, Developer, Writer', required: false },
            { label: 'Institution', name: 'institution', placeholder: 'Your University or College', required: false },
          ].map(({ label, name, placeholder, required }) => (
            <div key={name}>
              <label className="block font-semibold mb-1 text-[var(--text-dark)]">
                {label} {required && '*'}
              </label>
              <input
                name={name}
                value={formData[name]}
                placeholder={placeholder}
                onChange={handleChange}
                className="w-full border border-[var(--border-gray)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              {name !== 'name' && name !== 'age' && (
                <p className="text-sm text-[var(--text-muted)] mt-1">We do not show it on your profile</p>
              )}
            </div>
          ))}

          {/* Phone Input */}
          <div>
            <label className="block font-semibold mb-1 text-[var(--text-dark)]">Contact Number *</label>
            <PhoneInput
              country={'pk'}
              value={formData.phone}
              onChange={(phone) => setFormData(prev => ({ ...prev, phone }))}
              countryCodeEditable={false}
              enableSearch={true}
              inputProps={{ name: 'phone', required: true }}
              inputClass="!w-full border border-[var(--border-gray)] rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            <p className="text-sm text-[var(--text-muted)] mt-1">We do not show it on your profile</p>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <label className="block font-semibold mb-1 text-[var(--text-dark)]">About *</label>
          <textarea
            name="about"
            value={formData.about}
            rows={4}
            placeholder="Write about yourself"
            onChange={handleChange}
            className="w-full border border-[var(--border-gray)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          ></textarea>
          <p className="text-sm text-[var(--text-muted)] mt-1">We do not show it on your profile</p>
        </div>

        {/* Reason */}
        <div className="mt-4">
          <label className="block font-semibold mb-1 text-[var(--text-dark)]">
            Why do you want to become a story writer? *
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            rows={4}
            placeholder="Why do you want to become a story writer?"
            onChange={handleChange}
            className="w-full border border-[var(--border-gray)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          ></textarea>
          <p className="text-sm text-[var(--text-muted)] mt-1">We do not show it on your profile</p>
        </div>

        {/* File Upload */}
        <div
          className="mt-8 border-2 border-dashed p-6 text-center bg-[var(--bg-light)] rounded-md cursor-pointer 
          "
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FaCloudUploadAlt className="text-4xl mx-auto text-[var(--primary-color)]" />
          <p className="mt-2 font-medium text-[var(--text-dark)]">
            Drag & drop any file or <span className="text-[var(--primary-color)] underline cursor-pointer">Browse</span>
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Supported: images, documents, videos (max 10MB)</p>
          <input
            id="fileInput"
            type="file"
            accept="*/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && (
            <p className="mt-2 text-pink-500 font-medium">
               {file.name} selected ({Math.round(file.size / 1024)} KB)
            </p>
          )}
        </div>

     

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="bg-[var(--primary-color)] text-white hover:bg-[var(--pink-dark)] px-6 py-2 rounded transition-colors duration-200 font-medium"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-[var(--primary-color)] text-white hover:bg-[var(--pink-dark)] px-6 py-2 rounded transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default SubmissionForm;
