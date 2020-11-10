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
  users.forEach((user) => {
    htmlString =
      htmlString +
      `<tr> 
    <th scope="row">${user.id}</th>
    <td>${user.name}</td>
    <td>${user.username}</td>
    <td>${user.email}</td>
    <td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</td>
    </tr>`;
  });
  table.innerHTML = htmlString;
};

filteredTable = (users) => {
    const table = document.querySelector(".user-info");
    table.innerHTML=""
    let htmlString =""
    users.forEach((user) => {
        htmlString =
          htmlString +
          `<tr> 
        <th scope="row">${user.id}</th>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</td>
        </tr>`;
      });
      table.innerHTML = htmlString;
}

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