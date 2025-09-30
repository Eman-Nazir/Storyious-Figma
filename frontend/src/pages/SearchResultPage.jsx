import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Loader, Book, FileText, User, Folder, Clock, Eye, Video, HelpCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api';

const SearchResults = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchTerm) => {
    setLoading(true);
    setError('');

    try {
      const url = `${API_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data.data?.results || {});
    } catch (err) {
      setError('Failed to search. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const navigateToDetail = (path, item) => {
    if (path === 'author') {
      navigate(`/writers/${item.slug}`, { state: { item, fromSearch: true, searchQuery: query } });
    } else if (path === 'category') {
      const categoryName = encodeURIComponent(item.name.toLowerCase().replace(/\s+/g, '-'));
      navigate(`/category/${categoryName}`, { state: { item, fromSearch: true, searchQuery: query } });
    } else {
      navigate(`/${path}/${item._id}`, { state: { item, fromSearch: true, searchQuery: query } });
    }
  };

  const highlightText = (text, term) => {
    if (!text || !term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.split(regex).map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-yellow-200 px-1 rounded">{part}</mark> : part
    );
  };

  // total count of all results
  const getTotalCount = () => {
    return Object.values(results).reduce((total, items) => total + (items?.length || 0), 0);
  };

  
  const renderStories = (stories) => {
    if (!stories || stories.length === 0) return null;
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Book className="w-6 h-6 text-blue-600" />
          Stories ({stories.length})
        </h2>
        <div className="grid gap-4">
          {stories.map((s) => (
            <div key={s._id} onClick={() => navigateToDetail('story', s)} className="bg-white rounded-lg border p-6 hover:shadow-md cursor-pointer transition-shadow">
              <div className="flex items-start gap-4">
                {s.featuredImage && (
                  <img src={s.featuredImage} alt={s.title} className="w-24 h-24 object-cover rounded-lg" />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{highlightText(s.title, query)}</h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">{highlightText(s.introText, query)}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      {s.type === 'video' ? (
                        <><Video className="w-4 h-4 text-red-500"/> Video</>
                      ) : (
                        <><Book className="w-4 h-4 text-blue-500"/> Written</>
                      )}
                    </span>
                    {s.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4 text-green-600"/>
                        {highlightText(s.author.name, query)}
                      </span>
                    )}
                    {s.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4"/>
                        {s.readTime}
                      </span>
                    )}
                    {s.views && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4"/>
                        {s.views} views
                      </span>
                    )}
                    {s.createdAt && (
                      <span>{new Date(s.createdAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) return null;
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-green-600" />
          Blogs ({blogs.length})
        </h2>
        <div className="grid gap-4">
          {blogs.map((b) => (
            <div key={b._id} onClick={() => navigateToDetail('blog', b)} className="bg-white rounded-lg border p-6 hover:shadow-md cursor-pointer transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{highlightText(b.title, query)}</h3>
              <p className="text-gray-600 line-clamp-2">{highlightText(b.introText, query)}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderAuthors = (authors) => {
    if (!authors || authors.length === 0) return null;
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <User className="w-6 h-6 text-purple-600" />
          Authors ({authors.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((a) => (
            <div key={a._id} onClick={() => navigateToDetail('author', a)} className="bg-white rounded-lg border p-6 hover:shadow-md cursor-pointer transition-shadow">
              <div className="flex items-center gap-4">
                {a.image && (
                  <img src={a.image} alt={a.name} className="w-16 h-16 rounded-full object-cover" />
                )}
                <div>
                  <h3 className="text-xl font-semibold mb-1">{highlightText(a.name, query)}</h3>
                  <p className="text-gray-600 line-clamp-2">{highlightText(a.bio, query)}</p>
                  {a.isVerified && (
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderCategories = (categories) => {
    if (!categories || categories.length === 0) return null;
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Folder className="w-6 h-6 text-orange-600" />
          Categories ({categories.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c._id} onClick={() => navigateToDetail('category', c)} className="bg-white rounded-lg border p-6 hover:shadow-md cursor-pointer transition-shadow">
              {c.image && (
                <img src={c.image} alt={c.name} className="w-full h-32 object-cover rounded-lg mb-3" />
              )}
              <h3 className="text-lg font-semibold mb-2">{highlightText(c.name, query)}</h3>
              <p className="text-gray-600 line-clamp-2">{highlightText(c.description, query)}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderFaqs = (faqs) => {
    if (!faqs || faqs.length === 0) return null;
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-red-600" />
          FAQs ({faqs.length})
        </h2>
        <div className="grid gap-4">
          {faqs.map((f) => (
            <div key={f._id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-green-600"/> 
                {highlightText(f.question, query)}
              </h3>
              <p className="text-gray-600 whitespace-pre-line">{highlightText(f.answer, query)}</p>
              {f.category && (
                <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {f.category}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const totalCount = getTotalCount();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Loader className="w-12 h-12 animate-spin text-[var(--pink-dark)] mb-4" />
        <p className="text-lg">Searching for "{query}"...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold mb-2">Search Results for "{query}"</h1>
          <p className="text-gray-600 mb-4">Found {totalCount} results</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/*  all results without filters */}
        {renderStories(results.stories)}
        {renderBlogs(results.blogs)}
        {renderAuthors(results.authors)}
        {renderCategories(results.categories)}
        {renderFaqs(results.faqs)}

        {/*  message when no results found */}
        {totalCount === 0 && !loading && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No results found for "{query}"</h3>
            <p className="text-gray-500">Try different keywords or browse all content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;