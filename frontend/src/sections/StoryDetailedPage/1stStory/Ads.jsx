


import { useEffect, useState } from "react";
import axios from "axios";
import StartQuiz from "../../../components/common/StartQuiz";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa6";

const Ads = () => {
  const [quizpopup, setquizpopup] = useState(false);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/stories/ads");
        const lastSix = res.data.data.slice(-6);
        setAds(lastSix);
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="max-lg:hidden space-y-5 mt-10 w-[300px]">
      <div className="bg-[var(--bg-section)] p-4 space-y-4 rounded-md">
        <h1 className="text-[var(--text-gray)] font-semibold">
          Do you have Enough Time?
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Take our 10-minute quiz, with lifelines and swapping options,
          for a quick and reliable snapshot of your English proficiency.
        </p>
        <button
          onClick={() => setquizpopup(true)}
          className="bg-pink-600 px-4 py-2 text-white rounded-md text-sm font-medium cursor-pointer hover:bg-pink-700 transition-all"
        >
          Start Quiz
        </button>
      </div>

      <div className="flex flex-col p-4 rounded-md space-y-3 w-[300px]  bg-[var(--bg-section)]">
        <h1 className="text-[--text-muted] font-semibold">Follow Us On</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram].map(
            (Icon, index) => (
              <button
                key={index}
                type="button"
                 class="w-10 h-10 flex items-center justify-center border border-[var(--border-muted)] text-[var(--text-muted)] rounded-md transition-colors duration-200 hover:bg-pink-600 hover:text-white"

              >
                <Icon size={18} />
              </button>
            )
          )}
        </div>
      </div>

      {ads.map((ad) => (
        <div
          key={ad._id}
          className="max-w-[300px] bg-[--bg-section] rounded-xl shadow-md overflow-hidden"
        >
          <div className="relative">
            {ad.imageUrl && (
              <img
                src={ad.imageUrl}
                alt={ad.title || "Ad"}
                className="w-full object-cover rounded-md p-3"
              />
            )}
            <div className="absolute top-2 right-2 bg-pink-600 text-[--white] text-xs px-2 py-1 rounded">
              Ad
            </div>
          </div>
          <div className="p-4 space-y-3">
            {ad.title && (
              <h2 className="text-md font-semibold text-[--text-dark]">
                {ad.title}
              </h2>
            )}
            {ad.description && (
              <p className="text-sm text-[--text-muted]">{ad.description}</p>
            )}
            {ad.buttonText && (
              <button className="mt-2 bg-pink-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-pink-700 transition-all duration-300">
                {ad.buttonText}
              </button>
            )}
          </div>
        </div>
      ))}

      <StartQuiz show={quizpopup} onClose={() => setquizpopup(false)} />
    </div>
  );
};

export default Ads;
