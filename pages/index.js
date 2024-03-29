
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import { useState } from "react";

const url = "https://raw.githubusercontent.com/franreyn/pimaonline-ereader/main/public/cache/posts.json";



export const getServerSideProps = async () => {
  const response = await fetch(url);
  const data = await response.json();

  return {
    props: { data }
  }
};

export default function Home({data}) {
  const { results = [] } = data;
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-full">
      <Head>
        <title>PimaOnline eReader</title>
        <meta name="description" content="Generated by create next app" />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <div>

        <input placeholder="Enter Post Title" onChange={event => setSearchQuery(event.target.value)}/>
        <br></br>

        <div>
          {data.filter(post => {
                if (searchQuery === "") {
                  return null;
                } else if (post.data.title.toLowerCase().includes(searchQuery.toLowerCase())) {
                  return post;
                }
              }).map(publication => (
            <div key={publication.id}>
              <p>{publication.data.title}</p>
              <Link href={`/lit/${publication.slug}`}>View more</Link>
              <br></br>
              <br></br>
            </div>
          ))}
        </div>
        <p>==========</p>
        <div>
          {data.map(publication => (
            <div key={publication.id}>
              <p>{publication.data.title}</p>
              <Link href={`/lit/${publication.slug}`}>View more</Link>
              <br></br>
              <br></br>
            </div>
          ))}            
        </div>

      </div>

     
    
      <Script>
        {`
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            })
          }
        `}
      </Script>
    </div>
  );
}
