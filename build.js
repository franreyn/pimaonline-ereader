const fs = require('fs');
const path = require('path');

const dirPath = 'content';

function getFilesInDirectory(dirPath) {
  // Read the contents of the directory
  const files = fs.readdirSync(dirPath);

  // Loop through each file and get its path
  const filePaths = files.map(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    // If the file is a directory, recursively get the files in that directory
    if (stat.isDirectory()) {
      return getFilesInDirectory(filePath);
    }

    // Otherwise, return the path to the file
    return filePath;
  });

  // Flatten the array of file paths if necessary
  return filePaths.flat();
}

const filesInDir = getFilesInDirectory(dirPath);
const filesJson = JSON.stringify(filesInDir);

console.log(filesJson);
