import { useState, useEffect } from 'react';
import Community from '../../src/components/common/Community.jsx'
import axios from 'axios';

const AllStories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories");
        
        const categoriesData = response.data.data || response.data || [];
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories');
        setLoading(false);
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div className="text-center py-8">Loading categories...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (categories.length === 0) return <div className="text-center py-8">No categories found</div>;

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-dark)] mb-2">
            All Categories
          </h1>
          <p className="text-md sm:text-base text-[var(--text-gray)] leading-relaxed text-justify">
            Discover the full collection of story categories on Storyious! From timeless classics and magical fairytales to thought-provoking moral tales and spine-chilling
            scary stories, explore a world of storytelling for every mood and reader.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-[1200px] mx-auto sm:px-6 lg:px-8 my-28 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category._id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-lg text-[var(--text-dark)]">{category.name}</h2>
              <p className="text-sm text-[var(--text-muted)] mt-2">{category.description}</p>
              <a 
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block mt-4 text-[var(--primary-color)] hover:underline"
              >
                Explore {category.name}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Community Section */}
      <Community />
    </div>
  );
}

export default AllStories;



