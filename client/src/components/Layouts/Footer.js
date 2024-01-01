import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="flex flex-col items-center m-4 bg-[#0a090a] p-10 md:pt-20 md:pb-20 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-5 font_styling">Stay Updated</h2>
      <p className="mb-5 text-center text-gray-400 font_styling">
        Subscribe to our newsletter and get all the updates on our latest products.
      </p>
      <div className="w-full max-w-sm flex items-center rounded-lg overflow-hidden">
        <input
          className="flex mx-2 h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-gray-800 text-white font_styling"
          placeholder="Enter your email"
          type="email"
        />
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium  h-10 px-4 py-2 bg-[#e13453] hover:bg-[#ae233c] text-white font_styling">
          Subscribe
        </button>
      </div>
      <nav className="flex flex-wrap justify-center items-center gap-8 mt-10">
        <a className='text-white' href='https://www.facebook.com/profile.php?id=100075958819062' target='_blank'>
          <FacebookIcon className="w-6 h-6 hover:stroke-[#3391ff]" />
        </a>
        <a className='text-white' href='https://www.twitter.com/rishabhguptajs' target='_blank'>
          <TwitterIcon className="w-6 h-6 hover:stroke-blue-400" />
        </a>
        <a className='text-white' href='https://www.instagram.com/rishabhgupta.js' target='_blank'>
          <InstagramIcon className="w-6 h-6 hover:stroke-pink-500" />
        </a>
        <a className='text-white' href='https://www.linkedin.com/in/rishabhguptajs/' target='_blank'>
          <LinkedinIcon className="w-6 h-6 hover:stroke-blue-700" />  
        </a>
      </nav>
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center w-full max-w-3xl">
        <div className="mb-5 md:mb-0 space-y-4">
          <h2 className="text-lg font-bold text-white font_styling">Quick Links</h2>
          <Link className="block text-gray-400 hover:text-[#e13453] transition-colors font_styling" to="/about">
            About Us
          </Link>
          <Link className="block text-gray-400 hover:text-[#e13453] transition-colors font_styling" to="/contact">
            Contact Us
          </Link>
          <Link className="block text-gray-400 hover:text-[#e13453] transition-colors font_styling" to="/policy">
            Privacy Policy
          </Link>
          <Link className="block text-gray-400 hover:text-[#e13453] transition-colors font_styling" href="#">
            Terms &amp; Conditions
          </Link>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white font_styling">Our Products</h2>
          <Link className="block text-gray-400 hover:text-[#e13453] transition-colors font_styling" href="#">
            Fashion
          </Link>
          <Link className="block text-gray-400 hover:text-[#e13453] transition-colors font_styling" href="#">
            Electronics
          </Link>
          <Link className="block text-gray-400 hover:text-[#e13453] transition-colors font_styling" href="#">
            Furniture
          </Link>
          <Link className="block text-gray-400 hover:text-[#e13453] transition-colors font_styling" href="#">
            Beauty &amp; Health
          </Link>
        </div>
      </div>
      <p className="mt-10 text-[#7e7e7e] text-sm text-center font_styling">© Oddyssey. All rights reserved.</p>
    </div>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}


export default Footer
