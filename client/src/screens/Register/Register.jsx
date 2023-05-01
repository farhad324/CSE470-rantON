import React, { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { register } from "../../components/Redux/apiCall";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Register = () => {
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [view, setView] = useState(false);
  const handleRegistration = (e) => {
    e.preventDefault();
    register(dispatch, {
      firstname,
      lastname,
      username,
      email,
      password,
      repassword,
    });
  };
  return (
    <div className='mt-9 flex justify-center items-center'>
      <div className='mt-2 bg-stone-50 card card-side w-auto p-9'>
        <figure>
          <img
            src='https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
            alt='cardimg'
          />
        </figure>
        <div className='mt-9 grid grid-cols-6 gap-2 place-items-center place-content-center card-body'>
          <div className='col-span-6'>
            <div className='grid grid-flow-row gap-4 place-content-center place-items-center'>
              <p className='text-slate-950'>rantON | Register</p>
              <input
                type='text'
                placeholder='First Name'
                name='firstname'
                onChange={(e) => setFirstName(e.target.value)}
                className='input input-bordered w-full max-w-xs'
              />
              <input
                type='text'
                placeholder='Last Name'
                name='lastname'
                onChange={(e) => setLastName(e.target.value)}
                className='input input-bordered w-full max-w-xs'
              />
              <input
                type='text'
                placeholder='Username'
                name='username'
                onChange={(e) => setUsername(e.target.value)}
                className='input input-bordered w-full max-w-xs'
              />
              <input
                type='text'
                placeholder='Email'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                className='input input-bordered w-full max-w-xs'
              />
              <div className='relative w-full max-w-xs'>
                <input
                  type={view ? `text` : `password`}
                  placeholder='Password'
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
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
              <input
                type='password'
                placeholder='Confirm Password'
                name='repassword'
                onChange={(e) => setRepassword(e.target.value)}
                className='input input-bordered w-full max-w-xs'
              />
              <div className='card-actions'>
                <button
                  onClick={handleRegistration}
                  className='btn btn-primary text-gray-50'
                >
                  Sign Up
                </button>
              </div>
              <Link to={"/login"}>
                <p className='text-slate-950'>Already have an account?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
