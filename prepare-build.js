import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

try {
  // Check if any aline photo was uploaded to root directory
  const rootFiles = fs.readdirSync(rootDir);
  const alineFile = rootFiles.find(
    (f) =>
      f.toLowerCase().startsWith('aline') &&
      !f.endsWith('.tsx') &&
      !f.endsWith('.ts') &&
      !f.endsWith('.js') &&
      !f.endsWith('.json') &&
      !f.endsWith('.md')
  );

  if (alineFile) {
    const srcPath = path.join(rootDir, alineFile);
    // Duplicate to standard aliases in public folder
    fs.copyFileSync(srcPath, path.join(publicDir, alineFile));
    fs.copyFileSync(srcPath, path.join(publicDir, 'aline.jpg'));
    fs.copyFileSync(srcPath, path.join(publicDir, 'aline.png'));
    fs.copyFileSync(srcPath, path.join(publicDir, 'aline.jpeg'));
    fs.copyFileSync(srcPath, path.join(publicDir, 'aline'));
    console.log(`[prepare-build] Foto ${alineFile} copiada para public/ com sucesso.`);
  }
} catch (err) {
  console.log('[prepare-build] Info:', err.message);
}
