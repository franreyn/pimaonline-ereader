// Builds the API of all the books

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const getAll = dir => {
  // Read files at directory
  const directory = path.join(process.cwd(), dir);
  const fileNames = fs.readdirSync(directory);
  // Sort the file names alphabetically
  fileNames.sort();
  // Get the content of the files as JSON
  const content = fileNames.map((fileName, index) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id: index + 1,
      slug, 
      ...matterResult
    };
  });
  // Return a big array of JSON
  return JSON.stringify(content);
};

const allPosts = getAll("content");

const postFileContents = `${allPosts}`;

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