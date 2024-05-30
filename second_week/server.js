const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Failed to load page');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (pathname === '/create' && req.method === 'POST') {
        const filePath = path.join(__dirname, query.name);

        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            fs.writeFile(filePath, data, err => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Failed to create file');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('File created successfully');
                }
            });
        });
    } else if (pathname === '/read' && req.method === 'GET') {
        const filePath = path.join(__dirname, query.name);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Failed to read file');
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data);
            }
        });
    } else if (pathname === '/delete' && req.method === 'DELETE') {
        const filePath = path.join(__dirname, query.name);

        fs.unlink(filePath, err => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Failed to delete file');
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('File deleted successfully');
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Invalid request');
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
