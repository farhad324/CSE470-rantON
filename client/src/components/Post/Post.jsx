import React, { useEffect, useState } from "react";
import "./post.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ForumIcon from "@mui/icons-material/Forum";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ForwardIcon from "@mui/icons-material/Forward";
import axios from "axios";
import Sentiment from "sentiment";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
  const sentiment = new Sentiment();
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;
  const accesstoken = users.accessToken;
  const [heat, setHeat] = useState(
    post.like.includes(users.user._id) ? true : false
  );
  const [sentimentScore, setSentimentScore] = useState(null);
  const [count, setCount] = useState(post.like.length);
  const [comment, setComment] = useState(post.comments);
  const [commentWriting, setCommentWriting] = useState("");
  const [showComment, setShowComment] = useState(false);
  useEffect(() => {
    setSentimentScore(sentiment.analyze(commentWriting));
  }, [commentWriting]);
  console.log(sentimentScore);
  const [user, setUser] = useState([]);
  const addComment = async () => {
    try {
      const fake_comment = {
        postid: `${post._id}`,
        username: `${users.user.username}`,
        userimage: `${users.user.userimage}`,
        comment: `${commentWriting}`,
        score: sentimentScore.score,
      };
      await axios.put(`http://localhost:5000/api/post/comment`, fake_comment, {
        headers: {
          token: accesstoken,
        },
      });
      setComment(comment.concat(fake_comment));
    } catch (err) {
      console.log(err);
    }
  };

  const handelHeat = async () => {
    try {
      if (heat === true) {
        await axios.put(
          `http://localhost:5000/api/like/${post._id}`,
          { uid: users.user._id },
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setHeat(false);
        setCount(count - 1);
      } else {
        await axios.put(
          `http://localhost:5000/api/like/${post._id}`,
          { uid: users.user._id },
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setHeat(true);
        setCount(count + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/user-details/${post.user}`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const shareOnTwitter = () => {
    const text = `${post.desc} | ${post.image}`; // text to be included in the tweet
    const url = "http://localhost:3000/"; // URL to be included in the tweet
    const imageUrl =
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"; // URL of the image to be shared
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&data-url=${encodeURIComponent(imageUrl)}`;

    window.open(tweetUrl);
  };

  const handleComment = () => {
    addComment();
  };

  const handleCommentClick = () => {
    setShowComment(!showComment);
  };
  return (
    <div>
      <div>
        <div className='flex flex-col bg-primary card gap-3 w-auto mt-7 p-5 shadow-xl'>
          <div className='flex flex-row gap-3 items-center justify-center'>
            <div className='avatar'>
              <div className='w-20 rounded-full'>
                <img
                  src={`${user.userimage}`}
                  alt='profileimg'
                  className='w-24 rounded-full'
                />
              </div>
            </div>
            <p className='text-2xl text-slate-900'>{user.username}</p>
          </div>
          <div className='card-body'>
            <div className='card-title mb-3'>
              <p>{post.desc}</p>
            </div>
            <img src={`${post.image}`} alt='userupimg' className='rounded-sm' />
          </div>
          <div>
            <div className='flex flex-row gap-6 justify-center items-center card-actions'>
              <div>
                <span className='flex flex-row gap-3'>
                  <ThumbUpIcon
                    onClick={handelHeat}
                    className={
                      heat === false
                        ? `text-slate-50 hover:text-slate-400`
                        : `text-sky-400 hover:text-sky-300`
                    }
                  />
                  <p className='text-slate-50'>{count} Heats</p>
                </span>
              </div>
              <div>
                <span className='flex flex-row gap-3'>
                  <ForumIcon
                    onClick={handleCommentClick}
                    className='text-slate-50 hover:text-slate-400 '
                  />
                  <p className='text-slate-50'>{comment.length} Comments</p>
                </span>
              </div>
              <div>
                <span className='flex flex-row gap-3'>
                  <ShareIcon
                    onClick={shareOnTwitter}
                    className='text-slate-50 hover:text-slate-400 '
                  />
                  <p className='text-slate-50'>Share</p>
                </span>
              </div>
            </div>
            {showComment === true ? (
              <div>
                <div className='mt-4 flex flex-row gap-3 justify-center items-center'>
                  <img
                    src={`${users.user.userimage}`}
                    alt='profileimg'
                    className='w-14 rounded-full'
                  />
                  <p className='text-slate-50'>{users.user.username}</p>
                  <input
                    type='text'
                    className='input input-bordered w-full max-w-xs'
                    placeholder='Write Comment...'
                    onChange={(e) => {
                      setCommentWriting(e.target.value);
                    }}
                  />
                  <ForwardIcon onClick={handleComment} />
                </div>
                {comment.map((items) => (
                  <div className='flex flex-row items-center gap-3 mt-3'>
                    <img
                      src={`${items.userimage}`}
                      alt='profileimg'
                      className='profile-img'
                    />
                    <p className='comment-username text-slate-50'>
                      {items.username}
                    </p>
                    <p className='user-comments text-slate-50'>
                      {items.comment}
                    </p>
                    <img
                      src={
                        items.score === 0
                          ? "https://png.pngtree.com/png-clipart/20210704/original/pngtree-bored-emoji-png-image_6478621.jpg"
                          : items.score > 0
                          ? "https://em-content.zobj.net/source/noto-emoji-animations/344/face-with-tears-of-joy_1f602.gif"
                          : "https://w7.pngwing.com/pngs/856/942/png-transparent-emoji-iphone-emoticon-profanity-emoji-smiley-social-media-apple-color-emoji-thumbnail.png"
                      }
                      alt='reaction'
                      className='w-14 rounded-md'
                    />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
