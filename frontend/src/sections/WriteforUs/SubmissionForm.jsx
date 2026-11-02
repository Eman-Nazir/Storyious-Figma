import React, { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_FILE_TYPES =
  ".jpg,.jpeg,.png,.gif,.webp,.bmp,.mp4,.mov,.webm,.avi,.mkv,.pdf,.doc,.docx";

const ALLOWED_EXTENSIONS = new Set(
  ACCEPTED_FILE_TYPES.split(",")
);

const FIELD_LIMITS = {
  name: 100,
  age: 32,
  email: 254,
  city: 100,
  country: 100,
  qualification: 150,
  profession: 150,
  institution: 200,
};

const getFileError = (file) => {
  if (!file) return null;

  if (file.name.length > 200) {
    return "File name must be 200 characters or fewer.";
  }

  const dot = file.name.lastIndexOf(".");
  const extension =
    dot > 0 ? file.name.slice(dot).toLowerCase() : "";

  if (!ALLOWED_EXTENSIONS.has(extension)) {
    return "Please choose one of the supported file types.";
  }

  if (file.size === 0) {
    return "The selected file is empty.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File must be 5 MB or smaller.";
  }

  return null;
};

const SubmissionForm = () => {
  const initialData = {
    name: "",
    age: "",
    city: "",
    country: "",
    qualification: "",
    institution: "",
    profession: "",
    email: "",
    phone: "",
    about: "",
    reason: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialData);
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelection = (selectedFile) => {
    if (!selectedFile || isSubmitting) return;

    const error = getFileError(selectedFile);

    if (error) {
      toast.error(error);
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSubmitting) return;

    if (e.dataTransfer.files.length > 1) {
      toast.error("Please upload one file at a time.");
      return;
    }

    handleFileSelection(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name?.trim() ||
      !formData.email?.trim() ||
      !formData.phone?.trim()
    ) {
      toast.error(
        "Name, Email, and Phone are required fields."
      );
      return;
    }

    const fileError = getFileError(file);

    if (fileError) {
      toast.error(fileError);
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (
          formData[key] &&
          formData[key].trim() !== ""
        ) {
          formDataToSend.append(
            key,
            formData[key].trim()
          );
        }
      });

      if (file) {
        formDataToSend.append("file", file);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/submissions/create`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Server error: ${response.status}`
        );
      }

      toast.success("Form submitted successfully!");
      handleReset();
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.message
      );
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
        <h2 className="text-2xl font-bold mb-2 text-center text-[var(--text-dark)]">
          Submission Form
        </h2>

        <p className="text-center text-[var(--text-muted)] mb-6">
          Please fill in the required fields. You may also
          attach a supported file.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: "Name",
              name: "name",
              placeholder: "Write your name here",
              required: true,
            },
            {
              label: "Age",
              name: "age",
              placeholder: "Ex: 25 Years",
              required: false,
            },
            {
              label: "Email",
              name: "email",
              placeholder: "Write your email here",
              required: true,
            },
            {
              label: "City",
              name: "city",
              placeholder: "Write your city here",
              required: false,
            },
            {
              label: "Country",
              name: "country",
              placeholder: "Write your country here",
              required: false,
            },
            {
              label: "Qualification",
              name: "qualification",
              placeholder: "Ex: Masters or Graduate",
              required: false,
            },
            {
              label: "Profession",
              name: "profession",
              placeholder: "Ex: Teacher, Developer, Writer",
              required: false,
            },
            {
              label: "Institution",
              name: "institution",
              placeholder: "Your University or College",
              required: false,
            },
          ].map(
            ({
              label,
              name,
              placeholder,
              required,
            }) => (
              <div key={name}>
                <label className="block font-semibold mb-1 text-[var(--text-dark)]">
                  {label} {required && "*"}
                </label>

                <input
                  name={name}
                  type={
                    name === "email"
                      ? "email"
                      : "text"
                  }
                  required={required}
                  maxLength={FIELD_LIMITS[name]}
                  value={formData[name]}
                  placeholder={placeholder}
                  onChange={handleChange}
                  className="w-full border border-[var(--border-gray)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />

                {name !== "name" &&
                  name !== "age" && (
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      We do not show it on your profile
                    </p>
                  )}
              </div>
            )
          )}

          <div>
            <label className="block font-semibold mb-1 text-[var(--text-dark)]">
              Contact Number *
            </label>

            <PhoneInput
              country="pk"
              value={formData.phone}
              onChange={(phone) =>
                setFormData((prev) => ({
                  ...prev,
                  phone,
                }))
              }
              countryCodeEditable={false}
              enableSearch
              inputProps={{
                name: "phone",
                required: true,
                maxLength: 32,
              }}
              inputClass="!w-full border border-[var(--border-gray)] rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />

            <p className="text-sm text-[var(--text-muted)] mt-1">
              We do not show it on your profile
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label className="block font-semibold mb-1 text-[var(--text-dark)]">
            About (optional)
          </label>

          <textarea
            name="about"
            value={formData.about}
            rows={4}
            maxLength={5000}
            placeholder="Write about yourself"
            onChange={handleChange}
            className="w-full border border-[var(--border-gray)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />

          <p className="text-sm text-[var(--text-muted)] mt-1">
            We do not show it on your profile
          </p>
        </div>

        <div className="mt-4">
          <label className="block font-semibold mb-1 text-[var(--text-dark)]">
            Why do you want to become a story writer?
            {" "}(optional)
          </label>

          <textarea
            name="reason"
            value={formData.reason}
            rows={4}
            maxLength={5000}
            placeholder="Why do you want to become a story writer?"
            onChange={handleChange}
            className="w-full border border-[var(--border-gray)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />

          <p className="text-sm text-[var(--text-muted)] mt-1">
            We do not show it on your profile
          </p>
        </div>

        <div
          className="mt-8 border-2 border-dashed p-6 text-center bg-[var(--bg-light)] rounded-md cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Choose an attachment"
          aria-disabled={isSubmitting}
          onClick={() => {
            if (!isSubmitting) {
              fileInputRef.current?.click();
            }
          }}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return;

            if (
              e.key === "Enter" ||
              e.key === " "
            ) {
              e.preventDefault();

              if (!isSubmitting) {
                fileInputRef.current?.click();
              }
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <FaCloudUploadAlt className="text-4xl mx-auto text-[var(--primary-color)]" />

          <p className="mt-2 font-medium text-[var(--text-dark)]">
            Drag &amp; drop a supported file or{" "}
            <span className="text-[var(--primary-color)] underline cursor-pointer">
              Browse
            </span>
          </p>

          <p className="text-sm text-[var(--text-muted)] mt-1">
            Supported: JPG, PNG, GIF, WebP, BMP, MP4,
            MOV, WebM, AVI, MKV, PDF, DOC and DOCX
            (max 5 MB)
          </p>

          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            accept={ACCEPTED_FILE_TYPES}
            disabled={isSubmitting}
            className="hidden"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              handleFileSelection(
                e.target.files?.[0]
              )
            }
          />

          {file && (
            <p className="mt-2 text-pink-500 font-medium">
              {file.name} selected (
              {Math.round(file.size / 1024)} KB)
            </p>
          )}
        </div>

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
            {isSubmitting
              ? "Submitting..."
              : "Submit"}
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
      />
    </>
  );
};

export default SubmissionForm;