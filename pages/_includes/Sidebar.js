import React from 'react'
import { useState,useEffect } from 'react'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState();

  const [isDarkMode, setisDarkMode] = useState(() => {
    let saved;
    if (typeof window !== 'undefined') {
      saved = localStorage.getItem("isDarkMode");
    }
    const initialValue = saved;
    return initialValue || null ;
  })

  useEffect(() => {
    //Store darkmode in local storage
    localStorage.setItem("isDarkMode", isDarkMode);
    document.body.toggleAttribute("darkmode");
  }, [isDarkMode])
  
  return (
    <>
      <div id="navigation">
        <div className='page-controller'>
          <div className="nav-controls">
            <button className="nav-toggle" id="nav-icon" type='button' onClick={() => (setSidebarOpen(!sidebarOpen))}>
              <div id="nav-icon" className={sidebarOpen ? "open" : ""}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            <button type="button" className="darkmode-toggle" onClick={() => (setisDarkMode(!isDarkMode))}>
              <div className="light-dark-icons">
              <FontAwesomeIcon className="icon-lrg fa-sun" icon={faSun}/>
              <FontAwesomeIcon className="icon-lrg fa-moon" icon={faMoon}/>
              </div>
            </button>
          </div>
          <div className="page-turner">
            <button className="back-btn" type="button">
              <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <button className="forward-btn" type="button">
            <FontAwesomeIcon icon={faChevronRight}/>
            </button>
          </div>
        </div>
        <nav className={sidebarOpen ? "sidebar open" : "sidebar"}>
          <ul>
            <li><a>Chapter 1</a></li>
            <li><a>Chapter 2</a></li>
            <li><a>Chapter 3</a></li>
            <li><a>Chapter 4</a></li>
            <li><a>Chapter 5</a></li>
            <li><a>Chapter 6</a></li>
            <li><a>Chapter 7</a></li>
            <li><a>Chapter 8</a></li>
            <li><a>Chapter 9</a></li>
          </ul>
        </nav>
      </div>
    </>
  )
}
{/* <button type="button" onClick={() => setIsDarkMode(!isDarkMode)}>Light-Dark</button> */}
