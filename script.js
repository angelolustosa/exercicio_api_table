// Fetch data from the API
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        const usersTable = document.getElementById('users-table');
        const usersTableBody = usersTable.getElementsByTagName('tbody')[0];

        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>${user.website}</td>
            <td>${`${user.address.street}, ${user.address.suite} | ${user.address.suite}, ZIP: ${user.address.zipcode}  `}</td>
        `;
            usersTableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });