"use client"

import React, { useContext } from 'react'
import { ChatContext } from './context/AppContext'
import { Sign } from 'crypto';
import SignupPage from './signup/page';
import Icon from '@/components/Icon';


function page() {

  const context = useContext(ChatContext);
  const isLoggedIn = context?.isLoggedIn;

  return (
    <div className='w-full bg-[#8697fa]  h-screen flex items-center justify-center'>
      {
        isLoggedIn ? (
          <div className='flex w-full h-screen  boder-2 border-slate-800 rounded-2xl '>
           
            
               {/* icon bar */}
               <div className='w-[150px] bg-[#03092c] h-full flex flex-col items-center py-4 gap-6 '>
               <Icon/>

               </div>
                 

           
            {/* recent messages*/}
              
             <div className=''>
                  
                </div>
            {/* chat area */}
            <div></div>


          </div>
        ) : (
          <SignupPage />
        )

      }

    </div>
  )
}

export default page