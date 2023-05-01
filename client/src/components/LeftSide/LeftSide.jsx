import React, { useEffect, useState } from "react";
import "./leftSide.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import LandscapeIcon from "@mui/icons-material/Landscape";

const LeftSide = () => {
  const navigate = useNavigate();
  let location = useLocation();
  let uid = location.pathname.split("/")[2];
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user;

  const [user, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/user-details/${users.user._id}`
        );
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);

  let followersCounter = user?.followers?.length;
  let followingCounter = user?.following?.length;

  const handleClick = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/get/user-details/${uid}`
    );
    setuser(res.data);
    window.location.reload(); // Reloads the current page
  };

  const handleEditProfile = (uid) => {
    if (location.search || location.hash) {
      navigate(location.pathname, { replace: true });
    }
    navigate(`/update/profile/${uid}`);
  };

  const changeProPicHandler = (e) => {
    e.preventDefault();
    navigate(`/update/profile/pic/${users.user._id}`);
  };

  const changeCoverPicHandler = (e) => {
    e.preventDefault();
    navigate(`/update/cover/pic/${users.user._id}`);
  };
  console.log(user);
  return (
    <div className='flex flex-col gap-2'>
      <div className='mt-3 ml-7 flex flex-col gap-3 card bg-primary justify-center items-center p-3'>
        <div>
          <img
            src={`${user.coverimage}`}
            alt='profcover'
            className='profile-page-cover'
          />

          <div
            style={{ display: "flex", alignItems: "center", marginTop: -40 }}
          >
            <img
              src={`${user.userimage}`}
              alt='profimage'
              className='profile-page-image'
            />
          </div>
        </div>
        <div className='flex flex-row justify-center items-center'>
          <FaceIcon style={{ color: "white" }} onClick={changeProPicHandler} />
          <LandscapeIcon
            style={{ color: "white" }}
            onClick={changeCoverPicHandler}
          />
        </div>
        <div>
          <p className='text-2xl mt-5 text-slate-50'>
            {user.firstname} {user.lastname}
          </p>
        </div>
        <div className='flex flex-row gap-2 justify-start items-center'>
          <h3 className='text-logo-text-green flex flex-row gap-2 justify-center items-center'>
            <span className='text-slate-50'>Bio</span>
          </h3>
          <p className='text-slate-50'>{user.bio}</p>
        </div>
        <div className='flex flex-row gap-3'>
          <div>
            <h3>
              <span className='text-slate-50'>Followers:</span>{" "}
              {followersCounter}
            </h3>
          </div>
          <div>
            <h3>
              <span className='text-slate-50'>Following:</span>{" "}
              {followingCounter}
            </h3>
          </div>
        </div>

        <div className='flex flex-row gap-2 justify-start items-center'>
          <h3 className='text-logo-text-green flex flex-row gap-2 justify-center items-center'>
            <span className='text-slate-50'>Address</span>
          </h3>
          <p className='text-slate-50'>{user.address}</p>
        </div>

        <div className='flex flex-row gap-2 justify-start items-center'>
          <h3 className='text-logo-text-green flex flex-row gap-2 justify-center items-center'>
            <span className='text-slate-50'>Email</span>
          </h3>
          <p className='text-slate-50'>{user.email}</p>
        </div>
        <div className='flex flex-row gap-2 justify-start items-center'>
          <h3 className='text-logo-text-green flex flex-row gap-2 justify-center items-center'>
            <span className='text-slate-50'>Mobile</span>
          </h3>
          <p className='text-slate-50'>{user.mobile}</p>
        </div>

        <button
          className='rounded-full p-2 w-24 my-4 bg-secondary text-zinc-95'
          onClick={() => handleEditProfile(user._id)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
