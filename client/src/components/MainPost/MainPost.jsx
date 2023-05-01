import React, { useEffect, useState } from "react";
import "./mainPost.css";
import ContentPost from "../ContentPost/ContentPost";
import Post from "../Post/Post";
import axios from "axios";
import { useSelector } from "react-redux";

const MainPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const userDetails = useSelector((state) => state.user);
  const accessToken = userDetails.user.accessToken;
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/all-post?page=${currentPage}`,
          {
            headers: {
              token: accessToken,
            },
          }
        );

        if (res.data.length === 0) {
          setHasMorePosts(false);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...res.data]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadPosts();
  }, [currentPage, accessToken]);
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <div className='flex flex-col gap-3'>
      <ContentPost />
      {posts.map((item) => (
        <Post post={item} key={item._id} />
      ))}
      {hasMorePosts && (
        <button
          className='rounded-full p-2 w-28 my-4 bg-secondary text-zinc-95'
          onClick={handleLoadMore}
        >
          Load
        </button>
      )}
    </div>
  );
};

export default MainPost;
