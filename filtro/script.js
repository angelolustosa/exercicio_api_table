//const filterInputName = document.getElementById('filterInputName');
//const filterInputEmail = document.getElementById('filterInputEmail');
const tableBody = document.getElementById('tableBody');

let usersData = [];

fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => response.json())
    .then(data => {
        usersData = data;
        renderTableRows(usersData);
    });

filterInputName.addEventListener('keyup', filterRows);
//filterInputEmail.addEventListener('keyup', filterRows);

function renderTableRows(data) {
    let tableRows = '';

    /* data.forEach( user => {
        user['fullAddress'] = `${user.address.street}, ${user.address.suite} | ${user.address.suite}, ZIP: ${user.address.zipcode}  `
        console.log(user)
    }) */

    console.log('data', data)
   /*  data.forEach(user => {
        tableRows += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${user.website}</td>
        <td>${user.fullAddress.trim()}</td>
      </tr>
    `;
    }); */

    data.forEach(user => {
        tableRows += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${user.website}</td>
      </tr>
    `;
    });

    tableBody.innerHTML = tableRows;
}

function filterRows() {
    const filterValueName = filterInputName.value.toLowerCase();


    const filteredData = usersData.filter(user =>
        user.name.toLowerCase().includes(filterValueName) || user.email.toLowerCase().includes(filterValueName) //|| user.fullAddress.toLowerCase().includes(filterValueName)
    );

    console.log(filteredData)

    renderTableRows(filteredData);
}