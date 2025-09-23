import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Community from "../../src/components/common/Community";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    reason: '',
    name: '',
    email: '',
    phone: '92',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    setFormData({
      reason: '',
      name: '',
      email: '',
      phone: '92',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-[var(--white)]">

      {/* Header Section */}
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-[180px] py-10">
        <h2 className="text-3xl font-bold mb-4 text-[var(--text-dark)]">Contact Us</h2>
        <p className="text-[var(--text-muted)]">
          Have questions or feedback? Get in touch with the Storyious team! We're here to help with submissions,
          collaborations, or any inquiries about our storytelling platform.
        </p>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center p-6">
        <div className="max-w-5xl w-full bg-[var(--white)] rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-10 border border-[var(--gray-light)]">

          {/* Left Form Fields */}
          <div className="md:col-span-2 space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-dark)]">
                    Reason To Contact <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full border border-[var(--gray-light)] rounded-md p-2 text-sm focus:outline-none"
                    required
                  >
                    <option value="">Select A Reason To Contact</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Support">Support</option>
                    <option value="Collaboration">Collaboration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-dark)]">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Write your Name"
                    className="w-full border border-[var(--gray-light)] rounded-md p-2 text-sm focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-dark)]">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Write your Email"
                    className="w-full border border-[var(--gray-light)] rounded-md p-2 text-sm focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-[var(--text-dark)]">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    country={'pk'}
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone })}
                    countryCodeEditable={false}
                    enableSearch={true}
                    enableAreaCodes={true}
                    inputProps={{
                      name: 'phone',
                      required: true,
                    }}
                    inputClass="!w-full border border-[var(--gray-light)] rounded px-4 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-[var(--text-dark)]">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-[var(--gray-light)] rounded-md p-2 text-sm focus:outline-none"
                ></textarea>
              </div>

              <div className="flex space-x-4">
                <button
                  type="reset"
                  onClick={() =>
                    setFormData({
                      reason: '',
                      name: '',
                      email: '',
                      phone: '92',
                      message: '',
                    })
                  }
                  className="px-4 py-2 border border-[var(--pink-dark)] text-[var(--pink-dark)] rounded-md hover:bg-[var(--gradient-start)]"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--pink-dark)] text-[var(--white)] rounded-md hover:bg-pink-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Right Info Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[var(--text-dark)]">Get in Touch</h3>
            <p className="text-[var(--text-muted)]">
              Feel free to reach out to us through any of the following methods:
            </p>
            <div>
              <p className="font-medium text-[var(--text-dark)]">
                Customer Support Hours: <span className="font-bold">24/7</span>
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-[var(--gradient-start)] border border-[var(--pink-dark)] rounded-md p-3">
              <MdEmail className="text-[var(--pink-dark)] text-2xl" />
              <span className="text-[var(--text-dark)]">writewithstoryious@gmail.com</span>
            </div>
            <div>
              <p className="font-medium mb-2 text-[var(--text-dark)]">Connect with us</p>
              <div className="grid grid-cols-5 gap-2 border border-[var(--gray-light)] rounded-md p-3">
                {[FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube].map((Icon, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center w-10 h-10 border border-[var(--gray-light)] rounded-md hover:bg-[var(--gradient-start)] cursor-pointer"
                  >
                    <Icon className="text-[var(--text-dark)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <Community />
    </div>
  );
};

export default ContactUsPage;
