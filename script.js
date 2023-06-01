inputName.addEventListener('keyup', filterRows);
inputUserName.addEventListener('keyup', filterRows);




function filterRows() {
    const table = document.getElementById('users-table');
    const linhas = table.getElementsByTagName('tr');

    const valueName = inputName.value.toLowerCase();
    const filterUserName = inputUserName.value.toLowerCase();

    linhas.forEach(i => console.log(i))


  
    /* for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.getElementsByTagName('td');
      let shouldDisplay = false;
  
      if (valueName === '' && filterUserName === '') {
        shouldDisplay = true;
      } else {
        const cell1Text = cells[0].textContent.toLowerCase();
        const cell2Text = cells[1].textContent.toLowerCase();
  
        if (
          cell1Text.indexOf(filterValue1) > -1 &&
          cell2Text.indexOf(filterValue2) > -1
        ) {
          shouldDisplay = true;
        }
      }
  
      row.style.display = shouldDisplay ? '' : 'none';
    } */
  }

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