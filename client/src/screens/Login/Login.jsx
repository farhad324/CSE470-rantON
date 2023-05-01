import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../components/Redux/apiCall";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <div className='mt-9 flex justify-center items-center'>
      <div className='mt-9 bg-stone-50 card card-side w-auto'>
        <figure>
          <img
            src='https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            alt='cardimg'
          />
        </figure>
        <div className='mt-9 grid grid-cols-6 gap-2 place-items-center place-content-center card-body'>
          <div className='col-span-6'>
            <div className='grid grid-flow-row gap-4 place-content-center place-items-center'>
              <p className='text-slate-950'>rantON | Login</p>
              <input
                type='text'
                placeholder='Email'
                name='email'
                id='email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className='input input-bordered w-full max-w-xs'
              />
              <div className='relative w-full max-w-xs'>
                <input
                  type={view ? `text` : `password`}
                  placeholder='Password'
                  name='password'
                  id='password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className='input input-bordered w-full max-w-xs'
                />
                <VisibilityIcon
                  onClick={(e) => setView(!view)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  className='text-stone-50'
                />
              </div>
              <div className='card-actions'>
                <button
                  onClick={handleLogin}
                  className='btn btn-primary text-gray-50'
                >
                  Log In
                </button>
              </div>
              <Link to={"/register"}>
                <p className='text-slate-950'>Don't have an account?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
