


import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { FaCloudUploadAlt } from 'react-icons/fa';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData(initialData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[1200px] mx-auto bg-white border border-[var(--border-gray)] rounded-lg my-10 md:mx-12 shadow-sm p-6 lg:mx-22"
    >
      <h2 className="text-2xl font-bold mb-2 text-center text-[var(--text-dark)]">
        Submission Form
      </h2>
      <p className="text-center text-[var(--text-muted)] mb-6">
        Please fill in the required fields below and upload your article as a Word (.doc or .docx) file. Once completed, click “Submit” to send your article for review.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Name', name: 'name', placeholder: 'Write your name here' },
          { label: 'Age', name: 'age', placeholder: 'Ex: 25 Years' },
          { label: 'Email', name: 'email', placeholder: 'Write your email here' },
          { label: 'City', name: 'city', placeholder: 'Write your city here' },
          { label: 'Country', name: 'country', placeholder: 'Write your country here' },
          { label: 'Qualification', name: 'qualification', placeholder: 'Ex: Masters or Graduate' },
          { label: 'Profession', name: 'profession', placeholder: 'Ex: Teacher, Developer, Writer' },
          { label: 'Institution', name: 'institution', placeholder: 'Your University or College' },
        ].map(({ label, name, placeholder }) => (
          <div key={name}>
            <label className="block font-semibold mb-1 text-[var(--text-dark)]">
              {label} *
            </label>
            <input
              name={name}
              value={formData[name]}
              placeholder={placeholder}
              onChange={handleChange}
              className="w-full border border-[var(--border-gray)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]"
            />
            {name !== 'name' && name !== 'age' && (
              <p className="text-sm text-[var(--text-muted)] mt-1">
                We do not show it on your profile
              </p>
            )}
          </div>
        ))}

        {/* Phone Input */}
        <div>
          <label className="block font-semibold mb-1 text-[var(--text-dark)]">Contact Number *</label>
          <PhoneInput
            country={'pk'}
            value={formData.phone}
            onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
            countryCodeEditable={false}
            enableSearch={true}
            inputProps={{
              name: 'phone',
              required: true,
            }}
            inputClass="!w-full border border-[var(--border-gray)] rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]"
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
          className="w-full border border-[var(--border-gray)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]"
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
          className="w-full border border-[var(--border-gray)] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-pink)]"
        ></textarea>
        <p className="text-sm text-[var(--text-muted)] mt-1">We do not show it on your profile</p>
      </div>

      {/* File Upload */}
      <div className="mt-8 border-2 border-dashed p-6 text-center bg-[var(--bg-light)] rounded-md cursor-pointer hover:bg-[var(--bg-hover)] transition-colors duration-200">
        <FaCloudUploadAlt className="text-4xl mx-auto text-[var(--color-pink)]" />
        <p className="mt-2 font-medium text-[var(--text-dark)]">
          Drag & drop Word file or{' '}
          <span className="text-[var(--color-pink)] underline cursor-pointer">Browse</span>
        </p>
        <input type="file" accept=".doc,.docx" className="hidden" />
      </div>

      {/* Fake ReCAPTCHA */}
      <div className="mt-6 border border-[var(--border-gray)] rounded p-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center">
          <input type="checkbox" className="accent-[var(--color-pink)] w-4 h-4 mr-2" />
          <span className="text-sm font-medium text-[var(--text-dark)]">I'm not a robot</span>
        </div>
        <img src={recaptcha} alt="reCAPTCHA" className="w-10 h-10" />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleReset}
          className="bg-[var(--bg-gray)] hover:bg-[var(--bg-gray-hover)] px-4 py-2 rounded transition-colors duration-200"
        >
          Reset
        </button>

        <button
          type="submit"
          className="bg-[var(--color-pink)] hover:bg-[var(--color-pink-dark)] text-white px-6 py-2 rounded transition-colors duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SubmissionForm;
