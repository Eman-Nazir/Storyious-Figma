                  


import React, { useState } from 'react';
import storyiousLogo from "../../assets/images/storyiousLogo.png";
import Subscribe from '../../components/common/Subscribe';
import StartQuiz from '../../components/common/StartQuiz';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown, Menu, Search, ArrowRight, X, ArrowLeft
} from 'lucide-react';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle
} from 'lucide-react';

const storyCategories = [
  'Moral Stories', 'Fairytales', 'Scary Stories', 'Bedtime Stories',
  'Classic Stories', 'Fables'
];

const otherPages = [
  { label: 'All Authors', path: '/Writer-Page' },
  { label: 'Write For Us', path: '/WriteFor-Us' },
  { label: 'Writing Rules', path: '/CPF-Rules' },
  { label: 'About Us', path: '/About-Us' },
  { label: 'Contact Us', path: '/ContactUs' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Stories FAQ', path: '/faqs' },
  { label: 'Disclaimer', path: '/disclaimer' },
  { label: 'Blogs', path: '/Blog-Page' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [quizpopup, setquizpopup] = useState(false);
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setActive('');
  };

  const toggleExplore = () => {
    setExploreOpen(!exploreOpen);
  };

  const handleNavigate = () => {
    setExploreOpen(false);
    setIsOpen(false);
    setActive(''); 
  };

  const submitSearch = () => {
    if (searchInput.trim()) {
      navigate(`/SearchPage?term=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
      setShowSearch(false);
      setIsOpen(false);
    }
  };
  
  return (
    <div className='relative bg-[var(--white)] shadow-sm' >
      {/* Top Navbar */}
      <nav className='py-2 max-w-[1200px] mx-auto flex flex-wrap justify-between items-center px-4 md:px-6'>
        <div className='flex items-center gap-3 flex-1 relative'>
          <img className='w-[36px] h-[45px]' src={storyiousLogo} alt="Logo" />

          <div className='relative hidden md:block'>
            <div
              onClick={toggleExplore}
              className='flex items-center gap-1 font-semibold cursor-pointer'
            >
              <span>Explore</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-950 transition-transform duration-300 ${exploreOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </div>

          <div className='hidden md:flex ml-2 rounded-lg border border-[var(--gray-light)]'>
            <input
              type='text'
              placeholder='What you are looking for'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
              className='px-2 py-1 pr-24 bg-transparent outline-none text-sm'
            />
            <button onClick={submitSearch}>
              <Search className='text-[var(--white)] rounded-md w-11 h-11 p-2 bg-[var(--pink-dark)]' />
            </button>
          </div>
        </div>

        {/* Desktop  */}
        <div className='hidden md:flex gap-3'>
          <button
            onClick={() => setquizpopup(true)}
            className='bg-[var(--pink-dark)] px-4 py-1 text-[var(--white)] rounded-md text-sm font-medium cursor-pointer'
          >
            Start Quiz
          </button>

          <button
            onClick={() => setShowSubscribeModal(true)}
            className='px-4 py-1 text-[var(--pink-dark)] border border-[var(--pink-dark)] rounded-md text-sm font-medium cursor-pointer'
          >
            Subscribe
          </button>

          <button
            onClick={() => {
              handleNavigate();
              navigate('/signup');
            }}
            className='bg-[var(--pink-dark)] text-[var(--white)] px-4 py-1 rounded-md text-sm font-medium cursor-pointer'
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className='md:hidden flex gap-4 items-center'>
          <button onClick={() => setShowSearch(!showSearch)}>
            <Search className='w-6 h-6 text-[var(--pink-dark)]' />
          </button>
          <button onClick={toggleDropdown}>
            {isOpen ? <X className='w-7 h-7 text-[var(--pink-dark)]' /> : <Menu className='w-7 h-7 text-[var(--pink-dark)]' />}
          </button>
        </div>
      </nav>
      
      {showSearch && (
        <div className='md:hidden px-4 py-2 bg-[var(--white)] shadow-sm flex gap-2'>
          <input
            type='text'
            placeholder='Search...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
            className='flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none'
          />
          <button onClick={submitSearch} className='bg-[var(--pink-dark)] text-[var(--white)] px-4 py-2 rounded-md'>
            Search
          </button>
        </div>
      )}
      
      <div
        className="bg-[var(--yellow-soft)] w-full"
        style={{ boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="px-6 py-3 hidden md:flex items-center justify-between">
          {/* Centered Text & Button */}
          <div className="flex-1 flex justify-center items-center gap-3">
            <h1 className="text-sm md:text-base">Want to read more stories?</h1>
            <button className="bg-[var(--blue-primary)] text-[var(--white)] px-3 py-1.5 rounded-md">
              Read Now!
            </button>
          </div>

          {/* X Icon on Far Right */}
          <X className="text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className='md:hidden bg-[var(--white)] shadow-md px-4 py-6 space-y-3 h-[605px]'>
          {!active && (
            <>
              <button onClick={() => setquizpopup(true)} className='w-full bg-[var(--pink-dark)] text-[var(--white)] py-2 rounded-md font-medium'>Start Quiz</button>
              <button onClick={() => setShowSubscribeModal(true)} className='w-full border border-[var(--pink-dark)] text-[var(--pink-dark)] py-2 rounded-md font-medium'>Subscribe</button>
              <button
                onClick={() => {
                  handleNavigate();
                  navigate('/signup');
                }}
                className='w-full bg-[var(--pink-dark)] text-[var(--white)] py-2 rounded-md font-medium'
              >
                Sign Up
              </button>

              <h2 className='text-base font-bold pt-4'>Explore</h2>
              <div className='flex flex-col gap-3'>
                <button onClick={() => setActive('stories')} className='text-left text-sm text-gray-700'>Story Categories</button>
                <button onClick={() => setActive('pages')} className='text-left text-sm text-gray-700'>Other Pages</button>
              </div>

              <div className="mt-36 pt-2">
                <h2 className="text-center text-sm font-medium text-gray-700 mb-3">Connect With Us</h2>
                <div className="flex justify-center gap-4 mb-4">
                  <div className="border border-gray-300 rounded-md p-2">
                    <Facebook className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="border border-gray-300 rounded-md p-2">
                    <Twitter className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="border border-gray-300 rounded-md p-2">
                    <Linkedin className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="border border-gray-300 rounded-md p-2">
                    <Instagram className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="border border-gray-300 rounded-md p-2">
                    <MessageCircle className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
                <p className="text-center text-xs text-gray-400">© 2025 All rights reserved by Storyious</p>
              </div>
            </>
          )}

          {active === 'stories' && (
            <div>
              <div className='flex items-center gap-2 mb-3 cursor-pointer' onClick={() => setActive('')}>
                <ArrowLeft className='w-4 h-4' /> <span className='text-sm font-medium'>Back</span>
              </div>
              <h3 className='text-base font-bold mb-2'>Story Categories</h3>
              <div className='flex flex-col gap-2'>
                <Link to="/allstories" onClick={handleNavigate} className='text-[var(--pink-dark)] text-sm'>Written Stories</Link>
                <Link to="/Video-Page" onClick={handleNavigate} className='text-[var(--pink-dark)] text-sm'>Video Stories</Link>
              </div>
            </div>
          )}

          {active === 'pages' && (
            <div>
              <div className='flex items-center gap-2 mb-3 cursor-pointer' onClick={() => setActive('')}>
                <ArrowLeft className='w-4 h-4' /> <span className='text-sm font-medium'>Back</span>
              </div>
              <h3 className='text-base font-bold mb-2'>Other Pages</h3>
              <div className='flex flex-col gap-2'>
                {otherPages.map((item, index) => (
                  <Link key={index} to={item.path} onClick={handleNavigate} className='text-sm text-gray-700'>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Desktop Explore Dropdown */}
      {exploreOpen && (
        <div className='hidden md:flex fixed left-0 top-[60px] w-screen h-[420px] bg-[var(--white)] shadow-lg z-50 gap-12 px-10 py-8'>
          <div className='flex flex-col gap-3 min-w-[200px]'>
            <h2 className='text-lg font-bold mb-2'>Explore</h2>
            <a href='#' onClick={() => setActive('stories')} className='text-md hover:text-[var(--pink-dark)] hover:font-bold'>Story Categories</a>
            <a href='#' onClick={() => setActive('pages')} className='text-md hover:text-[var(--pink-dark)] hover:font-bold'>Other Pages</a>
          </div>

          {active === 'stories' && (
            <div className='w-[1000px]'>
              <div className="flex justify-between items-center mb-2 flex-wrap ">
                <h4 className='text-lg font-semibold'>Story Category</h4>
                <div className='flex gap-4'>
                  <Link to="/allstories" onClick={handleNavigate} className="text-[var(--pink-dark)] text-sm font-medium inline-flex items-center gap-1 ">
                    Written Stories <ArrowRight className='w-5 h-5 ' />
                  </Link>
                  <Link to="/Video-Page" onClick={handleNavigate} className="text-[var(--pink-dark)] text-sm font-medium inline-flex items-center gap-1 ">
                    Video Stories <ArrowRight className='w-5 h-5 ' />
                  </Link>
                </div>
              </div>
              <div className="flex gap-28">
                <div className="flex flex-col gap-1">
                  {storyCategories.map((item, index) => (
                    <a key={index} href="#" onClick={handleNavigate} className="text-black p-2 text-md block">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === 'pages' && (
            <div>
              <h4 className='text-lg font-semibold mb-2'>Other Pages</h4>
              <div className="flex gap-28">
                <div className="flex flex-col gap-1">
                  {otherPages.slice(0, 6).map((item, index) => (
                    <Link key={index} to={item.path} onClick={handleNavigate} className="text-black p-2 text-md block">
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  {otherPages.slice(6).map((item, index) => (
                    <Link key={index} to={item.path} onClick={handleNavigate} className="text-black p-2 text-md block">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <Subscribe show={showSubscribeModal} onClose={() => setShowSubscribeModal(false)} />
      <StartQuiz show={quizpopup} onClose={() => setquizpopup(false)} />
    </div>
  );
};

export default Navbar;