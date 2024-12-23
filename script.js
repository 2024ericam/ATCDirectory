document.addEventListener('DOMContentLoaded', function() {

    const userForm = document.getElementById('userForm');
    const userTableBody = document.querySelector('#userTable tbody');
    const userIdInput = document.getElementById('userId');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submitBtn');

    let users = [];

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = userIdInput.value;
        const name = nameInput.value;
        const email = emailInput.value;

        if (id) {
            const user = users.find(user => user.id === parseInt(id));
            user.name = name;
            user.email = email;
            userIdInput.value = '';
            submitBtn.textContent = 'Add User';
        } else {
            const newUser = {
                id: users.length + 1,
                name: name,
                email: email
            };
            users.push(newUser);
        }

        nameInput.value = '';
        emailInput.value = '';
        renderTable();
    });

    function renderTable() {
        userTableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td class="actions">
                    <button class="edit" data-id="${user.id}">Edit</button>
                    <button class="delete" data-id="${user.id}">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });

        attachEventListeners();
    }

    function attachEventListeners() {
        const editButtons = document.querySelectorAll('.edit');
        const deleteButtons = document.querySelectorAll('.delete');

        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const user = users.find(user => user.id === id);
                nameInput.value = user.name;
                emailInput.value = user.email;
                userIdInput.value = user.id;
                submitBtn.textContent = 'Update User';
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                users = users.filter(user => user.id !== id);
                renderTable();
            });
        });
    }

    renderTable();
});
