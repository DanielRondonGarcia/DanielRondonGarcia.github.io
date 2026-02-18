const fs = require('fs');
const path = require('path');

function removeDirSync(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDirSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
}

function removeFileSync(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

// Clean slides/html
const slidesDir = path.join('public', 'slides');
if (fs.existsSync(slidesDir)) {
    fs.readdirSync(slidesDir).forEach((file) => {
        if (file.endsWith('.html')) {
            removeFileSync(path.join(slidesDir, file));
        }
    });
}

// Clean images/png
const imagesDir = path.join('public', 'images');
if (fs.existsSync(imagesDir)) {
    fs.readdirSync(imagesDir).forEach((file) => {
        if (file.endsWith('.png')) {
            removeFileSync(path.join(imagesDir, file));
        }
    });
}

// Remove directories
removeDirSync(path.join('public', 'slides', 'images'));
removeDirSync(path.join('public', 'slides', 'themes'));
removeFileSync(path.join('public', 'slides', 'whiteboard.js'));

console.log('Slides cleaned successfully.');
