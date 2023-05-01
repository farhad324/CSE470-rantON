import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import "./navbar.css";
import ClearIcon from "@mui/icons-material/Clear";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { logout } from "../Redux/userReducer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const { username } = user.user;
  const dispatch = useDispatch();
  const [clear, setClear] = useState(true);
  const logoutHandler = (e) => {
    dispatch(logout());
  };
  const [cUser, setCUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/get/user-details/${user.user._id}`,
          {
            headers: { token: user.accessToken },
          }
        );
        setCUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);
  const handleSearch = async () => {
    setSearching(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/search/users?q=${searchQuery}`,
        {
          headers: { token: user.accessToken },
        }
      );
      setClear(false);
      setSearchResults(res.data);
      setSearching(false);
    } catch (err) {
      console.log(err);
      setSearching(false);
    }
  };

  const handleSearchClear = () => {
    setClear(true);
    setSearchResults([]);
  };

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <Link to={`/`}>
          <h3 className='btn btn-ghost normal-case text-xl'>rantON</h3>
        </Link>
      </div>
      <div className='flex flex-row gap-5 justify-center items-center'>
        <div className='relative w-full max-w-xs'>
          <input
            type='text'
            placeholder='Search profile...'
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className='input input-bordered w-full max-w-xs'
          />
          {clear === true ? (
            <SearchIcon
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={handleSearch}
            />
          ) : (
            <ClearIcon
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={handleSearchClear}
            />
          )}
        </div>
        {searching && <p>Searching...</p>}
        {searchResults.length > 0 && (
          <div className='dropdown flex flex-col gap-3 dropdown-end p-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 absolute top-20 z-10'>
            {searchResults.map((result) => (
              <Link to={`/profile/${result._id}`}>
                <div className='flex flex-row gap-5 btn-ghost btn-circle avatar items-center'>
                  <img
                    src={`${result.userimage}`}
                    alt='profileimage'
                    className='w-12 rounded-full'
                  />
                  <p>{result.username}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img src={`${cUser.userimage}`} alt='loggedinprofileimage' />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <Link to={`/profile/${user.user._id}`}>
                <span className='flex flex-row gap-3 justify-center items-center'>
                  <PersonIcon /> <p>{user.user.username}</p>
                </span>
              </Link>
            </li>
            <li>
              <Link to={`/chat`}>
                <span className='flex flex-row gap-3 justify-center items-center'>
                  <ChatIcon /> Chat
                </span>
              </Link>
            </li>
            <li>
              <span
                className='flex flex-row gap-3 justify-center items-center'
                onClick={logoutHandler}
              >
                <PowerSettingsNewIcon /> Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className='dropdown dropdown-end'>
        <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
          <div className='w-10 rounded-full'>
            <img src={`${cUser.userimage}`} alt='loggedinprofileimage' />
          </div>
        </label>
        <ul
          tabIndex={0}
          className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
        >
          <li>
            <Link to={`/profile/${user.user._id}`}>
              <span className='flex flex-row gap-3 justify-center items-center'>
                <PersonIcon /> <p>{user.user.username}</p>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/chat`}>
              <span className='flex flex-row gap-3 justify-center items-center'>
                <ChatIcon /> Chat
              </span>
            </Link>
          </li>
          <li>
            <span
              className='flex flex-row gap-3 justify-center items-center'
              onClick={logoutHandler}
            >
              <PowerSettingsNewIcon /> Logout
            </span>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Navbar;
