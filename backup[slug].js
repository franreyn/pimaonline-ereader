import ReactMarkdown from 'react-markdown';

const url = "https://raw.githubusercontent.com/franreyn/pimaonline-ereader/main/public/cache/posts.json";

export const getStaticPaths = async () => {
  const response = await fetch(url);
  const data = await response.json();

  return {
    paths: data.map(publication => ({
      params: { slug: publication.slug.toString() }
    })),
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const response = await fetch(url);
  const data = await response.json();

  let lookingForSlug = params.slug;
  let matchingPub = data.find(obj => obj.slug === lookingForSlug);

  return {
    props: { matchingPub }
  }
};
  
export default function Publication({ matchingPub }) {
  console.log(matchingPub);
  const { content, data } = matchingPub;
  const { author1, author2, author3, date, subject, title } = data;

  return (
    <>
      <h2>{title}</h2>
      <p>Author: {author1}</p>
      <p>Published: {date}</p>
      <p>Subject: {subject}</p>
      <hr></hr>
      <ReactMarkdown>{content}</ReactMarkdown>
    </>
  )
};