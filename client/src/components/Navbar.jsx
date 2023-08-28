import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { KEY_ACCESS_TOKEN, getItem, removeItem } from '../utils/localStorageManager'
import { axiosClient } from '../utils/axiosClient';
const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();
  const user = getItem(KEY_ACCESS_TOKEN);

  async function handleLogout() {
    try {
      await axiosClient.post('/auth/logout');
      removeItem(KEY_ACCESS_TOKEN);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  }
  const params = useParams();
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white mt-4'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a] cursor-pointer'
        onClick={() => { navigate('/home') }}
      >ITwox</h1>
      <ul className='hidden md:flex'>
        <li className='p-4 cursor-pointer' onClick={() => { navigate('/home') }}>Home</li>
        <li className='p-4 cursor-pointer' onClick={() => { navigate('/dashboard') }}>DashBoard</li>
        {!params.postId && <li className='p-4 cursor-pointer'><a href="#contact">Contact</a></li>}

        {!user ? <>  <li
          onClick={() => { navigate('/login') }}
          className='p-4 cursor-pointer'>Login</li>
          <li
            onClick={() => { navigate('/signup') }}
            className='p-4 cursor-pointer'>Signup</li></> : <>
          <li
            onClick={() => { handleLogout() }}
            className='p-4 cursor-pointer'>Logout</li>
        </>}


      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4' onClick={() => { navigate('/home') }}>ITwox</h1>

          {!user ? <>
            <li className='p-4 border-b border-gray-600 cursor-pointer'>Login</li>
        <li className='p-4 border-b border-gray-600 cursor-pointer'>Signup</li>
          </> :<>
          <li
            onClick={() => { handleLogout() }}
            className='p-4 border-b border-gray-600 cursor-pointer'>Logout</li>
        </>}  

        <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => { navigate('/home') }}>Home</li>
        <li className='p-4 border-b border-gray-600 cursor-pointer' onClick={() => { navigate('/dashboard') }}>Dashboard</li>
        <li className='p-4 border-b border-gray-600 cursor-pointer'><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
};

export default Navbar;
