const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  createPost: async (req, res) => {
    try {
      const { desc, image, video } = req.body;
      const newPost = new Post({
        desc: desc,
        image: image,
        video: video,
        user: req.user.id,
      });
      await newPost.save();
      res.status(200).json({ msg: "Post Created", newPost });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const mypost = await Post.find({ user: req.params.id });
      if (!mypost) {
        return res.status(200).json({ msg: "You Don't have any Post" });
      }

      res.status(200).json({ mypost });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).json({ msg: "Post does not exist" });
      }

      post = await Post.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      let updatedPost = await post.save();

      res.status(200).json({ updatedPost });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAllPost: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 3;
      const startIndex = (page - 1) * limit;
      const allPost = await Post.find().skip(startIndex).limit(limit);
      res.json(allPost);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.like.includes(req.body.uid)) {
        if (post.dislike.includes(req.body.uid)) {
          await post.updateOne({ $pull: { dislike: req.body.uid } });
        }
        await post.updateOne({ $push: { like: req.body.uid } });
        return res.status(200).json("Post Liked!!!");
      } else {
        await post.updateOne({ $pull: { like: req.body.uid } });
        return res.status(200).json("Post Disliked!!!");
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  dislikePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.dislike.includes(req.body.uid)) {
        console.log(req.user._id);
        if (post.like.includes(req.body.uid)) {
          await post.updateOne({ $pull: { like: req.body.uid } });
        }
        await post.updateOne({ $push: { dislike: req.body.uid } });
        return res.status(200).json("Post disliked!!!");
      } else {
        await post.updateOne({ $pull: { dislike: req.body.uid } });
        return res.status(200).json("Post Disliked!!!");
      }
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  writeComment: async (req, res) => {
    try {
      const { comment, postid, userimage, score } = req.body;
      const comments = {
        user: req.user.id,
        username: req.user.username,
        comment: comment,
        userimage: userimage,
        score: score,
      };
      const post = await Post.findById(postid);
      const creator = await User.findById(post.user);
      const comment_writer = {
        user: req.user.id,
        username: req.user.username,
        userimage: userimage,
        postimg: post.image,
        type: "commented on your post",
      };
      creator.notifications.push(comment_writer);
      post.comments.push(comments);
      await post.save();
      await creator.save();
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};
