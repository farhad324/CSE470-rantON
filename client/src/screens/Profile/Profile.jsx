import React from 'react';
import './profile.css';
import Navbar from '../../components/Navbar/Navbar';
import ProfileLeftSide from '../../components/ProfileLeftSide/ProfileLeftSide';
import ProfileMainPost from '../../components/ProfileMainPost/ProfileMainPost';
import ProfileRightSide from '../../components/ProfileRightSide/ProfileRightSide';

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className='grid grid-cols-12 gap-4 bg-slate-50'>
        <div className='col-span-4'>
          <ProfileLeftSide />
        </div>
        <div className='col-span-5'>
          <ProfileMainPost />
        </div>
        <div className='col-span-3'>
          <ProfileRightSide />
        </div>
      </div>
    </div>
  );
};

export default Profile;
