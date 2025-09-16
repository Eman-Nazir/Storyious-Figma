import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaInstagram
} from 'react-icons/fa6';
import AllStories from './AllStories';

const iconMap = {
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  pinterest: FaPinterestP,
  instagram: FaInstagram
};

const AuthorDetailPage = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullBio, setShowFullBio] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/authors/slug/${slug}`);
        if (!response.ok) {
          throw new Error('Author not found');
        }
        const data = await response.json();
        setAuthor(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching author:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [slug]);

  if (loading) return <div className="text-center py-10">Loading author...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!author) return <div className="text-center py-10">Author not found</div>;

  return (
    <div>
      {/* Top Section */}
      <div className='px-4 sm:px-6 md:px-10 lg:px-30 pt-10 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] flex flex-col md:flex-row gap-6 md:gap-10 items-center py-6 my-6'>
        
        <img
          src={author.image}
          alt={author.name}
          className='w-full max-w-[250px] rounded-lg object-cover'
        />

        <div className='space-y-3 text-center md:text-left'>
          <h1 className='font-bold text-2xl text-[var(--text-dark)]'>
            {author.name}
          </h1>

          <p className='hidden md:block max-w-[700px] text-[var(--text-gray)]'>
            {author.shortBio}
          </p>

          <div className="flex justify-center md:justify-start flex-wrap gap-2 pt-2">
            {author.socials?.map((social, index) => {
              const Icon = iconMap[social.platform];
              return Icon ? (
                <a
                  key={index}
                  href="#"
                  className="bg-[var(--white)] border border-[var(--pink-dark)] text-[var(--pink-dark)] p-2 rounded-md"
                >
                  <Icon />
                </a>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* About the Writer  */}
      <div className='m-0 md:m-10 px-6 sm:px-10 md:px-20'>
        <h1 className='font-bold text-xl mb-2 text-[var(--text-dark)]'>About the Writer</h1>

        <p className='hidden md:block text-justify leading-relaxed text-sm text-[var(--text-gray)]'>
          {author.fullBio}
        </p>

        {/* Mobile toggle bio */}
        <div className='block md:hidden'>
          <p className='text-justify text-sm text-[var(--text-gray)]'>
            {showFullBio ? author.fullBio : author.shortBio}
          </p>
          <button
            className='mt-2 mb-2 px-4 py-1 rounded-md text-white bg-[var(--pink-dark)] text-sm'
            onClick={() => setShowFullBio(!showFullBio)}
          >
            {showFullBio ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>

      <AllStories authorId={author._id} />
    </div>
  );
};

export default AuthorDetailPage;