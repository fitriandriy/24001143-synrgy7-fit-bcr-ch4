const http = require('http');
const { PORT = 9000 } = process.env;
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
const { filter } = require('./cars')

// Pengaturan body-parser
const jsonParser = bodyParser.json();

const PUBLIC_DIRECTORY = path.join(__dirname, '..', 'public')

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif'
};

function getHTML(htmlFileName) {
  const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName);
  return fs.readFileSync(htmlFilePath, 'utf-8')
}

const onRequest = (req, res) => {
  if (req.method === 'POST' && req.url === '/data') {
    jsonParser(req, res, async () => {
      try {
        const { date, totalPassengers } = req.body;
        
        const result = await filter(date, totalPassengers)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(400);
        res.end('Bad Request');
    }});
  } else if (req.url === '/cars') {
    res.writeHead(200)
    res.end(getHTML("products.html"))
    return;
  } else if (req.url === '/') {
    res.writeHead(200)
    res.end(getHTML("index.html"))
    return;
  } else {
    const filePath = path.join(PUBLIC_DIRECTORY, req.url);
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end(getHTML("404.html"))
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
    return;
  }
}

const server = http.createServer(onRequest);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in port ${PORT}`)
})
