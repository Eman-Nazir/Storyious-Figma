import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock7, Eye, CalendarRange } from "lucide-react";
import { GoComment } from "react-icons/go";
import Share from "../assets/icons/Share";
import { LuCopyCheck } from "react-icons/lu";
import StartQuiz from "../components/common/StartQuiz";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram } from 'react-icons/fa6';
import Comment from '../sections/StoryDetailedPage/1stStory/Comment';
import CommentsList from '../sections/StoryDetailedPage/1stStory/CommentsList';
import axios from "axios";

const API_URL = 'http://localhost:8000/api/blogs';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizpopup, setquizpopup] = useState(false);
  const [refreshComments, setRefreshComments] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [ad, setAd] = useState(null);

  const handleCommentAdded = () => {
    setRefreshComments(prev => prev + 1);
    setCommentsCount(prev => prev + 1);
  };

  // Fetch blog from backend
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/${id}`);
        const data = res.data;

        if (data.success && data.data?.blog) {
          setBlog(data.data.blog);
          fetchCommentsCount();
        } else if (data.success && data.blog) {
          setBlog(data.blog);
          fetchCommentsCount();
        } else {
          setBlog(data);
          fetchCommentsCount();
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Fetch ad from backend
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/stories/ads");
        if (res.data?.data?.length > 0) {
          setAd(res.data.data[0]);
        }
      } catch (err) {
        console.error("Error fetching ad:", err);
      }
    };
    fetchAd();
  }, []);

  const fetchCommentsCount = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/comments?blogId=${id}`);
      if (res.data.success && res.data.data) {
        setCommentsCount(res.data.data.length);
      }
    } catch (err) {
      console.error("Error fetching comments count:", err);
    }
  };

  useEffect(() => {
    fetchCommentsCount();
  }, [refreshComments]);

  const formatImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-image.jpg';
    return imagePath.startsWith('http') ? imagePath : `http://localhost:8000/${imagePath.replace(/\\/g, '/')}`;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="flex justify-center items-center h-64 text-gray-500">Loading blog...</div>;
  if (error || !blog) return <div className="flex justify-center items-center h-64 text-red-500">Error: {error || 'Blog not found'}</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-10 px-6 lg:px-20 py-10 lg:py-14">

      {/* LEFT SIDE */}
      <div className="w-full lg:w-[65%] space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-dark)]">{blog.title}</h1>

        <div className="flex flex-col sm:flex-row sm:justify-between border-t border-b border-[var(--text-muted)] py-3 gap-4">
          <div className="flex flex-wrap items-center gap-4 text-[var(--text-muted)] text-sm sm:text-base">
            <p className="flex items-center gap-1"><CalendarRange className="w-4 h-4" /> {formatDate(blog.createdAt)}</p>
            <p className="flex items-center gap-1"><Clock7 className="w-4 h-4" /> {blog.meta?.readTime || '5 Min'}</p>
            <p className="flex items-center gap-1"><Eye className="w-4 h-4" /> {blog.meta?.views || 0}</p>
            <p className="flex items-center gap-1"><GoComment className="w-5 h-5" /> {commentsCount} Comments</p>
          </div>
          <div className="flex items-center gap-3">
            <Share />
            <LuCopyCheck className="text-[var(--text-muted)] w-6 h-6 rounded-sm border border-[var(--text-muted)] p-1 cursor-pointer hover:text-[var(--pink-dark)] hover:border-[var(--pink-dark)]" />
          </div>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-justify text-[var(--text-gray)]">{blog.introText}</p>

        {blog.cards?.map((card, idx) => (
          <div key={idx} className="border border-[var(--gray-light)] rounded-xl shadow-md p-6 space-y-4 hover:shadow-lg transition duration-200">
            <div className="flex items-center gap-4">
              <div className="bg-[var(--pink-dark)] text-white text-lg font-bold w-[50px] h-[50px] flex items-center justify-center rounded-lg">{idx + 1}</div>
              <h2 className="text-xl font-bold text-[var(--text-dark)]">{card.title}</h2>
            </div>
            {card.image && <img src={formatImageUrl(card.image)} alt={card.title} className="rounded-md my-4 w-full h-[350px] object-cover" />}
            {card.subtitle && <h3 className="text-lg font-semibold text-[var(--text-dark)]">{card.subtitle}</h3>}
            {card.description && <p className="text-base sm:text-lg leading-relaxed text-justify text-[var(--text-gray)]">{card.description}</p>}
            {card.button_text && card.button_link && (
              <a href={card.button_link} className="inline-block bg-[var(--pink-dark)] text-white px-6 py-3 rounded-md font-medium cursor-pointer hover:opacity-90">
                {card.button_text}
              </a>
            )}
          </div>
        ))}

        <div className="mt-10 space-y-6">
          <h2 className="text-2xl font-semibold text-[var(--text-dark)] border-b border-[var(--gray-light)] pb-2">Comments</h2>
          <Comment onCommentAdded={handleCommentAdded} />
          <CommentsList refresh={refreshComments} />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block w-full lg:w-[25%] space-y-5 mt-10">
        <div className="bg-[var(--bg-section)] p-4 space-y-4 rounded-md shadow-sm">
          <h1 className="text-[var(--text-dark)] font-semibold">Do you have Enough Time?</h1>
          <p className="text-sm text-[var(--text-muted)]">
            Take our 10-minute quiz, with lifelines and swapping options, for a quick snapshot of your English proficiency.
          </p>
          <button onClick={() => setquizpopup(true)} className="bg-[var(--pink-dark)] px-4 py-2 text-white rounded-md text-sm font-medium hover:opacity-90">
            Start Quiz
          </button>
        </div>

        <div className="flex flex-col p-4 rounded-md space-y-3 border border-[var(--gray-light)] shadow-sm">
          <h1 className="text-[var(--text-muted)] font-semibold">Follow Us On</h1>
          <div className="flex flex-wrap justify-center gap-2">
            {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="bg-white border border-[var(--gray-light)] text-[var(--text-muted)] p-2 rounded-md hover:text-[var(--pink-dark)]">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {ad && (
          <div className="relative px-6 py-20 bg-[var(--bg-section)] text-center rounded-md shadow-sm">
            <div className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">Ad</div>
            <h1 className="font-bold text-[var(--text-dark)]">{ad.title || "ADS"}</h1>
            <p className="text-sm text-[var(--text-gray)] mt-2">{ad.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit."}</p>
            {ad.buttonText && <button className="mt-4 bg-pink-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-pink-700 transition-all duration-300">{ad.buttonText}</button>}
          </div>
        )}
      </div>

      <StartQuiz show={quizpopup} onClose={() => setquizpopup(false)} />
    </div>
  );
};

export default BlogDetailPage;
