const http = require('http');
const fs = require('fs');
const path = require('path');
const { connect, insertOne, getAll } = require('./db');
const db = connect();
http.createServer(async (req, res) => {
    try {
        let url = req.url.replace("/", "");
        if (req.url === '/') {
            url = 'index.html';
        }
        if (req.method?.toLocaleLowerCase() === 'post') {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', async () => {
                if (url === 'api/users' || url === 'api/users/') {
                    await insertOne('users', JSON.parse(data));
                    res.writeHead(200, {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    });
                    res.end(data);
                    return;
                }
            });
        }

        if (req.method?.toLocaleLowerCase() === 'get') {
            if (url === 'api/users' || url === 'api/users/') {
                res.writeHead(200, {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                });
                let response = await getAll('users');
                res.end(JSON.stringify(response));
                return;
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
                res.writeHead(404, {
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
        }
    } catch(e) {
        res.writeHead(500, {
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
                            <div class="alert alert-danger mt-5">
                                <p>
                                    Internal server Error
                                </p>
                                <code>
                                    ${e?.message ?? 'Unknown error'}
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                </body>
            </html>
        `);
    }
}).listen(process.env.PORT || 4500);
