import Blog from "../blogs/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    let cards = [];
    if (req.body.cards) {
      try {
        cards = JSON.parse(req.body.cards);
      } catch (err) {
        return res.status(400).json({ success: false, message: "Invalid cards JSON" });
      }
    }

    if (req.files) {
      Object.keys(req.files).forEach((fieldName, index) => {
        if (cards[index]) {
          cards[index].image = req.files[fieldName][0].filename;
        }
      });
    }

    const blog = new Blog({ cards });
    await blog.save();

    res.status(201).json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create blog", error: error.message });
  }
};




export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch blogs", error: error.message });
  }
};