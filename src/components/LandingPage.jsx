import React from "react";
import "../css/LandingPage.css";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import { useState } from "react";
import AuthPage from "./AuthPage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LandingPage = () => {

  const [isOpen, setIsOpen] = useState(false);
  const navigation = [
    { name: "Home", href: "#", current: false },
    { name: "Contact", href: "#", current: false },
    { name: "About", href: "#", current: false }
  ];

  return (
    <div className="main">
      <div className="grid grid-cols-3 gap-4 justify-between h-80">
        <div>
          <h1>
            <text id="b">B</text>
            <text id="b-continue">yte</text>
            <text id="store">STORE</text>
          </h1>
        </div>
        <div></div>
        <div className="navbar">
          <div className="flex space-x-4 grid grid-cols-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:text-white hover:text-2xl hover:underline",
                  "rounded-md px-3 py-8 text-xl font-large"
                )}
              >
                {item.name}
              </a>
            ))}
            <button key='Login'  onClick={() => setIsOpen(true)} className="text-gray-300 hover:text-white hover:text-2xl hover:underline rounded-md px- py-8 text-xl font-large">Login</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <HeroSection setIsOpen = {setIsOpen}/>
        </div>
        <div>
          <div className=" h-80"></div>
          <Footer />
        </div>
      </div>


      <div>

      {/* Modal */}
      {isOpen && (

        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"> {/* Backdrop */}
          <div className="p-8 shadow-lg w-1/2"> 
            <AuthPage setIsOpen={setIsOpen}/>
          </div>
        </div>
      )}
    </div>



    </div>
  );
};

export default LandingPage;
