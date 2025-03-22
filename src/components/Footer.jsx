import React from 'react'
import logo from '../assets/logo.jpeg'
const Footer = () => {
  return (
    <div>
     <footer className="text-white py-6">
      <div className="container mx-auto flex justify-between">
        <div className="grid grid-cols-5 gap-4">
        <div>
          <img src={logo} alt="Bytestore Logo" className="w-35" /> 
        </div>
          <div>
            <h5 className="font-bold mb-2">Solutions</h5>
            <ul className="text-sm">
              <li>Marketing</li>
              <li>Analytics</li>
              <li>Automation</li>
              <li>Commerce</li>
              <li>Insights</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Support</h5>
            <ul className="text-sm">
              <li>Submit ticket</li>
              <li>Documentation</li>
              <li>Guides</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Company</h5>
            <ul className="text-sm">
              <li>About</li>
              <li>Blog</li>
              <li>Jobs</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Legal</h5>
            <ul className="text-sm">
              <li>Terms of service</li>
              <li>Privacy policy</li>
              <li>License</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>&copy; 2025 ByteStore, Inc. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              {/* Facebook icon */}
            </svg>
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              {/* Twitter icon */}
            </svg>
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              {/* LinkedIn icon */}
            </svg>
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              {/* Instagram icon */}
            </svg>
          </a>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
