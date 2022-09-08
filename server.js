const http = require('http');
const fs = require('fs');
const path = require('path');
http.createServer((req, res) => {
    let file = req.url.replace("/", "");
    if (req.url === '/') {
        file = path.join(__dirname, './public/index.html');
    }
    try {
        const content = fs.readFileSync(file);
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html"
        });
        res.end(content);
    } catch(e) {
        res.writeHead(400, {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html"
        });
        res.end(`<div>404 not found </div>`);
    }
}).listen(4500, () => { console.log("server started on port 4500")});
