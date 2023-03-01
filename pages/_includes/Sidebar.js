import React from 'react'
import { useState } from 'react'

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <>
      <div className='sidebar'>
        <div className={sidebarOpen ? "sidebar-nav open" : "sidebar-nav"}>
          <p>I am a nav</p>
        </div>
        <div className='sidebar-controls'>
          <button type='button' onClick={() => (setSidebarOpen(!sidebarOpen))}>
            {sidebarOpen ? "Close" : "Open"}
          </button>
        </div>
      </div>
    </>
  )
}
{/* <button type="button" onClick={() => setIsDarkMode(!isDarkMode)}>Light-Dark</button> */}
