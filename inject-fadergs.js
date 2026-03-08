const fs = require('fs');
const path = require('path');
const svg = fs.readFileSync(path.join(__dirname, 'icons', 'logo-fadergs.svg'), 'utf8').trim();
let js = fs.readFileSync(path.join(__dirname, 'generator.js'), 'utf8');
const insert = '\n\n/** Logo Fadergs (SVG oficial) */\nconst LOGO_FADERGS_SVG = ' + JSON.stringify(svg) + ';\n';
const idx = js.indexOf("function normalizarCidade");
if (idx !== -1) {
  const before = js.slice(0, idx);
  const after = js.slice(idx);
  js = before + insert + after;
  fs.writeFileSync(path.join(__dirname, 'generator.js'), js);
  console.log('OK');
} else {
  console.log('Marker not found');
}
