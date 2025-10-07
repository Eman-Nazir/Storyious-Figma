// import React, { useState, useEffect } from 'react';
// import storyiousLogo from "../../assets/images/storyiousLogo.png";
// import Subscribe from '../../components/common/Subscribe';
// import StartQuiz from '../../components/common/StartQuiz';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   ChevronDown, Menu, Search, ArrowRight, X, ArrowLeft, Loader
// } from 'lucide-react';
// import {
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
//   MessageCircle
// } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:8000/api';

// const storyCategories = [
//   { name: 'Moral Stories', path: '/category/moral-stories' },
//   { name: 'Fairytales', path: '/category/fairytales' },
//   { name: 'Scary Stories', path: '/category/scary-stories' },
//   { name: 'Bedtime Stories', path: '/category/bedtime-stories' },
//   { name: 'Classic Stories', path: '/category/classic-stories' },
//   { name: 'Fables', path: '/category/fables' }
// ];

// const otherPages = [
//   { label: 'All Authors', path: '/author-Page' },
//   { label: 'Write For Us', path: '/WriteFor-Us' },
//   { label: 'Writing Rules', path: '/CPF-Rules' },
//   { label: 'About Us', path: '/About-Us' },
//   { label: 'Contact Us', path: '/ContactUs' },
//   { label: 'Privacy Policy', path: '/privacy' },
//   { label: 'Stories FAQ', path: '/faqs' },
//   { label: 'Disclaimer', path: '/disclaimer' },
//   { label: 'Blogs', path: '/Blog-Page' },
// ];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [active, setActive] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [exploreOpen, setExploreOpen] = useState(false);
//   const [showSubscribeModal, setShowSubscribeModal] = useState(false);
//   const [quizpopup, setquizpopup] = useState(false);
//   const navigate = useNavigate();
//   const [searchInput, setSearchInput] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);
//   const [searchError, setSearchError] = useState('');

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//     setActive('');
//   };

//   const toggleExplore = () => {
//     setExploreOpen(!exploreOpen);
//   };

//   const handleNavigate = () => {
//     setExploreOpen(false);
//     setIsOpen(false);
//     setActive(''); 
//     setShowResults(false);
//   };

//   // Search function
//   const submitSearch = async (searchTerm = searchInput) => {
//     if (!searchTerm.trim()) {
//       setSearchResults([]);
//       setShowResults(false);
//       return;
//     }

//     setIsSearching(true);
//     setSearchError('');

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}&limit=5`
//       );
      
//       if (!response.ok) {
//         throw new Error('Search failed');
//       }

//       const data = await response.json();
      
//       if (data.data && data.data.results) {
//         const allResults = [];
        
//         Object.keys(data.data.results).forEach(type => {
//           if (data.data.results[type] && Array.isArray(data.data.results[type])) {
//             data.data.results[type].forEach(item => {
//               allResults.push({ ...item, resultType: type });
//             });
//           }
//         });

//         setSearchResults(allResults.slice(0, 8));
//         setShowResults(true);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchError('Search failed. Please try again.');
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

 
//   const handleQuickSearch = async (term) => {
//     if (term.length < 2) {
//       setSearchResults([]);
//       setShowResults(false);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/search/quick?q=${encodeURIComponent(term)}`
//       );
      
//       if (response.ok) {
//         const data = await response.json();
//         setSearchResults(data.data?.suggestions || []);
//         setShowResults(true);
//       }
//     } catch (error) {
//       console.error('Quick search error:', error);
//       submitSearch(term);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchInput.trim()) {
//         handleQuickSearch(searchInput);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchInput]);

//   const handleSearchItemClick = (item) => {
//     let path = '';
    
//     switch (item.resultType) {
//       case 'stories':
//         path = `/story/${item._id}`;
//         break;
//       case 'blogs':
//         path = `/blog/${item._id}`;
//         break;
//       case 'authors':
//         path = `/writers/${item.slug || item._id}`;
//         break;
//       case 'categories':
//         const categoryName = encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, '-'));
//         path = `/category/${categoryName}`;
//         break;
//       case 'faqs':
//         path = `/faq/${item.slug || item._id}`;
//         break;
//       default:
//         path = `/search?q=${encodeURIComponent(searchInput)}`;
//     }

