



import React from "react";
import Community from "../components/common/Community";

const sidebarItems = [
  "CPF Writing Rules",
  "Privacy Policy",
  "Terms of Use",
  "CPF Editorial Policy",
  "Content Integrity",
  "Disclaimer",
  "Plagiarism Guidelines",
  "Copyright Violations",
  "CPF Advertising Policy",
  "Cookies Policy",
  "Trademark Violations"
];

const CPFRules = () => {
  return (
    <>
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10 px-6 lg:px-16 py-8 bg-[var(--white)] text-[var(--text-dark)]">

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl lg:text-4xl text-[var(--text-dark)] font-bold">CPF Rules</h1>

          <p>
            The <strong>Central Superior Services (CSS)</strong> examination in Pakistan is a competitive assessment conducted by the <strong>Federal Public Service Commission (FPSC)</strong> to recruit candidates for various administrative and bureaucratic roles in the federal government. The <strong>eligibility criteria</strong> for the CSS examination are defined to ensure a fair and merit-based selection process.
          </p>

          {/* Nationality Section */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-2">Nationality</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Must be a citizen of Pakistan or permanent resident of AJK.</li>
              <li>Dual nationals can apply but must renounce foreign nationality upon selection.</li>
            </ul>
          </section>

          {/* Qualification Section */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-2">Educational Qualification</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Minimum bachelor’s degree (14 years of education).</li>
              <li>Third division is acceptable only if master’s is 2nd or 1st division.</li>
            </ul>
          </section>

          {/* Age Limit Section */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-2">Age Limit</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>General:</strong> 21 to 30 years old by cut-off date.</li>
              <li>
                <strong>Relaxation:</strong> Up to 32 years for:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Government servants with 2+ years of service.</li>
                  <li>Residents of tribal areas, AJK, GB, Balochistan.</li>
                </ul>
              </li>
              <li>Valid proof required for age relaxation.</li>
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <ul className="border rounded-md border-[var(--gray-light)] overflow-hidden px-4">
            <li className="border-b border-[var(--gray-light)] py-3 text-xl font-semibold text-[var(--pink-dark)]">
              Story Rules
            </li>
            {sidebarItems.map((item, i) => (
              <li
                key={i}
                className="py-3 text-sm text-[var(--text-dark)] border-b border-[var(--gray-light)] last:border-b-0 hover:bg-[var(--gradient-start)] cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Community />
    </>
  );
};

export default CPFRules;
