import React from 'react';

const SocialMediaComponent = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between lg:px-20 py-10 bg-gray-50">
      {/* Left Section */}
      <div className="relative lg:w-1/2 flex justify-center lg:justify-start">
  <div className="relative w-72 h-96 lg:w-80 lg:h-96">
    <img
      src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Top"
      className="absolute top-0 left-0 w-full h-full object-cover"
    />
  </div>
  <div className="absolute bottom-0 left-0 w-full flex justify-between">
    <div className="relative w-36 h-36 lg:w-40 lg:h-40">
      <img
        src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Bottom Left"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
    <div className="relative w-36 h-36 lg:w-40 lg:h-40">
      <img
        src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Bottom Right"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  </div>
  <span className="absolute bottom-2 left-2 text-xs lg:text-sm text-gray-600 rotate-90">READ THE STORY</span>
</div>

      {/* Right Section */}
      <div className="lg:w-1/2 mt-10 lg:mt-0 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold">Building the future cities</h1>
        <div className="mt-10">
          <h2 className="text-xl font-semibold flex items-center justify-between border-b border-gray-300 pb-2 cursor-pointer">
            Building the future cities
            <span className="text-2xl font-light">−</span>
          </h2>
          <p className="mt-4 text-gray-700">
            Many strands of place-making, environmental stewardship, social equity and economic viability into the 
            <strong>creation of places</strong> with distinct beauty and identity.
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold flex items-center justify-between border-b border-gray-300 pb-2 cursor-pointer">
            Unique and influential design
            <span className="text-2xl font-light">+</span>
          </h2>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold flex items-center justify-between border-b border-gray-300 pb-2 cursor-pointer">
            Award-winning Architecture
            <span className="text-2xl font-light">+</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaComponent;