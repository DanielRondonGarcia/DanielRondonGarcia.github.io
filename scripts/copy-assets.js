const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  if (!exists) {
    console.log(`Source does not exist: ${src}`);
    return;
  }
  
  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    // Ensure destination directory exists
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

console.log('Starting asset copy...');

// 1. Copy images
try {
  const srcImages = path.join('slides', 'images');
  const destImages = path.join('public', 'slides', 'images');
  console.log(`Copying ${srcImages} to ${destImages}...`);
  copyRecursiveSync(srcImages, destImages);
} catch (err) {
  console.error('Error copying images:', err);
}

// 2. Copy themes
try {
  const srcThemes = path.join('slides', 'themes');
  const destThemes = path.join('public', 'slides', 'themes');
  console.log(`Copying ${srcThemes} to ${destThemes}...`);
  copyRecursiveSync(srcThemes, destThemes);
} catch (err) {
  console.error('Error copying themes:', err);
}

// 3. Copy whiteboard.js
try {
  const srcWhiteboard = path.join('slides', 'whiteboard.js');
  const destWhiteboard = path.join('public', 'slides', 'whiteboard.js');
  if (fs.existsSync(srcWhiteboard)) {
    console.log(`Copying ${srcWhiteboard} to ${destWhiteboard}...`);
    fs.copyFileSync(srcWhiteboard, destWhiteboard);
  } else {
    console.log('whiteboard.js not found, skipping.');
  }
} catch (err) {
  console.error('Error copying whiteboard.js:', err);
}

try {
  const srcMermaid = path.join('slides', 'mermaid-viewer.js');
  const destMermaid = path.join('public', 'slides', 'mermaid-viewer.js');
  if (fs.existsSync(srcMermaid)) {
    console.log(`Copying ${srcMermaid} to ${destMermaid}...`);
    fs.copyFileSync(srcMermaid, destMermaid);
  } else {
    console.log('mermaid-viewer.js not found, skipping.');
  }
} catch (err) {
  console.error('Error copying mermaid-viewer.js:', err);
}

console.log('Asset copy complete.');
