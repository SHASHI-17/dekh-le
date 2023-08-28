import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className='max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-300' id='contact'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] cursor-pointer'
          // onClick={() => {
          //   navigate('/home');
          // }}
        >ITwox</h1>
        <p className='py-4'>Developing and implementing data analyses, data collection systems and other strategies that optimize statistical efficiency and quality.</p>
        <div className='flex justify-center md:justify-start my-6'>
          <FaFacebookSquare size={30} className='mx-2' />
          <FaInstagram size={30} className='mx-2' />
          <FaTwitterSquare size={30} className='mx-2' />
          <FaGithubSquare size={30} className='mx-2' />
          <FaDribbbleSquare size={30} className='mx-2' />
        </div>
      </div>
      <div className='md:col-span-2 lg:col-span-3'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div>
            <h6 className='font-medium text-gray-400'>Solutions</h6>
            <ul>
              <li className='py-2 text-sm'>Analytics</li>
              <li className='py-2 text-sm'>Marketing</li>
              <li className='py-2 text-sm'>Commerce</li>
              <li className='py-2 text-sm'>Insights</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-gray-400'>Support</h6>
            <ul>
              <li className='py-2 text-sm'>Pricing</li>
              <li className='py-2 text-sm'>Documentation</li>
              <li className='py-2 text-sm'>Guides</li>
              <li className='py-2 text-sm'>API Status</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-gray-400'>Company</h6>
            <ul>
              <li className='py-2 text-sm'>About</li>
              <li className='py-2 text-sm'>Blog</li>
              <li className='py-2 text-sm'>Jobs</li>
              <li className='py-2 text-sm'>Press</li>
              <li className='py-2 text-sm'>Careers</li>
            </ul>
          </div>
          <div>
            <h6 className='font-medium text-gray-400'>Legal</h6>
            <ul>
              <li className='py-2 text-sm'>Claim</li>
              <li className='py-2 text-sm'>Policy</li>
              <li className='py-2 text-sm'>Terms</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