//     setSearchInput('');
//     setShowResults(false);
//     setShowSearch(false);
//     navigate(path);
//   };

//   const handleFullSearch = () => {
//     if (searchInput.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchInput)}`);
//       setSearchInput('');
//       setShowResults(false);
//       setShowSearch(false);
//     }
//   };

//   const handleCategoryClick = (path) => {
//     navigate(path);
//     setExploreOpen(false);
//     setIsOpen(false);
//     setActive('');
//   };

//   const getResultIcon = (type) => {
//     switch (type) {
//       case 'stories': return '📖';
//       case 'blogs': return '📝';
//       case 'authors': return '👤';
//       case 'categories': return '📂';
//       case 'faqs': return '❓';
//       default: return '🔍';
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showResults && !event.target.closest('.search-container')) {
//         setShowResults(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [showResults]);

//   return (
//     <div className='relative bg-[var(--white)] shadow-sm '>
//       {/* Top Navbar */}
//       <nav className='py-2 max-w-[1200px] mx-auto flex flex-wrap justify-between items-center px-4 md:px-6'>
//         <div className='flex items-center gap-3 flex-1 relative'>
//           <Link to="/">
//             <img className='w-[36px] h-[45px] cursor-pointer' src={storyiousLogo} alt="Logo" />
//           </Link>

//           <div className='relative hidden md:block'>
//             <div
//               onClick={toggleExplore}
//               onMouseEnter={() => setExploreOpen(true)}
//               className='flex items-center gap-1 font-semibold cursor-pointer'
//             >
//               <span>Explore</span>
//               <ChevronDown
//                 className={`w-5 h-5 text-gray-950 transition-transform duration-300 ${exploreOpen ? 'rotate-180' : ''}`}
//               />
//             </div>
//           </div>

//           {/* Search Bar - Desktop */}
//           <div className='hidden md:flex ml-2 rounded-lg border border-[var(--gray-light)] relative search-container'>
//             <input
//               type='text'
//               placeholder='Search stories, authors, blogs...'
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleFullSearch()}
//               onFocus={() => searchInput && setShowResults(true)}
//               onClick={(e) => e.stopPropagation()}
//               className='px-4 py-2 pr-24 bg-transparent outline-none text-sm w-80'
//             />
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleFullSearch();
//               }}
//               className='absolute right-0 top-0 bottom-0 flex items-center justify-center'
//             >
//               {isSearching ? (
//                 <Loader className='text-[var(--white)] rounded-md w-11 h-11 p-2 bg-[var(--pink-dark)] animate-spin' />
//               ) : (
//                 <Search className='text-[var(--white)] rounded-md w-11 h-11 p-2 bg-[var(--pink-dark)]' />
//               )}
//             </button>

