const Users = () => `
    <div id="users" class="m-2">
        <div class="card">
        <div class="card-body mb-2">
            <h4 class="card-title text-center">No data to display</h4>
        </div>
    </div>
    </div>
    <div class="card">
        <div class="card-body mb-2">
            <h4 class="card-title">Add new user</h4>
            <input class="form-control mb-2" placeholder="first name" type="text" id="first_name">
            <input class="form-control mb-2" placeholder="last name" type="text" id="last_name">
            <button class="form-control btn btn-primary" onclick="saveUser()">Save</button>
        </div>
    </div>
`;
