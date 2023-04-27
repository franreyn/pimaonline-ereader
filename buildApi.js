// Builds the API of all the books

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const getAll = dir => {
  // Read files at directory
  const directory = path.join(process.cwd(), dir);
  const fileNames = fs.readdirSync(directory);

  let content = [];
  // Loop over files in the directory
  fileNames.forEach(fileName => {
    const fullPath = path.join(directory, fileName);
    const fileStat = fs.statSync(fullPath);
    if (fileStat.isDirectory()) {
      // If it's a directory, recurse
      const subDirContent = getAll(path.join(dir, fileName));
      content = content.concat(subDirContent);
    } else if (fileStat.isFile() && path.extname(fileName) === ".md") {
      // If it's a markdown file, read and parse it
      const slug = fileName.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(fullPath);
      const matterResult = matter(fileContents);
      content.push({
        slug,
        ...matterResult.data,
        content: matterResult.content,
      });
    }
  });
  // Return a big array of JSON
  return JSON.stringify(content);
};



const allPosts = getAll("content");

const parsedPosts = JSON.parse(allPosts)

const books = parsedPosts.map((chapter) => {
  chapter = JSON.parse(chapter)
  return chapter;
}).flat();

const postFileContents = JSON.stringify(books);

// Create the cache folder if it doesn't exist
try {
  fs.readdirSync("public/cache");
} catch (e) {
  fs.mkdirSync("public/cache");
}

// Create our cached posts JSON
fs.writeFile("public/cache/posts.json", postFileContents, err => {
  if (err) return console.log(err);
  console.log("Posts cached.");
});
