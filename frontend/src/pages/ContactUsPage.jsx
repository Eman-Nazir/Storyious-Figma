import React from "react";
import { MdEmail } from "react-icons/md";
import Community from "../components/common/Community";

const CONTACT_EMAIL = "writewithstoryious@gmail.com";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-[var(--white)]">
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-6 md:px-16 lg:px-[180px] py-10">
        <h1 className="text-3xl font-bold mb-4 text-[var(--text-dark)]">
          Contact Us
        </h1>

        <p className="text-[var(--text-muted)]">
          Have questions or feedback? Contact the Storyious team about
          submissions, collaborations, or our storytelling platform.
        </p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="max-w-3xl w-full bg-[var(--white)] rounded-lg shadow-lg p-6 md:p-8 border border-[var(--gray-light)]">
          <h2 className="text-xl font-bold mb-3 text-[var(--text-dark)]">
            Get in Touch
          </h2>

          <p className="text-[var(--text-muted)] mb-6">
            Send your message to the email address below. Include a subject
            and the details of your inquiry so we can help.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-3 bg-[var(--gradient-start)] border border-[var(--pink-dark)] rounded-md p-4 text-[var(--text-dark)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--pink-dark)]"
          >
            <MdEmail
              aria-hidden="true"
              className="text-[var(--pink-dark)] text-2xl shrink-0"
            />

            <span className="break-all">{CONTACT_EMAIL}</span>
          </a>

          <p className="text-sm text-[var(--text-muted)] mt-4">
            This link opens your email app. You can also copy the address
            into your preferred email service.
          </p>
        </div>
      </div>

      <Community />
    </div>
  );
};

export default ContactUsPage;