//             {/* Search Results Dropdown */}
//             {showResults && searchResults.length > 0 && (
//               <div 
//                 className='absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto'
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {searchResults.map((item, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleSearchItemClick(item)}
//                     className='p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0'
//                   >
//                     <div className='flex items-center gap-3'>
//                       <span className='text-lg'>{getResultIcon(item.resultType)}</span>
//                       <div className='flex-1'>
//                         <div className='font-medium text-sm'>{item.title || item.name || item.question}</div>
//                         <div className='text-xs text-gray-600 mt-1'>
//                           {item.introText || item.bio || item.description || item.answer || ''}
//                         </div>
//                         <div className='text-xs text-gray-400 capitalize'>{item.resultType}</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleFullSearch();
//                   }}
//                   className='p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer text-center font-medium text-sm text-[var(--pink-dark)]'
//                 >
//                   View all results for "{searchInput}"
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Desktop Buttons */}
//         <div className='hidden md:flex gap-3'>
//           <button
//             onClick={() => setquizpopup(true)}
//             className='bg-[var(--pink-dark)] px-4 py-1 text-[var(--white)] rounded-md text-sm font-medium cursor-pointer'
//           >
//             Start Quiz
//           </button>

//           <button
//             onClick={() => setShowSubscribeModal(true)}
//             className='px-4 py-1 text-[var(--pink-dark)] border border-[var(--pink-dark)] rounded-md text-sm font-medium cursor-pointer'
//           >
//             Subscribe
//           </button>

//           <button
//             onClick={() => {
//               handleNavigate();
//               navigate('/signup');
//             }}
//             className='bg-[var(--pink-dark)] text-[var(--white)] px-4 py-1 rounded-md text-sm font-medium cursor-pointer'
//           >
//             Sign Up
//           </button>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className='md:hidden flex gap-4 items-center'>
//           <button onClick={() => setShowSearch(!showSearch)}>
//             <Search className='w-6 h-6 text-[var(--pink-dark)]' />
//           </button>
//           <button onClick={toggleDropdown}>
//             {isOpen ? <X className='w-7 h-7 text-[var(--pink-dark)]' /> : <Menu className='w-7 h-7 text-[var(--pink-dark)]' />}
//           </button>
//         </div>
//       </nav>
      
//       {/* Mobile Search Bar */}
//       {showSearch && (
//         <div className='md:hidden px-4 py-2 bg-[var(--white)] shadow-sm flex gap-2 relative search-container'>
//           <input
//             type='text'
//             placeholder='Search stories, authors, blogs...'
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleFullSearch()}
//             className='flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none'
//           />
//           <button 
//             onClick={handleFullSearch}
//             className='bg-[var(--pink-dark)] text-[var(--white)] px-4 py-2 rounded-md flex items-center gap-2'
//           >
//             {isSearching ? <Loader className='w-4 h-4 animate-spin' /> : <Search className='w-4 h-4' />}
//             Search
//           </button>

//           {/* Mobile Search Results */}
//           {showResults && searchResults.length > 0 && (
//             <div className='absolute top-full left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-64 overflow-y-auto'>
//               {searchResults.map((item, index) => (
//                 <div
//                   key={index}
//                   onClick={() => handleSearchItemClick(item)}
//                   className='p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0'
//                 >
//                   <div className='flex items-center gap-3'>
//                     <span className='text-lg'>{getResultIcon(item.resultType)}</span>
//                     <div className='flex-1'>
//                       <div className='font-medium text-sm'>{item.title || item.name || item.question}</div>
//                       <div className='text-xs text-gray-600'>{item.resultType}</div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <div 
//                 onClick={handleFullSearch}
//                 className='p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer text-center font-medium text-sm text-[var(--pink-dark)]'
//               >
//                 View all results
//               </div>
//             </div>
//           )}
//         </div>
//       )}
      
//       {/* Yellow Banner */}
//       <div
//         className="bg-[var(--yellow-soft)] w-full"
//         style={{ boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)" }}
//       >
//         <div className="px-6 py-3 hidden md:flex items-center justify-between">
//           <div className="flex-1 flex justify-center items-center gap-3">
//             <h1 className="text-sm md:text-base">Want to read more stories?</h1>
//             <button className="bg-[var(--blue-primary)] text-[var(--white)] px-3 py-1.5 rounded-md">
//               Read Now!
//             </button>
//           </div>
//           <X className="text-gray-500 cursor-pointer" />
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className='md:hidden bg-[var(--white)] shadow-md px-4 py-6 space-y-3 min-h-[605px]'>
//           {!active && (
//             <>
//               <button onClick={() => setquizpopup(true)} className='w-full bg-[var(--pink-dark)] text-[var(--white)] py-2 rounded-md font-medium'>Start Quiz</button>
//               <button onClick={() => setShowSubscribeModal(true)} className='w-full border border-[var(--pink-dark)] text-[var(--pink-dark)] py-2 rounded-md font-medium'>Subscribe</button>
//               <button
//                 onClick={() => {
//                   handleNavigate();
//                   navigate('/signup');
//                 }}
//                 className='w-full bg-[var(--pink-dark)] text-[var(--white)] py-2 rounded-md font-medium'
//               >
//                 Sign Up
//               </button>

