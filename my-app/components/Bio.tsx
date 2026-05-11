import React from "react";

const Bio = () => {
  return (
    <div className="min-h-screen flex items-center gap-6 bg-white p-6 rounded-2xl shadow-md">
      
      {/* Left */}
      <div className="w-24 h-24">
        <img
          src="/logo.png"
          alt="Profile"
          className="w-full h-full rounded-full object-cover border-2 border-gray-200"
        />
      </div>

      {/* Right */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-800">
          John Doe
        </h1>
        <p className="mt-2 text-gray-500">
          Software Engineer at XYZ Company
        </p>
      </div>

    </div>
  );
};

export default Bio;