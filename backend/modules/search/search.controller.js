import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Story from "../story/story.model.js";
import Blog from "../blogs/blog.model.js";
import Author from "../author/author.model.js";
import Category from "../category/category.model.js";
import FAQ from "../faqs/faq.model.js";

export const globalSearch = asyncHandler(async (req, res) => {
  const { q: searchTerm, type } = req.query;

  if (!searchTerm) {
    return res.status(400).json(new ApiResponse(400, null, "Search term is required"));
  }

  const searchRegex = new RegExp(searchTerm, "i");

  try {
    let results = {};

    const isAuthorSearch = searchTerm.toLowerCase().includes('author') || searchTerm.toLowerCase().includes('authors');
    const isCategorySearch = searchTerm.toLowerCase().includes('category') || searchTerm.toLowerCase().includes('categories');
    const isFaqSearch = searchTerm.toLowerCase().includes('faq') || searchTerm.toLowerCase().includes('faqs');

    switch (type) {
      case "stories":
      case undefined:
      case "all": {
        const stories = await Story.find({
          status: "active",
          $or: [
            { title: searchRegex },
            { introText: searchRegex },
            { content: searchRegex },
          ],
        })
        .populate("author", "name shortBio image slug")
        .populate("categories", "name")
        .exec();

        results.stories = stories.map(story => ({
          _id: story._id,
          type: story.type || "written",
          title: story.title,
          introText: story.introText,
          featuredImage: story.featuredImage,
          author: story.author
            ? {
                _id: story.author._id,
                name: story.author.name,
                bio: story.author.shortBio,
                image: story.author.image,
                slug: story.author.slug,
              }
            : null,
          categories: story.categories?.map(c => ({ _id: c._id, name: c.name })),
          readTime: story.meta?.readTime,
          views: story.meta?.views,
          createdAt: story.createdAt,
        }));

        const blogs = await Blog.find({
          status: "active",
          $or: [
            { title: searchRegex },
            { introText: searchRegex },
            { "cards.title": searchRegex },
            { "cards.description": searchRegex },
          ],
        }).exec();

        results.blogs = blogs.map(blog => ({
          _id: blog._id,
          type: "blog",
          title: blog.title,
          introText: blog.introText,
          cardsCount: blog.cards?.length,
          createdAt: blog.createdAt,
        }));

        if (isAuthorSearch) {
          const authors = await Author.find({}).exec();
          results.authors = authors.map(author => ({
            _id: author._id,
            name: author.name,
            bio: author.shortBio || author.bio,
            image: author.image,
            slug: author.slug,
            isVerified: author.isVerified,
            createdAt: author.createdAt,
          }));
        } else {
          const authors = await Author.find({
            $or: [
              { name: searchRegex },
              { shortBio: searchRegex },
              { bio: searchRegex },
            ],
          }).exec();
          results.authors = authors.map(author => ({
            _id: author._id,
            name: author.name,
            bio: author.shortBio || author.bio,
            image: author.image,
            slug: author.slug,
            isVerified: author.isVerified,
            createdAt: author.createdAt,
          }));
        }

        if (isCategorySearch) {
          const categories = await Category.find({}).exec();
          results.categories = categories.map(category => ({
            _id: category._id,
            name: category.name,
            description: category.description,
            image: category.image,
            createdAt: category.createdAt,
          }));
        } else {
          const categories = await Category.find({
            $or: [
              { name: searchRegex },
              { description: searchRegex },
            ],
          }).exec();
          results.categories = categories.map(category => ({
            _id: category._id,
            name: category.name,
            description: category.description,
            image: category.image,
            createdAt: category.createdAt,
          }));
        }

        if (isFaqSearch) {
          const faqs = await FAQ.find({}).exec();
          results.faqs = faqs.map(faq => ({
            _id: faq._id,
            question: faq.question,
            answer: faq.answer, 
            category: faq.category,
            slug: faq.slug,
            createdAt: faq.createdAt,
          }));
        } else {
          const faqs = await FAQ.find({
            $or: [
              { question: searchRegex },
              { answer: searchRegex },
              { category: searchRegex },
            ],
          }).exec();

          results.faqs = faqs.map(faq => ({
            _id: faq._id,
            question: faq.question,
            answer: faq.answer, 
            category: faq.category,
            slug: faq.slug,
            createdAt: faq.createdAt,
          }));
        }

        break;
      }

      case "blogs": {
        const blogs = await Blog.find({
          $or: [
            { title: searchRegex },
            { introText: searchRegex },
            { "cards.title": searchRegex },
            { "cards.description": searchRegex },
          ],
        }).exec();

        results.blogs = blogs.map(blog => ({
          _id: blog._id,
          type: "blog",
          title: blog.title,
          introText: blog.introText,
          cardsCount: blog.cards?.length,
          createdAt: blog.createdAt,
        }));
        break;
      }

      case "authors": {
        const authors = await Author.find({}).exec();
        results.authors = authors.map(author => ({
          _id: author._id,
          name: author.name,
          bio: author.shortBio || author.bio,
          image: author.image,
          slug: author.slug,
          isVerified: author.isVerified,
          createdAt: author.createdAt,
        }));
        break;
      }

      case "categories": {
        const categories = await Category.find({}).exec();
        results.categories = categories.map(category => ({
          _id: category._id,
          name: category.name,
          description: category.description,
          image: category.image,
          createdAt: category.createdAt,
        }));
        break;
      }

      case "faqs": {
        const faqs = await FAQ.find({}).exec();
        results.faqs = faqs.map(faq => ({
          _id: faq._id,
          question: faq.question,
          answer: faq.answer, 
          category: faq.category,
          slug: faq.slug,
          createdAt: faq.createdAt,
        }));
        break;
      }

      default:
        break;
    }

    const counts = {
      stories: results.stories?.length || 0,
      blogs: results.blogs?.length || 0,
      authors: results.authors?.length || 0,
      categories: results.categories?.length || 0,
      faqs: results.faqs?.length || 0,
      total: Object.values(results).reduce((sum, arr) => sum + (arr?.length || 0), 0),
    };

    res.status(200).json(
      new ApiResponse(200, { searchTerm, results, searchType: type || "global", counts }, "Search completed successfully")
    );

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json(new ApiResponse(500, null, "Search failed. Please try again."));
  }
});