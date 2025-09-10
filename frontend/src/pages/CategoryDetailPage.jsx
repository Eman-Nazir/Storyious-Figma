import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from "../components/common/Cards/Card";
import ReadMore from "../components/common/ReadMore";
import Community from '../components/common/Community';

const CategoryDetailedPage = () => {
  const { categoryName } = useParams();
  const [stories, setStories] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoriesResponse = await axios.get("http://localhost:8000/api/categories");
        const categories = categoriesResponse.data.data || categoriesResponse.data || [];
        
        const formattedCategoryName = categoryName.replace(/-/g, ' ').toLowerCase();
        const currentCategory = categories.find(cat => 
          cat.name.toLowerCase() === formattedCategoryName
        );
        
        if (currentCategory) {
          setCategory(currentCategory);
          
          const storiesResponse = await axios.get(`http://localhost:8000/api/stories?category=${currentCategory._id}&populate=category,author`);
          const allStories = storiesResponse.data.data || storiesResponse.data || [];
          setStories(allStories);
        } else {
          setError('Category not found');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch category data');
        setLoading(false);
        console.error("Error fetching category data:", err);
      }
    };

    fetchCategoryData();
  }, [categoryName]);

  const firstThreeStories = stories.slice(0, 3);
  const nextThreeStories = stories.slice(3, 6);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!category) return <div className="text-center py-8">Category not found</div>;

  return (
    <div className="bg-[var(--bg-section)] text-[var(--text-dark)]">
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14 px-4 sm:px-6 md:px-8 lg:px-[140px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-dark)]">{category.name}</h1>
        <div className="md:flex-row items-start lg:items-center">
          <p className="text-md sm:text-base text-[var(--text-dark)] leading-relaxed text-justify">
            {category.description}
          </p>
        </div>
      </div>

      <div className="my-10 px-4 sm:px-6 md:px-12 lg:px-[140px] text-justify max-w-screen-xl">
        <p className="text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          Welcome to <strong>Storyious {category.name}</strong>, where {category.description.toLowerCase()}
        </p>
        <p className="mt-4 text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          At Storyious, we believe that stories have the power to inspire, teach, and entertain. Our collection of {category.name.toLowerCase()} 
          offers something for every reader, with tales that will capture your imagination and stay with you long after you've finished reading.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto sm:px-6 lg:px-8 my-28 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {firstThreeStories.map((story) => (
          <Card key={story._id} story={story} />
        ))}
      </div>

      <ReadMore />

      <div className="max-w-[1200px] mx-auto sm:px-6 lg:px-8 my-28 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {nextThreeStories.map((story) => (
          <Card key={story._id} story={story} />
        ))}
      </div>

      <Community />

      {/* FAQ Section */}
    
    </div>
  );
};

export default CategoryDetailedPage;