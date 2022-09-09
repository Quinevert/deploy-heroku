function loadUsers() {
    fetch('/api/users').then(
        res => {
            res.json().then(
                data => {
                    let userContainer = document.querySelector('#users');
                    if(data?.length > 0) {
                        userContainer.innerHTML = '';
                        const list = document.createElement('ol');
                        list.classList.add('list-group');
                        userContainer.append(list);
                        data?.forEach(user => {
                            const li = document.createElement('li');
                            li.classList.add('list-group-item');
                            list.append(li);
                            const card = document.createElement('div');
                            card.classList.add('card');
                            card.style.width = '100%';
                            li.append(card);
                            const cardBody = document.createElement('div');
                            cardBody.classList.add('card-body');
                            card.append(cardBody);
                            const cardTitle = document.createElement('div');
                            cardTitle.classList.add('card-title');
                            cardBody.append(cardTitle);
                            cardTitle.append("#");
                            cardTitle.append(user?.id);
                            cardTitle.append(" ");
                            cardTitle.append(`${user?.first_name ?? ''} ${user?.last_name ?? ''}`);
                            const cardDates = document.createElement('p');
                            cardBody.append(cardDates);
                            cardDates.classList.add('card-text');
                            cardDates.append(user?.created_at ? new Date(user.created_at).toLocaleDateString() : '');
                        });
                    }
                }
            )
        }
    )
};
const saveUser = () => {
    const first_name = document.querySelector('#first_name');
    const last_name = document.querySelector('#last_name');
    if (!first_name?.value || !last_name?.value) return;
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ first_name: first_name?.value, last_name: last_name?.value })
    }).then(() => {
        loadUsers();
        last_name.value = '';
        first_name.value = '';
    });
}
loadUsers();