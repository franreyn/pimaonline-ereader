import React from 'react'
import { useState } from 'react'

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <>
      <button type="button" onClick={() => setIsDarkMode(!isDarkMode)}>Light-Dark</button>
    </>
  )
}
