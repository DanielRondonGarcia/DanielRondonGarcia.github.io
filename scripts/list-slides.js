const fs = require('fs');
const path = require('path');

function listFiles(dir, ext) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return;
  }
  
  const files = fs.readdirSync(dir).filter(file => file.endsWith(ext));
  if (files.length === 0) {
    console.log(`No ${ext} files found in ${dir}`);
  } else {
    console.log(`Files in ${dir} (*${ext}):`);
    files.forEach(file => console.log(` - ${file}`));
  }
}

listFiles(path.join('public', 'slides'), '.html');
listFiles(path.join('public', 'images'), '.png');
