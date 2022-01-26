document.addEventListener("DOMContentLoaded", function() {
  const url = "http://127.0.0.1:4000";
  const usersContainer = document.querySelector("#users");

  async function getUsers() {
    console.log("Start fetching users...");
    try {
      const response = await fetch(`${url}/users`);
      const data = await response.json();
      // console.log(data);
      listUsers(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      console.log("Finished fetching users...");
    }
  }

  async function addNewUser(user) {
    try {
      const response = await fetch(`${url}/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      getUsers();
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function updateUser(id, user) {
    try {
      const response = await fetch(`${url}/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
      getUsers();
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function deleteUser(id) {
    try {
      const response = await fetch(`${url}/users/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      getUsers();
    } catch (err) {
      console.error("Error:", err);
    }
  }

  function listUsers(users) {
    console.log(users);
    if (users.length) {
      let usersList = usersContainer.querySelector("ul");
      if (usersList) {
        usersList.innerHTML = "";
      } else {
        usersList = document.createElement("ul");
      }

      for (let i=0; i < users.length; i++) {
        let li = document.createElement("li");
        li.dataset.userId = users[i].id; /* установка атрибута data- */
        li.innerHTML = `<strong>${users[i].username}</strong> (<em>${users[i].email}</em>) works as a ${users[i].job}`;
        usersList.append(li);
      }

      // for (let user of data) {
      //   const li = document.createElement('li');
      //   li.innerHTML = `${user.username} (${user.email}), works as '${user.job}';`;
      //   ul.append(li);
      //   console.log(value);
      // }

      usersContainer.append(usersList);
      usersContainer.style.display = "block";
    } else {
      usersContainer.style.display = "none";
    }
    
  }

  getUsers();

  //  const newUser = {
  //   id: 5,
  //   username: "Alex",
  //   email: "alex@companyname.com",
  //   job: "tester"
  // }
  //
  // addNewUser(newUser);

  /*updateUser(5, {
    id: 5,
    username: "Alex",
    email: "alex@companyname.com",
    job: "senior tester"
  });*/

  /* deleteUser(1); */
});