//               <h2 className='text-base font-bold pt-4'>Explore</h2>
//               <div className='flex flex-col gap-3'>
//                 <button onClick={() => setActive('stories')} className='text-left text-sm text-gray-700'>Story Categories</button>
//                 <button onClick={() => setActive('pages')} className='text-left text-sm text-gray-700'>Other Pages</button>
//               </div>

//               <div className="mt-36 pt-2">
//                 <h2 className="text-center text-sm font-medium text-gray-700 mb-3">Connect With Us</h2>
//                 <div className="flex justify-center gap-4 mb-4">
//                   <div className="border border-gray-300 rounded-md p-2">
//                     <Facebook className="w-4 h-4 text-gray-700" />
//                   </div>
//                   <div className="border border-gray-300 rounded-md p-2">
//                     <Twitter className="w-4 h-4 text-gray-700" />
//                   </div>
//                   <div className="border border-gray-300 rounded-md p-2">
//                     <Linkedin className="w-4 h-4 text-gray-700" />
//                   </div>
//                   <div className="border border-gray-300 rounded-md p-2">
//                     <Instagram className="w-4 h-4 text-gray-700" />
//                   </div>
//                   <div className="border border-gray-300 rounded-md p-2">
//                     <MessageCircle className="w-4 h-4 text-gray-700" />
//                   </div>
//                 </div>
//                 <p className="text-center text-xs text-gray-400">© 2025 All rights reserved by Storyious</p>
//               </div>
//             </>
//           )}

//           {active === 'stories' && (
//             <div>
//               <div className='flex items-center gap-2 mb-3 cursor-pointer' onClick={() => setActive('')}>
//                 <ArrowLeft className='w-4 h-4' /> <span className='text-sm font-medium'>Back</span>
//               </div>
//               <h3 className='text-base font-bold mb-2'>Story Categories</h3>
//               <div className='flex flex-col gap-2'>
//                 <Link to="/allstories" onClick={handleNavigate} className='text-[var(--pink-dark)] text-sm font-medium'>Written Stories</Link>
//                 <Link to="/Video-Page" onClick={handleNavigate} className='text-[var(--pink-dark)] text-sm font-medium'>Video Stories</Link>
//                 <div className='border-t border-gray-200 my-2 pt-2'>
//                   <h4 className='text-sm font-semibold text-gray-600 mb-1'>Story Categories</h4>
//                   {storyCategories.map((category, index) => (
//                     <Link 
//                       key={index} 
//                       to={category.path} 
//                       onClick={handleNavigate} 
//                       className='text-sm text-gray-700 block py-1'
//                     >
//                       {category.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {active === 'pages' && (
//             <div>
//               <div className='flex items-center gap-2 mb-3 cursor-pointer' onClick={() => setActive('')}>
//                 <ArrowLeft className='w-4 h-4' /> <span className='text-sm font-medium'>Back</span>
//               </div>
//               <h3 className='text-base font-bold mb-2'>Other Pages</h3>
//               <div className='flex flex-col gap-2'>
//                 {otherPages.map((item, index) => (
//                   <Link key={index} to={item.path} onClick={handleNavigate} className='text-sm text-gray-700'>
//                     {item.label}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Desktop Explore Dropdown */}
//       {exploreOpen && (
//         <div 
//           className='hidden md:flex fixed left-0 top-[60px] w-screen h-[320px] bg-[var(--white)] shadow-lg z-50 gap-8 px-8 py-6'
//           onMouseLeave={() => setExploreOpen(false)}
//         >
//           <div className='flex flex-col gap-3 min-w-[180px]'>
//             <h2 className='text-lg font-bold mb-2'>Explore</h2>
//             <button onClick={() => setActive('stories')} className='text-md hover:text-[var(--pink-dark)] hover:font-bold text-left'>Story Categories</button>
//             <button onClick={() => setActive('pages')} className='text-md hover:text-[var(--pink-dark)] hover:font-bold text-left'>Other Pages</button>
//           </div>

//           {active === 'stories' && (
//             <div className='flex-1'>
//               <h4 className='text-lg font-semibold mb-3'>Story Categories</h4>
//               <div className="flex gap-40">
//                 <div className="flex flex-col gap-3">
//                   {storyCategories.map((category, index) => (
//                     <button 
//                       key={index} 
//                       onClick={() => handleCategoryClick(category.path)}
//                       className="text-black p-1 text-sm block text-left hover:text-[var(--pink-dark)] hover:font-medium"
//                     >
//                       {category.name}
//                     </button>
//                   ))}
//                 </div>
                
