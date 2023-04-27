import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import PageNav from "../_includes/PageNav";
import Sidebar from "../_includes/Sidebar";

// const url = "https://raw.githubusercontent.com/franreyn/pimaonline-ereader/main/public/cache/posts.json";
const url = "http://localhost:3001/cache/posts.json"

export const getStaticPaths = async () => {
  const response = await fetch(url);
  const data = await response.json();

  return {
    paths: data.map(publication => ({
      params: { slug: `${publication.title}/${publication.slug}`  }
    })),
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data); // Check if data is being fetched correctly
  let lookingForSlug = params.slug;
  let matchingPub = data.find(obj => obj.slug === lookingForSlug);

  console.log(matchingPub); // Check if matchingPub is being populated correctly
  return {
    props: { matchingPub }
  }
};

  
export default function Publication({ matchingPub }) {


  const { content, data } = matchingPub;

  console.log(data)

  const { author1, author2, author3, date, subject, title } = data;

  const [] = useState();

  const wordsPerChunk = 600
  const chunks = content
    .split(" ")
    .reduce((acc, word, index) => {
      if (index % wordsPerChunk === 0) {
        return [...acc, [word]]
      }
      acc[acc.length - 1].push(word)
      return acc
    }, [])
    .map(chunk => chunk.join(" "))

  const [activeChunkIndex, setActiveChunkIndex] = React.useState(0)

  const handleNextClick = () => {
    setActiveChunkIndex(activeChunkIndex + 1)
  }

  const handlePrevClick = () => {
    setActiveChunkIndex(activeChunkIndex - 1)
  }

  const handlePageChange = (event) => {
    setActiveChunkIndex(parseInt(event.target.value))
  }

  const isPrevDisabled = activeChunkIndex === 0
  const isNextDisabled = activeChunkIndex === chunks.length - 1

  return (
    <div className="reader-wrapper">
      <Sidebar />
      {/* <header>
        <div className="topbar">


          <PageNav 
            chunks={chunks}
            handlePrevClick={handlePrevClick} 
            isPrevDisabled={isPrevDisabled}
            handlePageChange={handlePageChange}
            activeChunkIndex={activeChunkIndex}
            handleNextClick={handleNextClick}
            isNextDisabled={isNextDisabled}
          />
        </div>
      </header> */}
      <main>
        <div className="publication-info">
          <h1>{title}</h1>
          <p>Author: {author1}</p>
          <p>Published: {date}</p>
          <p>Subject: {subject}</p>
        </div>        
        <div className="content-container">
          <ReactMarkdown>{chunks[activeChunkIndex]}</ReactMarkdown>
        </div>
        <PageNav 
          chunks={chunks}
          handlePrevClick={handlePrevClick} 
          isPrevDisabled={isPrevDisabled}
          handlePageChange={handlePageChange}
          activeChunkIndex={activeChunkIndex}
          handleNextClick={handleNextClick}
          isNextDisabled={isNextDisabled}
        />
      </main>
    </div>
  )
};
