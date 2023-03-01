import React from 'react'

function PageNav({ chunks, handlePrevClick, isPrevDisabled, handlePageChange, activeChunkIndex, handleNextClick, isNextDisabled }) {
  return (
    <>
      <div className="page-controller">
          <button onClick={handlePrevClick} disabled={isPrevDisabled}>
            Prev
          </button>
          <select onChange={handlePageChange} value={activeChunkIndex}>
            {chunks.map((chunk, index) => (
              <option key={index} value={index}>
                Page {index + 1}
              </option>
            ))}
          </select>
          <button onClick={handleNextClick} disabled={isNextDisabled}>
            Next
          </button>
        </div>    
    </>
  )
}

export default PageNav