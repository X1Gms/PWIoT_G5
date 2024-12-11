import { G5Fetch } from "../../../index.js";

async function loadUsers() {
  const users = await getUsers();
  console.log(users);

  const tbody = document.getElementById("users-table-body");
  if (users.length > 0) {
    tbody.innerHTML = users
      .map((item, index) => {
        return `<tr class="linha-clara">  
        <td style="font-weight: 800">${index + 1}</td>
        <td>${item.username}</td>
        <td>${item.created_date}</td>
        <td>${item.name_role ? item.name_role : "Unknown Role"}</td>
      
      </tr>`;
      })
      .join("");
  } else {
    tbody.innerHTML = "<tr><td colspan='5'>No users found</td></tr>";
    return;
  }
}

async function getUsers() {
  try {
    const users = await G5Fetch("http://localhost:80/getusers.php");
    return users;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

window.loadUsers = loadUsers();
