import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Search,
  Loader,
  Book,
  FileText,
  User,
  Folder,
  Clock,
  Eye,
  Video,
  HelpCircle,
} from "lucide-react";

const API_BASE_URL =
  `${import.meta.env.VITE_API_URL}/api`;

const MAX_SEARCH_LENGTH = 100;

const escapeRegex = (value) =>
  value.replace(/[.*+?^$(){}|[\]\\]/g, "\\$&");

const highlightText = (text, term) => {
  if (typeof text !== "string") return "";
  if (!term) return text;

  const regex = new RegExp(
    "(" + escapeRegex(term) + ")",
    "gi"
  );

  return text.split(regex).map((part, index) =>
    index % 2 === 1 ? (
      <mark
        key={index}
        className="bg-yellow-200 px-1 rounded"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const SearchResults = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(
    location.search
  );

  const query = (
    searchParams.get("q") || ""
  ).trim();

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setResults({});
    setError("");

    if (!query) {
      setError("Please enter a search term.");
      setLoading(false);

      return () => controller.abort();
    }

    if (/[\u0000-\u001f\u007f]/.test(query)) {
      setError(
        "Search term must not contain control characters."
      );
      setLoading(false);

      return () => controller.abort();
    }

    if (query.length > MAX_SEARCH_LENGTH) {
      setError(
        "Search term must be 100 characters or fewer."
      );
      setLoading(false);

      return () => controller.abort();
    }

    setLoading(true);

    const performSearch = async () => {
      try {
        const params = new URLSearchParams({
          q: query,
        });

        const response = await fetch(
          API_BASE_URL +
            "/search?" +
            params.toString(),
          {
            signal: controller.signal,
          }
        );

        const data = await response
          .json()
          .catch(() => null);

        if (
          !response.ok ||
          !data ||
          data.success === false
        ) {
          throw new Error(
            data?.message ||
              "Search failed. Please try again."
          );
        }

        if (active) {
          setResults(data.data?.results || {});
        }
      } catch (err) {
        if (
          active &&
          err.name !== "AbortError"
        ) {
          setError(
            err.message ||
              "Failed to search. Please try again."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    performSearch();

    return () => {
      active = false;
      controller.abort();
    };
  }, [query]);

  const navigateToDetail = (path, item) => {
    const state = {
      item,
      fromSearch: true,
      searchQuery: query,
    };

    if (path === "author") {
      navigate(`/writers/${item.slug}`, {
        state,
      });
    } else if (path === "category") {
      const categoryName = encodeURIComponent(
        item.name
          .toLowerCase()
          .replace(/\s+/g, "-")
      );

      navigate(`/category/${categoryName}`, {
        state,
      });
    } else {
      navigate(`/${path}/${item._id}`, {
        state,
      });
    }
  };

  const getTotalCount = () =>
    Object.values(results).reduce(
      (total, items) =>
        total + (items?.length || 0),
      0
    );

  const renderStories = (stories) => {
    if (!stories || stories.length === 0) {
      return null;
    }

    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Book className="w-6 h-6 text-blue-600" />
          Stories ({stories.length})
        </h2>

        <div className="grid gap-4">
          {stories.map((story) => (
            <div
              key={story._id}
              onClick={() =>
                navigateToDetail("story", story)
              }
              className="bg-white rounded-lg border p-6 hover:shadow-md cursor-pointer transition-shadow"
            >
              <div className="flex items-start gap-4">
                {story.featuredImage && (
                  <img
                    src={story.featuredImage}
                    alt={story.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}

                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {highlightText(
                      story.title,
                      query
                    )}
                  </h3>

                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {highlightText(
                      story.introText,
                      query
                    )}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      {story.type === "video" ? (
                        <>
                          <Video className="w-4 h-4 text-red-500" />
                          Video
                        </>
                      ) : (
                        <>
                          <Book className="w-4 h-4 text-blue-500" />
                          Written
                        </>
                      )}
                    </span>

                    {story.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4 text-green-600" />
                        {highlightText(
                          story.author.name,
                          query
                        )}
                      </span>
                    )}

                    {story.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {story.readTime}
                      </span>
                    )}

                    {story.views && (
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {story.views} views
                      </span>
                    )}

                    {story.createdAt && (
                      <span>
                        {new Date(
                          story.createdAt
                        ).toLocaleDateString()}
                      </span>
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
    if (!blogs || blogs.length === 0) {
      return null;
    }

    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-green-600" />
          Blogs ({blogs.length})
        </h2>

        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() =>
                navigateToDetail("blog", blog)
              }
              className="bg-white rounded-lg border p-6 hover:shadow-md cursor-pointer transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                {highlightText(
                  blog.title,
                  query
                )}
              </h3>

              <p className="text-gray-600 line-clamp-2">
                {highlightText(
                  blog.introText,
                  query
                )}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderAuthors = (authors) => {
    if (!authors || authors.length === 0) {
      return null;
    }

    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <User className="w-6 h-6 text-purple-600" />
          Authors ({authors.length})
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <div
              key={author._id}
              onClick={() =>
                navigateToDetail("author", author)
              }
              className="bg-white rounded-lg border p-6 hover:shadow-md cursor-pointer transition-shadow"
            >
              <div className="flex items-center gap-4">
                {author.image && (
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}

                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {highlightText(
                      author.name,
                      query
                    )}
                  </h3>

                  <p className="text-gray-600 line-clamp-2">
                    {highlightText(
                      author.bio,
                      query
                    )}
                  </p>

                  {author.isVerified && (
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
    if (
      !categories ||
      categories.length === 0
    ) {
      return null;
    }

    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Folder className="w-6 h-6 text-orange-600" />
          Categories ({categories.length})
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() =>
                navigateToDetail(
                  "category",
                  category
                )
              }
              className="bg-white rounded-lg border p-6 hover:shadow-md cursor-pointer transition-shadow"
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}

              <h3 className="text-lg font-semibold mb-2">
                {highlightText(
                  category.name,
                  query
                )}
              </h3>

              <p className="text-gray-600 line-clamp-2">
                {highlightText(
                  category.description,
                  query
                )}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderFaqs = (faqs) => {
    if (!faqs || faqs.length === 0) {
      return null;
    }

    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-red-600" />
          FAQs ({faqs.length})
        </h2>

        <div className="grid gap-4">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-green-600" />

                {highlightText(
                  faq.question,
                  query
                )}
              </h3>

              <p className="text-gray-600 whitespace-pre-line">
                {highlightText(
                  faq.answer,
                  query
                )}
              </p>

              {faq.category && (
                <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {faq.category}
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

        <p className="text-lg">
          Searching for &quot;{query}&quot;...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold mb-2">
            {query ? (
              <>
                Search Results for &quot;{query}&quot;
              </>
            ) : (
              "Search Results"
            )}
          </h1>

          <p className="text-gray-600 mb-4">
            Found {totalCount} results
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
          >
            {error}
          </div>
        )}

        {renderStories(results.stories)}
        {renderBlogs(results.blogs)}
        {renderAuthors(results.authors)}
        {renderCategories(results.categories)}
        {renderFaqs(results.faqs)}

        {totalCount === 0 &&
          !loading &&
          !error && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />

              <h3 className="text-xl font-semibold text-gray-600">
                No results found for &quot;{query}&quot;
              </h3>

              <p className="text-gray-500">
                Try different keywords or browse all content
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchResults;