const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/Users");
const validateToken = require("../middleware/verifyToken");
const imageUpload = require("../middleware/uploadimg");
const paginatedResults = require("../middleware/pagination");

router.post(
  "/create",
  validateToken,
  imageUpload.single("image"),
  async (req, res) => {
    console.log(req.body);
    const newPost = new Post({
      caption: req.body.caption,
      img: req.file.path,
      userId: req.body.userId,
    });
    try {
      const savedPost = await newPost.save();
      res.status(200).json({
        post: savedPost,
        message: "Post created successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
//update a post

router.put("/update/:id", validateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/delete/:id", validateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/like", validateToken , async (req, res) => {
  try {
   
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      const post1 = await Post.findById(req.params.id);

      res
        .status(200)
        .json({
          message: "The post has been liked ",
          likes: post1.likes.length,
        });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      const post1 = await Post.findById(req.params.id);

      res
        .status(200)
        .json({
          message: "The post has been disliked",
          likes: post1.likes.length,
        });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//comment on post
router.put("/:id/comment", validateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    await post.updateOne({
      $push: {
        comments: {
          user: user.firstname + " " + user.lastname,
          comment: req.body.comment,
          userId: req.body.userId,
        },
      },
    });
    res.status(200).json({
      post: post,
      message: "Commented successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", validateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", validateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts

router.get("/", validateToken, paginatedResults(Post), async (req, res) => {
  const data = res.paginatedResults;

  try {
    const posts = await Post.find();

    res.status(200).json({
      posts: data,
      message: "fetched all posts successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts

router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const posts = await Post.find({ userId: req.params.id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
