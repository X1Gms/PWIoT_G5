const url = "http://localhost:80/getusers.php"; // URL para o PHP que retorna os usuários

const tableBody = document.getElementById("users-table-body");

async function loadUsers() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching data!");

    const users = await response.json();

    if (users.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='5'>No users found</td></tr>";
      return;
    }

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.className = "linha-clara";

      row.innerHTML = `
        <td style="font-weight: 800">${user.id_user}</td>
        <td>${user.username}</td>
        <td>${user.created_at}</td>
        <td>${user.role_name ? user.role_name : "Unknown Role"}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    tableBody.innerHTML = "<tr><td colspan='5'>Error loading data</td></tr>";
  }
}

document.addEventListener("DOMContentLoaded", loadUsers);
