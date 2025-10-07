



import { useState } from "react";
import { Check } from "lucide-react";
import writeforus from "../../assets/images/writeforus.png";
import StorySubmitPopUp from "../../components/common/StorySubmitPopUp";

const Tick = () => <Check className="text-[var(--color-pink)] inline mr-2" size={20} />;

const WrittenDetailed = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="font-sans text-[var(--text-dark)]">
      {showPopup && <StorySubmitPopUp onClose={() => setShowPopup(false)} />}
      <section className="bg-gradient-to-r from-[#F8EDF1] to-[#F6F8FD] py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">Write for Us: Share Your Stories with the World!</h1>
            <p className="text-lg mb-6">
              Do you have a story that deserves to be heard? At Storyious, we
              believe in the power of storytelling to inspire, entertain, and
              connect people across the world.
            </p>
            <button
              onClick={() => setShowPopup(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded"
            >
              Submit Story
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={writeforus}
              alt="Write For Us"
              className="w-full max-w-md rounded shadow"
            />
          </div>
        </div>
      </section>

      <section className="py-8 max-w-6xl px-4 lg:px-22">
        <p className="text-lg leading-relaxed">
          At Storyious, every story has the power to <strong>inspire</strong>, <strong>enchant</strong>, and <strong>ignite imaginations</strong>, and yours could be next! We’re looking for talented story writers who can weave magic through words and bring unforgettable tales to life. If you have the creativity, passion, and drive to touch hearts through storytelling, we invite you to write for Storyious and become part of a growing community that brings joy and wonder to thousands of readers every day.
        </p>
      </section>

      <section className="bg-[var(--bg-light)] px-6 md:px-22 py-12">
        <h2 className="text-2xl font-bold mb-8">Why You Should Write for HowTests</h2>
        <p className="mb-6 text-lg">
          HowTests isn’t just another educational website. It’s a trusted academic platform that serves millions of CSS, PMS, Judiciary, and One Paper Commission aspirants across Pakistan and beyond. <br />
          Here’s what sets us apart; and why you should be part of it:
        </p>
        <ul className="space-y-6 max-w-4xl text-lg">
          <li><Tick /> <strong>Reach a Massive Audience:</strong> Your article will be accessed by thousands of dedicated students daily.</li>
          <li><Tick /> <strong>Gain a Larger Recognition:</strong> Publish under your name with a dedicated author profile.</li>
          <li><Tick /> <strong>Be Worldwide, Not Published Here:</strong> We handle SEO and promote your work automatically.</li>
          <li><Tick /> <strong>Make a Real Difference:</strong> Help students with high-quality study material and strategies.</li>
          <li><Tick /> <strong>Grow Your Influence:</strong> The more you publish, the more you’ll grow as a recognized academic voice.</li>
        </ul>
      </section>

      <section className="px-6 md:px-22 py-12 bg-white">
        <div className="flex flex-col gap-12 max-w-6xl">
          <div>
            <h3 className="text-xl font-bold mb-4">Who Can Write for Us?</h3>
            <ul className="space-y-2">
              <li><Tick /> CSS/PMS/Judiciary Mentors & Teachers</li>
              <li><Tick /> University Professors, Lecturers, and Researchers</li>
              <li><Tick /> Academic Writers, Bloggers, and Competitive Aspirants</li>
              <li><Tick /> Former Bureaucrats, Civil Servants, Govt. Officers</li>
              <li><Tick /> Competitive Exam Experts in GK, Current Affairs, Law, etc.</li>
            </ul>
            <button className="mt-4 bg-[var(--color-pink)] hover:bg-[var(--color-pink-dark)] text-white font-semibold px-4 py-2 rounded">
              Writing Rules
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">What We're Looking For</h3>
            <ul className="space-y-2">
              <li><Tick /> CSS or PMS Solved Past Paper Questions</li>
              <li><Tick /> Any One Paper Exam’s Past Paper Solution</li>
              <li><Tick /> MCQs with Detailed Explanations</li>
              <li><Tick /> Current Affairs & Editorial Opinions</li>
              <li><Tick /> Judiciary Notes, Legal Case Summaries & Opinions</li>
              <li><Tick /> Pakistan Affairs, Islamiat, and Other Subjects’ Notes</li>
              <li><Tick /> Exam Strategies, Time Management & Study Tips</li>
              <li><Tick /> Educational Blogs, Academic Writing & Research Articles</li>
              <li><Tick /> Exam-Specific Study Plans and Syllabus Breakdowns</li>
              <li><Tick /> Your Personal Opinion about Exams</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-22 py-12 max-w-6xl">
        <h3 className="text-xl font-bold mb-6">Submission Guidelines</h3>
        <p className="mb-6 text-lg">
          To maintain our high-quality standards, please follow these content submission guidelines when submitting:
        </p>
        <ul className="space-y-6 text-lg">
          <li className="flex flex-col">
            <span className="flex items-center">
              <Tick />
              <span className="font-bold ml-2">Originality:</span>
            </span>
            <span>Must be original and unpublished elsewhere. No AI-generated or plagiarized content.</span>
          </li>
          <li className="flex flex-col">
            <span className="flex items-center">
              <Tick />
              <span className="font-bold ml-2">Word Count:</span>
            </span>
            <span>Minimum 1,000 words. For research-style content, aim for 1,500–2,500 words.</span>
          </li>
          <li className="flex flex-col">
            <span className="flex items-center">
              <Tick />
              <span className="font-bold ml-2">Formatting:</span>
            </span>
            <span>Use clear headings, subheadings, bullet points, and concise paragraphs.</span>
          </li>
          <li className="flex flex-col">
            <span className="flex items-center">
              <Tick />
              <span className="font-bold ml-2">Language:</span>
            </span>
            <span>Fluent, academic-level English. Avoid unnecessary jargon.</span>
          </li>
          <li className="flex flex-col">
            <span className="flex items-center">
              <Tick />
              <span className="font-bold ml-2">Citations & Accuracy:</span>
            </span>
            <span>Provide verified facts and authoritative references.</span>
          </li>
          <li className="flex flex-col">
            <span className="flex items-center">
              <Tick />
              <span className="font-bold ml-2">Tone & Style:</span>
            </span>
            <span>Maintain a professional, educational tone to educate, empower, and inspire.</span>
          </li>
        </ul>

        <p className="mt-8 text-base">
          Please submit your article in a Word document. Include high-quality images or graphics relevant to your article (if applicable). Ensure you have rights to use these visuals.
        </p>
      </section>

      <div className="px-6 md:px-22 py-12">
        <h3 className="text-xl font-bold mb-4">What We Don’t Accept</h3>
        <p>
          To preserve the integrity of our platform and reader trust, we do not accept the following:
        </p>
        <ul className="space-y-2">
          <li><Tick /> Plagiarized or copied content</li>
          <li><Tick /> Previously published articles</li>
          <li><Tick /> Promotional, affiliate-driven, or sponsored content</li>
          <li><Tick /> Irrelevant topics outside the educational/competitive exam niche</li>
          <li><Tick /> AI-written content without human editing and quality control</li>
        </ul>
      </div>

      <div className="px-6 md:px-22 py-12">
        <h2 className="text-2xl font-bold mb-8">Editorial Review & Publication Timeline</h2>
        <p className="mb-6 text-lg">
          All submissions go through a strict editorial review process:
        </p>
        <ul className="space-y-6 text-lg">
          <li>
            <Tick /> <strong>Acknowledgment:</strong> We’ll confirm receipt within 3-5 working days.
          </li>
          <li>
            <Tick /> <strong>Review:</strong> Your post will be evaluated for quality, relevance, and accuracy.
          </li>
          <li>
            <Tick /> <strong>Revisions:</strong> If needed, we’ll share feedback for edits.
          </li>
          <li>
            <Tick /> <strong>Approval & Publishing:</strong> Once finalized and accepted, your post will be published and shared across HowTests' networks.
          </li>
        </ul>
      </div>

      <div className="px-6 md:px-22 py-12">
        <h1 className="text-xl font-bold">Want to Write Regularly?</h1>
        <p className="mt-4 text-base">
          If your stories consistently meet our quality standards, you may be invited to become a Regular Story Writer at Storyious. We’ll support you in gaining greater exposure, building recognition, and earning a special place within our vibrant storytelling community.
        </p>
      </div>
    </div>
  );
};

export default WrittenDetailed;
