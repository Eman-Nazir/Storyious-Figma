


import React from "react";
import { Link } from "react-router-dom";
import Community from "../components/common/Community";

const AboutUs = () => {
  return (
    <div className="font-sans text-[var(--text-dark)]">
      {/* Header Section with gradient */}
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 min-h-[240px] rounded-md
        pt-[50px] pb-[50px] pl-[133px] pr-[125px]
        max-sm:pt-[39px] max-sm:pb-[39px] max-sm:pl-[20px] max-sm:pr-[20px]">
        
        <h1 className="pt-4 text-lg px-6 sm:text-xl md:text-2xl text-[var(--text-dark)] font-bold">
          About Us
        </h1>
        <p className="px-5 pb-4 text-[var(--text-gray)]">
          Learn about Storyious, a storytelling platform dedicated to inspiring and connecting readers through amazing, captivating, and humanly written stories. Discover our mission, values, and commitment to delivering exceptional tales for all ages.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 md:px-20 px-10">
          {/* Left Content */}
          <div className="lg:w-3/4">
            <h2 className="text-2xl font-bold mb-6">About</h2>

            <p className="mb-4 text-[var(--text-gray)]">
              The <strong>Central Superior Services (CSS)</strong> examination in Pakistan is a competitive assessment conducted by the <strong>Federal Public Service Commission (FPSC)</strong> to recruit candidates for various administrative and bureaucratic roles in the federal government. The <strong>eligibility criteria</strong> for the CSS examination are defined to ensure a fair and merit-based selection process. Below is a comprehensive overview of the eligibility criteria:
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-2">Nationality</h3>
            <ul className="list-disc list-inside space-y-2 text-[var(--text-gray)]">
              <li>The candidate must be a citizen of Pakistan or a permanent resident of Azad Jammu and Kashmir (AJK).</li>
              <li>Dual nationals are also eligible, provided they renounce their foreign nationality upon selection.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-2">Educational Qualification</h3>
            <ul className="list-disc list-inside space-y-2 text-[var(--text-gray)]">
              <li>The minimum educational qualification required is a bachelor’s degree from a recognized university in Pakistan or abroad.</li>
              <li>The degree must be equivalent to at least 14 years of education (e.g., BA, BSc, BCom).</li>
              <li>Candidates who have third division in their bachelor’s degree are only eligible if they have achieved a higher division (second or first) in their master’s degree.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-2">Age Limit</h3>
            <ul className="list-disc list-inside space-y-2 text-[var(--text-gray)]">
              <li>General Age Requirement: The candidate must be between 21 and 30 years old as of the cut-off date announced by FPSC (usually December 31 of the preceding year).</li>
              <li>
                <strong>Age Relaxation:</strong> A maximum of 2 years of age relaxation (up to 32 years) is granted to:
                <ul className="list-disc list-inside pl-6 mt-2 space-y-1">
                  <li>Government employees with at least 2 years of continuous service in a government department.</li>
                  <li>Candidates belonging to recognized tribal areas, including Balochistan, Gilgit-Baltistan, and Azad Jammu and Kashmir.</li>
                  <li>Applicants must provide valid documentation to claim age relaxation.</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/4 w-full h-fit bg-[var(--white)] border border-[var(--gray-light)] my-5 shadow-sm rounded">
            <h4 className="text-lg font-semibold px-6 pt-6 pb-4 text-[var(--text-dark)] border-b border-[var(--gray-light)]">
              Important Links
            </h4>

            <ul className="text-sm font-medium">
              {[
                { label: "About Us", path: "/About-Us" },
                { label: "Story Writers", path: "/Writer-Page" },
                { label: "Write For Us", path: "/WriteFor-Us" },
                { label: "Stories FAQs", path: "/faqs" },
                { label: "Blogs", path: "/Blog-Page" },
                { label: "Content Integrity", path: "/content-integrity" },
                { label: "Disclaimer", path: "/disclaimer" },
                { label: "Plagiarism Guidelines", path: "/plagiarism-guidelines" },
                { label: "Copyright Violations", path: "/CPF-Rules" },
                { label: "CPF Advertising Policy", path: "/CPF-Rules" },
                { label: "Cookies Policy", path: "/cookies-policy" },
                { label: "Trademark Violations", path: "/trademark-violations" },
              ].map((item, index) => {
                const isActive = item.path === "/About-Us";

                return (
                  <li key={index} className="border-b border-[var(--gray-light)]">
                    <Link
                      to={item.path}
                      className={`block px-6 py-3 transition duration-200 ${
                        isActive
                          ? "text-[var(--pink-dark)] font-semibold"
                          : "text-[var(--text-dark)] hover:text-[var(--pink-dark)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>

      {/* Community Section */}
      <Community />
    </div>
  );
};

export default AboutUs;
