fetchData = async () => {
  try {
    let response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      method: "GET",
    });
    let users = await response.json();
    return users;
  } catch (error) {}
};

window.onload = () => {
   tableOnLoad();
};

tableOnLoad = async () => {
    const users = await fetchData();
    console.log(users);
    let htmlString = "";
  const table = document.querySelector(".user-info");
table.innerHTML = users.map(user => {
  delete user.address.geo
  return `<tr> 
  <th scope="row">${user.id}</th>
  <td><a href="details.html?user=${user.id}">${user.name}</a></td>
  <td>${user.username}</td>
  <td>${user.email}</td>
  <td>${Object.values(user.address).join(" ")}</td>
  </tr>`}
  ).join('')
  initMap(users);

//   users.forEach((user) => {
    // delete user.address.geo
//     htmlString =
//       htmlString +
    //   `<tr> 
    // <th scope="row">${user.id}</th>
    // <td><a href="details.html?user=${user.id}">${user.name}</a></td>
    // <td>${user.username}</td>
    // <td>${user.email}</td>
    // <td>${Object.values(user.address).join(" ")}</td>
    // </tr>`;
//   });
//   table.innerHTML = htmlString;
 };

filteredTable = (users) => {
    const table = document.querySelector(".user-info");
    table.innerHTML=""
    let htmlString =""
    users.forEach((user) => {
       delete user.address.geo
        htmlString = 
          htmlString +
          `<tr> 
        <th scope="row">${user.id}</th>
        <td><a href="details.html?user=${user.id}">${user.name}</a></td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${Object.values(user.address).join(" ")}</td>
        </tr>`;
      });
      table.innerHTML = htmlString;
}

//<td>${Object.value}
/* <td>${{...user.address}}</td> */

const input = document.querySelector("#userSearchForm");

filterUserName = async () => {
  const users = await fetchData();
  let result = users.filter((user) =>
    user.username.toLowerCase().includes(input.value.toLowerCase())
  );
  filteredTable(result);
};

filterName = async () => {
  const users = await fetchData();
  let result = users.filter((user) =>
    user.name.toLowerCase().includes(input.value.toLowerCase())
  );
  filteredTable(result);
};

filterEmail = async () => {
  const users = await fetchData();
  let result = users.filter((user) =>
    user.email.toLowerCase().includes(input.value.toLowerCase())
  );
  filteredTable(result);
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

const sortName = () => {
let rows = document.querySelectorAll("tbody tr")
console.log(rows[1].childNodes[2].data)
}

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

// Initialize and add the map
initMap = async (users) => {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 1,
    center: uluru,
  });
  console.log(await users);
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

  // // The marker, positioned at Uluru
  // const marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map,
  // });
};