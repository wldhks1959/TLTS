// adminController.js

// Function to fetch and display users
function viewUsers() {
  document.getElementById('viewUsersButton').addEventListener('click', function() {
      fetch('/users')
          .then(response => response.json())
          .then(data => {
              const userList = document.getElementById('userList');
              userList.innerHTML = '';
              data.forEach(user => {
                  const userItem = document.createElement('div');
                  userItem.textContent = `${user.user_id} - ${user.user_name} - ${user.user_addr}`;
                  userList.appendChild(userItem);
              });
          })
          .catch(error => {
              console.error('Error fetching users:', error);
          });
  });
}

// Function to fetch and display hobbies
function viewHobbies() {
  document.getElementById('viewHobbiesButton').addEventListener('click', function() {
      fetch('/hobbies')
          .then(response => response.json())
          .then(data => {
              const hobbyList = document.getElementById('hobbyList');
              hobbyList.innerHTML = '';
              data.forEach(hobby => {
                  const hobbyItem = document.createElement('div');
                  hobbyItem.textContent = `${hobby.hobby_id} - ${hobby.hobby_name} - ${hobby.description}`;
                  hobbyList.appendChild(hobbyItem);
              });
          })
          .catch(error => {
              console.error('Error fetching hobbies:', error);
          });
  });
}

// Function to fetch hobby columns and generate form fields
function fetchHobbyColumns() {
  fetch('/getHobbyKeywords')
      .then(response => response.json())
      .then(data => {
          const hobbyFields = document.getElementById('hobbyFields');
          const updateHobbyFields = document.getElementById('updateHobbyFields');

          data.forEach(column => {
              const label = document.createElement('label');
              label.htmlFor = column.Field;
              label.innerText = `${column.Field}:`;

              const div = document.createElement('div');
              div.className = 'form-group';

              if (column.Type.startsWith('enum')) {
                  const select = document.createElement('select');
                  select.id = column.Field;
                  select.name = column.Field;

                  const options = column.Type.match(/enum\((.*)\)/)[1].replace(/'/g, "").split(",");
                  options.forEach(option => {
                      const opt = document.createElement('option');
                      opt.value = option;
                      opt.innerText = option;
                      select.appendChild(opt);
                  });

                  div.appendChild(label);
                  div.appendChild(select);
              } else {
                  const input = document.createElement('input');
                  input.type = 'text';
                  input.id = column.Field;
                  input.name = column.Field;

                  div.appendChild(label);
                  div.appendChild(input);
              }

              hobbyFields.appendChild(div);

              const divUpdate = div.cloneNode(true);
              updateHobbyFields.appendChild(divUpdate);
          });
      })
      .catch(error => {
          console.error('Error fetching hobby columns:', error);
      });
}

// Function to handle adding a hobby
function addHobby() {
  document.getElementById('addHobbyForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new URLSearchParams(new FormData(event.target));

      fetch('/addHobby', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
      })
      .then(response => response.text())
      .then(data => {
          alert(data);
          event.target.reset();
      })
      .catch(error => {
          console.error('Error adding hobby:', error);
      });
  });
}

// Function to handle updating a hobby
function updateHobby() {
  document.getElementById('updateHobbyForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new URLSearchParams(new FormData(event.target));

      fetch('/updateHobby', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formData.toString()
      })
      .then(response => response.text())
      .then(data => {
          alert(data);
          event.target.reset();
      })
      .catch(error => {
          console.error('Error updating hobby:', error);
      });
  });
}

// Initialize functions
function init() {
  fetchHobbyColumns();
  viewUsers();
  viewHobbies();
  addHobby();
  updateHobby();
}

// Execute init function on window load
window.onload = init;

// Export functions for use in other parts of the application
export { viewUsers, viewHobbies, fetchHobbyColumns, addHobby, updateHobby };
