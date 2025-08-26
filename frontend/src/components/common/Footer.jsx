


import { useState } from 'react';
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP
} from 'react-icons/fa6';
import Subscribe from "../../components/common/Subscribe";
import storyiousLogo from "../../assets/images/storyiousLogo.png";
import MailBox from '../../assets/icons/MailBox';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  return (
    <>
      <footer className="bg-[var(--gradient-end)] text-[var(--text-gray)] text-sm">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

          {/* Left Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={storyiousLogo}
                alt="Storyious Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h2 className="font-bold text-base text-[var(--text-dark)]">STORYIOUS</h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Where Every Story Sparks A New Adventure!
                </p>
              </div>
            </div>

            <p className="text-[var(--text-muted)] mb-4">
              At Storyious, talented writers transform their ideas into captivating narratives that inspire,
              entertain, and connect readers of all ages. With a deep commitment to creativity and excellence,
              every story we publish is authentic, human-crafted, and carefully curated to spark imagination
              and leave a lasting impact.
            </p>

            <div className="flex gap-3 mt-4">
              {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram, FaPinterestP].map((Icon, index) => (
                <div
                  key={index}
                  className="bg-[var(--white)] p-2 rounded-sm border border-[var(--border-muted)] text-[var(--text-muted)] cursor-pointer"
                >
                  <Icon className="text-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Center Column */}
          <div className="grid grid-cols-2 gap-6 text-[var(--text-gray)]">
            <div>
              <h3 className="font-bold mb-2 text-[var(--text-dark)]">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Story Writers</a></li>
                <li><a href="#">Write For Us</a></li>
                <li><a href="#">Stories FAQs</a></li>
                <li><a href="#">Writing Rules</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 mt-7">
                <li><a href="#">Content Integrity Policy</a></li>
                <li><a href="#">Disclaimer</a></li>
                <li><a href="#">Sitemap</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="font-bold mb-3 text-[var(--text-dark)]">Subscribe to Get Updated!</h3>
            <p className="text-[var(--text-muted)] mb-4">
              Stay connected with Storyious! Subscribe now to get the latest stories, featured reads,
              and exciting updates delivered straight to your inbox, never miss a magical moment.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex items-center border rounded overflow-hidden bg-[var(--white)]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Write your email"
                className="w-full px-4 py-2 outline-none text-sm"
              />
              <button
                onClick={() => setShowSubscribeModal(true)}
                type="submit"
                className="bg-[var(--pink-dark)] p-3 text-[var(--white)] flex items-center justify-center hover:bg-[#b1255f] transition"
              >
                <MailBox />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[var(--pink-dark)] text-[var(--white)] text-center py-3 text-xs">
          2025 © Storyious | POWERED BY Storyious
        </div>
      </footer>

      {/* Subscribe Modal */}
      <Subscribe show={showSubscribeModal} onClose={() => setShowSubscribeModal(false)} />
    </>
  );
};

export default Footer;
