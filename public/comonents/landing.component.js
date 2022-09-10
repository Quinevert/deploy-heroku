const Landing = () => `
    <div class="col-xs-12">
        <h1>Deploy to heroku</h1>
        <hr />
        <h3>Deploy instruction</h3>
        <a href="https://devcenter.heroku.com/articles/github-integration">Follow instructions on Heroku</a>
        <ol class="list-group">
            <li class="list-group-item">Create Heroku account</li>
            <li class="list-group-item">Create Github repo</li>
            <li class="list-group-item">Create Heroku app</li>
            <li class="list-group-item">Link Github repo to heroku app</li>
            <li class="list-group-item">Deploy branch</li>
        </ol>
        <br />
        <h2>Create DB locally</h2>
        <hr />
        <code class="m-1">
            psql -U postgres
        </code>
        <br />
        <code class="m-1">
            CREATE DATABASE deploy_heroku;
        </code>
    </div>
    `