//                 <div className="flex flex-col gap-3">
//                   <Link to="/allstories" onClick={handleNavigate} className="text-black p-1 text-sm block text-left hover:text-[var(--pink-dark)] hover:font-medium">
//                     Written Stories
//                   </Link>
//                   <Link to="/Video-Page" onClick={handleNavigate} className="text-black p-1 text-sm block text-left hover:text-[var(--pink-dark)] hover:font-medium">
//                     Video Stories
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           )}

//           {active === 'pages' && (
//             <div className='flex-1'>
//               <h4 className='text-lg font-semibold mb-3'>Other Pages</h4>
//               <div className="grid grid-cols-2 gap-8">
//                 <div className="flex flex-col gap-3">
//                   {otherPages.slice(0, 5).map((item, index) => (
//                     <Link 
//                       key={index} 
//                       to={item.path} 
//                       onClick={handleNavigate} 
//                       className="text-black p-1 text-sm block hover:text-[var(--pink-dark)] hover:font-medium"
//                     >
//                       {item.label}
//                     </Link>
//                   ))}
//                 </div>
                
//                 <div className="flex flex-col gap-3">
//                   {otherPages.slice(5).map((item, index) => (
//                     <Link 
//                       key={index} 
//                       to={item.path} 
//                       onClick={handleNavigate} 
//                       className="text-black p-1 text-sm block hover:text-[var(--pink-dark)] hover:font-medium"
//                     >
//                       {item.label}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <Subscribe show={showSubscribeModal} onClose={() => setShowSubscribeModal(false)} />
//       <StartQuiz show={quizpopup} onClose={() => setquizpopup(false)} />
//     </div>
//   );
// };

// export default Navbar;






import React, { useState, useEffect } from 'react';
import storyiousLogo from "../../assets/images/storyiousLogo.png";
import Subscribe from '../../components/common/Subscribe';
import StartQuiz from '../../components/common/StartQuiz';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown, Menu, Search, ArrowRight, X, ArrowLeft, Loader
} from 'lucide-react';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api';

const storyCategories = [
  { name: 'Moral Stories', path: '/category/moral-stories' },
  { name: 'Fairytales', path: '/category/fairytales' },
  { name: 'Scary Stories', path: '/category/scary-stories' },
  { name: 'Bedtime Stories', path: '/category/bedtime-stories' },
  { name: 'Classic Stories', path: '/category/classic-stories' },
  { name: 'Fables', path: '/category/fables' }
];

