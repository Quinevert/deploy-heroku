const http = require('http');
const fs = require('fs');
const path = require('path');
http.createServer((req, res) => {
    let url = req.url.replace("/", "");
    if (req.url === '/') {
        url = 'index.html';
    }
    const file = path.join(__dirname, './public/', url);
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
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Deploy Heroku</title>
                    <!-- Bootstrap CSS only -->
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
                </head>
                <body>
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="alert alert-danger mt-5">404: ${url} not found </div>
                        </div>
                    </div>
                </div>
                </body>
            </html>
        `);
    }
}).listen(4500, () => { console.log("server started on port 4500")});
