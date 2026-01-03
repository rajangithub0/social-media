const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI )
  .then(() => console.log("MongoDB connected"))
  .catch(console.error);

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("<h1>video data</h1>");
});

// CREATE POST
app.post("/api/posts", upload.single("image"), async (req, res) => {
  try {
    const post = await Post.create({
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
      caption: req.body.caption,
      comments: [],
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET POSTS
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// ADD COMMENT
app.post("/api/posts/:id/comments", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.comments.push(req.body.text);
  await post.save();

  res.json(post);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