const otherPages = [
  { label: 'All Authors', path: '/author-Page' },
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
  const [showYellowBanner, setShowYellowBanner] = useState(true); // New state for yellow banner
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

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
    setShowResults(false);
  };

  // Search function
  const submitSearch = async (searchTerm = searchInput) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setSearchError('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}&limit=5`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      
      if (data.data && data.data.results) {
        const allResults = [];
        
        Object.keys(data.data.results).forEach(type => {
          if (data.data.results[type] && Array.isArray(data.data.results[type])) {
            data.data.results[type].forEach(item => {
              allResults.push({ ...item, resultType: type });
            });
          }
        });

        setSearchResults(allResults.slice(0, 8));
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Search failed. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

 
  const handleQuickSearch = async (term) => {
    if (term.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/search/quick?q=${encodeURIComponent(term)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data?.suggestions || []);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Quick search error:', error);
      submitSearch(term);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim()) {
        handleQuickSearch(searchInput);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearchItemClick = (item) => {
    let path = '';
    
    switch (item.resultType) {
      case 'stories':
        path = `/story/${item._id}`;
        break;
      case 'blogs':
        path = `/blog/${item._id}`;
        break;
      case 'authors':
        path = `/writers/${item.slug || item._id}`;
        break;
      case 'categories':
        const categoryName = encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, '-'));
        path = `/category/${categoryName}`;
        break;
      case 'faqs':
        path = `/faq/${item.slug || item._id}`;
        break;
      default:
        path = `/search?q=${encodeURIComponent(searchInput)}`;
    }

    setSearchInput('');
    setShowResults(false);
    setShowSearch(false);
    navigate(path);
  };

  const handleFullSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
      setSearchInput('');
      setShowResults(false);
      setShowSearch(false);
    }
  };

  const handleCategoryClick = (path) => {
    navigate(path);
    setExploreOpen(false);
    setIsOpen(false);
    setActive('');
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'stories': return '📖';
      case 'blogs': return '📝';
      case 'authors': return '👤';
      case 'categories': return '📂';
      case 'faqs': return '❓';
      default: return '🔍';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showResults && !event.target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showResults]);

  // Function to handle yellow banner close
  const handleCloseYellowBanner = () => {
    setShowYellowBanner(false);
  };

  return (
    <div className='relative bg-[var(--white)] shadow-sm '>
      {/* Top Navbar */}
      <nav className='py-2 max-w-[1200px] mx-auto flex flex-wrap justify-between items-center px-4 md:px-6'>
        <div className='flex items-center gap-3 flex-1 relative'>
          <Link to="/">
            <img className='w-[36px] h-[45px] cursor-pointer' src={storyiousLogo} alt="Logo" />
          </Link>

          <div className='relative hidden md:block'>
            <div
              onClick={toggleExplore}
              onMouseEnter={() => setExploreOpen(true)}
              className='flex items-center gap-1 font-semibold cursor-pointer'
            >
              <span>Explore</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-950 transition-transform duration-300 ${exploreOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className='hidden md:flex ml-2 rounded-lg border border-[var(--gray-light)] relative search-container'>
            <input
              type='text'
              placeholder='Search stories, authors, blogs...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFullSearch()}
              onFocus={() => searchInput && setShowResults(true)}
              onClick={(e) => e.stopPropagation()}
              className='px-4 py-2 pr-24 bg-transparent outline-none text-sm w-80'
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleFullSearch();
              }}
              className='absolute right-0 top-0 bottom-0 flex items-center justify-center'
            >
              {isSearching ? (
                <Loader className='text-[var(--white)] rounded-md w-11 h-11 p-2 bg-[var(--pink-dark)] animate-spin' />
              ) : (
                <Search className='text-[var(--white)] rounded-md w-11 h-11 p-2 bg-[var(--pink-dark)]' />
              )}
            </button>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div 
                className='absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto'
                onClick={(e) => e.stopPropagation()}
              >
                {searchResults.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSearchItemClick(item)}
                    className='p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0'
                  >
                    <div className='flex items-center gap-3'>
                      <span className='text-lg'>{getResultIcon(item.resultType)}</span>
                      <div className='flex-1'>
                        <div className='font-medium text-sm'>{item.title || item.name || item.question}</div>
                        <div className='text-xs text-gray-600 mt-1'>
                          {item.introText || item.bio || item.description || item.answer || ''}
                        </div>
                        <div className='text-xs text-gray-400 capitalize'>{item.resultType}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFullSearch();
                  }}
                  className='p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer text-center font-medium text-sm text-[var(--pink-dark)]'
                >
                  View all results for "{searchInput}"
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Buttons */}
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
      
      {/* Mobile Search Bar */}
      {showSearch && (
        <div className='md:hidden px-4 py-2 bg-[var(--white)] shadow-sm flex gap-2 relative search-container'>
          <input
            type='text'
            placeholder='Search stories, authors, blogs...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFullSearch()}
            className='flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm outline-none'
          />
          <button 
            onClick={handleFullSearch}
            className='bg-[var(--pink-dark)] text-[var(--white)] px-4 py-2 rounded-md flex items-center gap-2'
          >
            {isSearching ? <Loader className='w-4 h-4 animate-spin' /> : <Search className='w-4 h-4' />}
            Search
          </button>

          {/* Mobile Search Results */}
          {showResults && searchResults.length > 0 && (
            <div className='absolute top-full left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-64 overflow-y-auto'>
              {searchResults.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSearchItemClick(item)}
                  className='p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0'
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-lg'>{getResultIcon(item.resultType)}</span>
                    <div className='flex-1'>
                      <div className='font-medium text-sm'>{item.title || item.name || item.question}</div>
                      <div className='text-xs text-gray-600'>{item.resultType}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div 
                onClick={handleFullSearch}
                className='p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer text-center font-medium text-sm text-[var(--pink-dark)]'
              >
                View all results
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Yellow Banner */}
      {showYellowBanner && (
        <div
          className="bg-[var(--yellow-soft)] w-full"
          style={{ boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="px-6 py-3 hidden md:flex items-center justify-between">
            <div className="flex-1 flex justify-center items-center gap-3">
              <h1 className="text-sm md:text-base">Want to read more stories?</h1>
              <button className="bg-[var(--blue-primary)] text-[var(--white)] px-3 py-1.5 rounded-md">
                Read Now!
              </button>
            </div>
            <X 
              className="text-gray-500 cursor-pointer" 
              onClick={handleCloseYellowBanner} // Added click handler here
            />
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className='md:hidden bg-[var(--white)] shadow-md px-4 py-6 space-y-3 min-h-[605px]'>
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
                <Link to="/allstories" onClick={handleNavigate} className='text-[var(--pink-dark)] text-sm font-medium'>Written Stories</Link>
                <Link to="/Video-Page" onClick={handleNavigate} className='text-[var(--pink-dark)] text-sm font-medium'>Video Stories</Link>
                <div className='border-t border-gray-200 my-2 pt-2'>
                  <h4 className='text-sm font-semibold text-gray-600 mb-1'>Story Categories</h4>
                  {storyCategories.map((category, index) => (
                    <Link 
                      key={index} 
                      to={category.path} 
                      onClick={handleNavigate} 
                      className='text-sm text-gray-700 block py-1'
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
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
        <div 
          className='hidden md:flex fixed left-0 top-[60px] w-screen h-[320px] bg-[var(--white)] shadow-lg z-50 gap-8 px-8 py-6'
          onMouseLeave={() => setExploreOpen(false)}
        >
          <div className='flex flex-col gap-3 min-w-[180px]'>
            <h2 className='text-lg font-bold mb-2'>Explore</h2>
            <button onClick={() => setActive('stories')} className='text-md hover:text-[var(--pink-dark)] hover:font-bold text-left'>Story Categories</button>
            <button onClick={() => setActive('pages')} className='text-md hover:text-[var(--pink-dark)] hover:font-bold text-left'>Other Pages</button>
          </div>

          {active === 'stories' && (
            <div className='flex-1'>
              <h4 className='text-lg font-semibold mb-3'>Story Categories</h4>
              <div className="flex gap-40">
                <div className="flex flex-col gap-3">
                  {storyCategories.map((category, index) => (
                    <button 
                      key={index} 
                      onClick={() => handleCategoryClick(category.path)}
                      className="text-black p-1 text-sm block text-left hover:text-[var(--pink-dark)] hover:font-medium"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-col gap-3">
                  <Link to="/allstories" onClick={handleNavigate} className="text-black p-1 text-sm block text-left hover:text-[var(--pink-dark)] hover:font-medium">
                    Written Stories
                  </Link>
                  <Link to="/Video-Page" onClick={handleNavigate} className="text-black p-1 text-sm block text-left hover:text-[var(--pink-dark)] hover:font-medium">
                    Video Stories
                  </Link>
                </div>
              </div>
            </div>
          )}

          {active === 'pages' && (
            <div className='flex-1'>
              <h4 className='text-lg font-semibold mb-3'>Other Pages</h4>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  {otherPages.slice(0, 5).map((item, index) => (
                    <Link 
                      key={index} 
                      to={item.path} 
                      onClick={handleNavigate} 
                      className="text-black p-1 text-sm block hover:text-[var(--pink-dark)] hover:font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                
                <div className="flex flex-col gap-3">
                  {otherPages.slice(5).map((item, index) => (
                    <Link 
                      key={index} 
                      to={item.path} 
                      onClick={handleNavigate} 
                      className="text-black p-1 text-sm block hover:text-[var(--pink-dark)] hover:font-medium"
                    >
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