"use client";

import React from "react";

const Icon = () => {
  return (
    <div className="h-screen flex flex-col justify-between items-center py-6">

      {/* ── TOP SECTION ── */}
      <div className="mt-10 flex flex-col items-center gap-20">

        {/* User */}
        <img
          src="/user.png"
          alt="User"
          className="w-14 h-14 rounded-full object-cover cursor-pointer hover:scale-105 transition"
        />

        {/* Call */}
        <div className="p-4 rounded-full bg-[#7288e0] cursor-pointer transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
          </svg>
        </div>

        {/* Notification */}
        <div className="p-4 rounded-full bg-[#7288e0] cursor-pointer transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </svg>
        </div>

        {/* Search */}
        <div className="p-4 rounded-full bg-[#7288e0] cursor-pointer transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
        </div>
        {/* ai bot  */}
        <div className="p-4 rounded-full bg-[#7288e0] cursor-pointer transition">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </div>

      </div>

      {/* ── BOTTOM LOGO ── */}
      <div className="flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-30 h-28 object-contain"
        />
      </div>

    </div>
  );
};

export default Icon;