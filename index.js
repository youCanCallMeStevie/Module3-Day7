fetchData = async () => {
  try {
    let response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: "GET",
    });
    let users = await response.json();
    return users;
  } catch (error) {}
};

window.onload = async () => {
 await tableOnLoad();
};

tableOnLoad = async () => {
  const users = await fetchData();
    let htmlString = "";
    const table = document.querySelector(".user-info");
    users.forEach((user) => {
      htmlString =
        htmlString +
        `<tr> 
        <th scope="row">${user.id}</th>
        <td><a href="details.html?user=${user.id}">${user.name}</a></td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</td>
        </tr>`;
    });
    table.innerHTML = htmlString; 
    // table.innerHTML = users.map(user => {
    //   delete user.address.geo
    //   return `<tr>
    //   <th scope="row">${user.id}</th>
    //   <td><a href="details.html?user=${user.id}">${user.name}</a></td>
    //   <td>${user.username}</td>
    //   <td>${user.email}</td>
    //   <td>${Object.values(user.address).join(" ")}</td>
    //   </tr>`}
    //   ).join('')
    //   initMap(users);
  };

filteredTable = (users) => {
  const table = document.querySelector(".user-info");
  table.innerHTML = "";
  let htmlString = "";
  users.forEach((user) => {
    htmlString =
      htmlString +
      `<tr> 
        <th scope="row">${user.id}</th>
        <td><a href="details.html?user=${user.id}">${user.name}</a></td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</td>
        </tr>`;
  });
  table.innerHTML = htmlString;
};

//<td>${Object.value}
/* <td>${{...user.address}}</td> */
const input = document.querySelector("#userSearchForm");

filterUserName = async () => {
  const users = await fetchData();
  let result = users.filter((user) =>
    user.username.toLowerCase().includes(input.value.toLowerCase())
  );
  filteredTable(result);
  initMap(result);
};

filterName = async () => {
  const users = await fetchData();
  let result = users.filter((user) =>
    user.name.toLowerCase().includes(input.value.toLowerCase())
  );
  filteredTable(result);
  initMap(result);
  console.log(result)
};

filterEmail = async () => {
  const users = await fetchData();
  let result = users.filter((user) =>
    user.email.toLowerCase().includes(input.value.toLowerCase())
  );
  filteredTable(result);
  initMap(result);
};

const userSelection = () => {
  let selection = document.querySelector("select");
  console.log(selection.value);
  switch (selection.value) {
    case "Name":
      filterName();
      break;
    case "Username":
      filterUserName();
      break;
    case "Email":
      filterEmail();
      break;
    default:
      console.log(`Please make a selection`);
  }
};
let sorted = false;
sortName = async () => {
  const users = await fetchData();

  if (sorted == false) {
    users.sort(function (a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    sorted = true;
  } else if (sorted == true) {
    users.sort(function (a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    sorted = false;
  }
  filteredTable(users);
};

//Initialize and add the map
initMap = async (user) => {
  // The location of Uluru
  try {
  let response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
 method: "GET",
      });
      if(response.ok) {
        let users = await response.json();
        console.log(users);
        const uluru = { lat: -25.344, lng: 131.036 };
        // The map, centered at Uluru
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 1,
          center: uluru,
        });
        users.map(user=>user.name)
        users.forEach((user) => {
          const pos = {
            lat: parseFloat(user.address.geo.lat),
            lng: parseFloat(user.address.geo.lng),
          };
          const marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: user.name,
          });
        });
      
        // The marker, positioned at Uluru
        const marker = new google.maps.Marker({
          position: uluru,
          map: map,
        });
    }} catch(error) {
         console.log(error)
      }


};
