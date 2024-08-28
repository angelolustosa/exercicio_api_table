// Initialize and add the map
//let map;

//const filterInputName = document.getElementById('filterInputName');
//const filterInputEmail = document.getElementById('filterInputEmail');
const tableBody = document.getElementById('tableBody');

  //criar a div que terá o mapa
  const divMap = document.createElement('div');
  divMap.id = 'map'
  divMap.style.height = '50em';
  divMap.style.width = '100%';

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

  data.forEach(user => {
    user['fullAddress'] = `${user.address.street}, ${user.address.suite} - ${user.address.city} | ${user.address.suite}, ZIP: ${user.address.zipcode}  `
    //console.log(user)
  });

  //console.log('data', data)
  data.forEach(user => {
    tableRows += `
      <tr >
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${user.website}</td>
        <td>${user.address.geo.lat}, ${user.address.geo.lng}</td>
        <td>${user.fullAddress}</td>
        <td data-bs-toggle="tooltip" title="Ver no mapa">
          <img src="https://cdn-icons-png.flaticon.com/512/7509/7509111.png"
            height='25px' 
            alt="Map Icon"
            class="map-icon"
            onclick="showMap(${user.address.geo.lat}, ${user.address.geo.lng}, '${user.name}')"
          />
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = tableRows;
}

function filterRows() {
  const filterValueName = filterInputName.value.toLowerCase();


  const filteredData = usersData.filter(user =>
    user.name.toLowerCase().includes(filterValueName) ||
    user.email.toLowerCase().includes(filterValueName) ||
    user.fullAddress.toLowerCase().includes(filterValueName)
  );

  console.log(filteredData)

  renderTableRows(filteredData);
}

// Initialize and add the map
let map;

async function showMap(lat, long, name) {
  const mainDiv = document.querySelector('#main');

  // The location of Uluru
  const position = { lat: parseFloat(lat), lng: parseFloat(long) };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  console.log(`geo:`, position)
  // The map, centered at Uluru
  map = new Map(divMap, {
    zoom: 5,
    center: position,
    mapId: "DEMO_MAP_ID",
    //mapTypeId: google.maps.MapTypeId.SATELLITE // Set map type to satellite
  });

  // The marker, positioned at Uluru
  new AdvancedMarkerElement({
    map: map,
    position: position,
    title: name
  });

  mainDiv.appendChild(divMap);
}

//initMap();