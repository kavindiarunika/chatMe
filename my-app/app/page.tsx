"use client";

import React, { useContext } from "react";
import { ChatContext } from "./context/AppContext";

import SignupPage from "./signup/page";
import Icon from "@/components/Icon";
import Bio from "@/components/Bio";
import Call from "@/components/Call";
import Notification from "@/components/Notification";
import Search from "@/components/Search";
import Bot from "@/components/Bot";

function Page() {
  const context = useContext(ChatContext);
  const isLoggedIn = context?.isLoggedIn;
  const { active } = React.useContext(ChatContext)!;

  return (
    <div className="w-full h-screen bg-[#8697fa] flex items-center justify-center">
      {isLoggedIn ? (
        <div className="flex w-full h-full rounded-2xl overflow-hidden border border-slate-800">

          {/* Sidebar */}
          <div className="w-[150px] bg-[#03092c] h-full flex flex-col items-center py-4 gap-6">
            <Icon />
          </div>

          {/* Recent messages */}
          <div className="w-1/4 bg-[#618cea] h-full">
            {/* messages here */}
          </div>

          {/* Chat area */}
          <div className="flex-1 h-full bg-white overflow-auto p-4">
            {active === "bio" && <Bio />}
            {active === "call" && <Call />}
            {active === "bell" && <Notification />}
            {active === "search" && <Search />}
            {active === "bot" && <Bot />}
          </div>

        </div>
      ) : (
        <SignupPage />
      )}
    </div>
  );
}

export default Page;