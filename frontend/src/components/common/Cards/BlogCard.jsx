import { Link } from 'react-router-dom';
import { Clock7, Eye, CalendarRange } from "lucide-react";
import { GoComment } from "react-icons/go";

const BlogCard = ({ article }) => {

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-image.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000/${imagePath.replace(/\\/g, '/')}`;
  };

  const formatAuthorImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-avatar.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000/${imagePath.replace(/\\/g, '/')}`;
  };

  const getFirstImage = () => {
    if (article.cards && article.cards.length > 0) {
      const cardWithImage = article.cards.find(card => card.image);
      return cardWithImage ? formatImageUrl(cardWithImage.image) : '/placeholder-image.jpg';
    }
    return '/placeholder-image.jpg';
  };

  const firstImage = getFirstImage();

  return (
    <div className="border border-[var(--gray-light)] rounded-xl overflow-hidden mb-8 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
      <Link to={`/blog/${article._id}`} className="flex flex-col sm:flex-row sm:h-[240px]">
        
        {/* Left Image Section */}
        {firstImage && (
          <div className="sm:w-1/3 w-full h-[240px] sm:h-auto">
            <img
              src={firstImage}
              alt={article.title || 'Blog Image'}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = '/placeholder-image.jpg'; }}
            />
          </div>
        )}
        
        {/* Right Content Section */}
        <div className={`flex flex-col justify-between p-6 ${firstImage ? "sm:w-2/3" : "w-full"}`}>
          <div>
            <h2 className="text-xl font-bold text-[var(--text-dark)] mb-2 line-clamp-2">
              {article.title || "Untitled Blog"}
            </h2>
            <p className="text-[var(--text-gray)] mb-4 line-clamp-3">
              {article.introText || "No description available."}
            </p>

            {/* Author Info */}
            {article.author && (
              <div className="flex items-center mt-2 mb-3">
                <img 
                  src={formatAuthorImageUrl(article.author.image)} 
                  alt={article.author.name}
                  className="w-7 h-7 rounded-full mr-2 object-cover"
                  onError={(e) => { e.target.src = '/placeholder-avatar.png'; }}
                />
                <span className="text-sm text-gray-700 font-medium">{article.author.name}</span>
              </div>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <CalendarRange className="w-4 h-4" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock7 className="w-4 h-4" />
              <span>{article.meta?.readTime || '5 Min'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{article.meta?.views || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <GoComment className="w-4 h-4" />
              <span>{article.commentsCount || 0}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
