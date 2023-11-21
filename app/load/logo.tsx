/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

const Logo = () => {
  return (
    // // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    // <div className='animate-pulse flex justify-center items-center'><img src='/next.svg' /></div>
    <div className='bg-red-200 h-screen'>
      <div className='animate-ping flex justify-center items-center h-full'>
        {/* <img src='/next.svg' /> */}
        <div className='text-center first-letter:uppercase text-7xl font-extrabold'>talosmart</div>
      </div>
   </div>
  )
}

export default Logo