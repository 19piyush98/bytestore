import React from "react";
import { Button } from 'antd';

const HeroSection = (props) => {
  return (
    <div>
      <div className="text-white py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl mb-4">Boost your productivity.</h1>
          <h2 className="text-4xl mb-8">Start using our app today.</h2>
          <p className="text-lg mb-10">
            Bytestore is a powerful data management and analysis platform that
            helps you easily organize, understand, and extract value from your
            data. Transform your raw data into actionable insights with
            Bytestore's intuitive interface and advanced features.
          </p>
          <Button color="#001628" variant="solid"
            onClick={() => props.setIsOpen(true)}
          >
            Sign Up Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
