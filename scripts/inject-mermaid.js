const fs = require('fs');
const path = require('path');

const slidesDir = path.join('public', 'slides');
const scriptTags = '\n<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>\n<script src="mermaid-viewer.js"></script>\n';

if (!fs.existsSync(slidesDir)) {
  process.exit(0);
}

const files = fs.readdirSync(slidesDir).filter((file) => file.endsWith('.html'));

files.forEach((file) => {
  const filePath = path.join(slidesDir, file);
  const html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('language-mermaid') && !html.includes('class="mermaid"')) {
    return;
  }
  if (html.includes('mermaid.min.js') || html.includes('mermaid-viewer.js')) {
    return;
  }
  const updated = html.replace('</body>', `${scriptTags}</body>`);
  fs.writeFileSync(filePath, updated, 'utf8');
});
