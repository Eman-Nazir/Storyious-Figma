

import { useState } from 'react';
import handWritten from "../../../assets/images/handWritten.jpg";
import River from "../../../assets/images/River.jpg";
import Dolphan from "../../../assets/images/Dolphan.jpg";
import Tablet from "../../../assets/images/Tablet.jpg";
import Session1 from "../../../assets/images/Session1.jpg";
import Session2 from "../../../assets/images/Session2.jpg";
import StartQuiz from "../../../components/common/StartQuiz";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram } from 'react-icons/fa6';

const Images = () => {
  const [quizpopup, setquizpopup] = useState(false);

  return (
    <div className='max-lg:hidden space-y-5 mt-10 w-[300px]'>

      {/* Quiz Box */}
       <div className="bg-[var(--bg-section)] p-4 space-y-4 rounded-md">
          <h1 className="text-[var(--text-gray)] font-semibold">Do you have Enough Time?</h1>
          <p className="text-sm text-[var(--text-muted)]">
            Take our 10-minute quiz, with lifelines and swapping options, for a quick and reliable snapshot of your English proficiency.
          </p>
          <button
            onClick={() => setquizpopup(true)}
            className="bg-[var(--pink-dark)] px-4 py-2 text-white rounded-md text-sm font-medium cursor-pointer">
            Start Quiz
          </button>
        </div>

      {/* Social Follow Box */}
      <div className="flex flex-col p-4 rounded-md space-y-3 w-[300px] border border-[--border-muted]">
        <h1 className='text-[--text-muted] font-semibold'>Follow Us On</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram].map((Icon, index) => (
            <a key={index} href="#" className="bg-[--white] border border-[--border-muted] text-[--text-muted] p-2 rounded-md">
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Images */}
      <img src={handWritten} alt='Hand Writing' className='rounded-lg' />
      <img src={River} alt='River' className='h-[250px] w-[300px] rounded-lg' />
      <img src={Dolphan} alt='Dolphan' className='h-[400px] rounded-lg' />

      {/* Image with Ad Badge */}
      <div className="relative">
        <img src={Tablet} alt="Tablet" className="h-[560px] rounded-lg" />
        <div className="absolute top-2 left-2 bg-[--primary-color] text-[--white] text-sm px-2 py-1 rounded">Ad</div>
      </div>

      {/* Session Card 1 */}
      <div className="max-w-[300px] h-[520px] bg-[--bg-section] rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img src={Session1} alt="Session 1" className="w-full object-cover rounded-md p-3" />
        </div>
        <div className="p-4 space-y-3">
          <h2 className="text-xl font-semibold text-[--text-dark]">
            A 3-Day Free Online <br /> Orientation Session for CSS <br /> & Aspirants (60)
          </h2>
          <p className="text-md text-[--text-muted] mt-2">
            A 3-Day Free Online Orientation Session for CSS and PMS Aspirants<br />
            A 3-Day Free (100 Characters)
          </p>
          <button className="mt-4 bg-[--primary-color] text-[--white] text-sm font-medium px-4 py-2 rounded-md hover:bg-[--primary-hover-color] transition-all duration-300">
            Explore the Course
          </button>
        </div>
      </div>

      {/* Session Card 2 */}
      <div className="max-w-[300px] h-[520px] bg-[--bg-section] rounded-xl shadow-md overflow-hidden">
        <div className="relative">
          <img src={Session2} alt="Session 2" className="p-3 w-full object-cover rounded-md" />
          <div className="absolute top-5 left-5 bg-[--primary-color] text-sm px-2 py-1 text-[--white] rounded">Ad</div>
        </div>
        <div className="p-4 space-y-3">
          <h2 className="text-xl font-semibold text-[--text-dark]">
            A 3-Day Free Online <br /> Orientation Session for CSS <br /> & Aspirants (60)
          </h2>
          <p className="text-md text-[--text-muted] mt-2">
            A 3-Day Free Online Orientation Session for CSS and PMS Aspirants<br />
            A 3-Day Free (100 Characters)
          </p>
          <button className="mt-4 bg-[--primary-color] text-[--white] text-sm font-medium px-4 py-2 rounded-md hover:bg-[--primary-hover-color] transition-all duration-300">
            Explore the Course
          </button>
        </div>
      </div>

      {/* Quiz Modal */}
      <StartQuiz show={quizpopup} onClose={() => setquizpopup(false)} />
    </div>
  );
};

export default Images;
