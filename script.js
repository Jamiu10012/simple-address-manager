// Define an array to hold the contacts
let contacts = [];

// Function to add a new contact
function addContact() {
  // Get the input values
  let name = document.getElementById("name").value.trim();
  let mobile = document.getElementById("mobile").value.trim();

  // Check if the mobile number already exists
  let existingContact = contacts.find((contact) => contact.mobile === mobile);
  if (existingContact) {
    alert("This mobile number already exists in your address book!");
    return;
  }
  // Check if the user entered values for both fields
  if (!name || !mobile) {
    alert("Please enter both a name and mobile number");
    return;
  }

  // Create a new contact object
  let contact = {
    name: name,
    mobile: mobile,
  };

  // Add the new contact to the contacts array
  contacts.push(contact);

  // Sort the contacts array in ascending order of name
  contacts.sort((a, b) => a.name.localeCompare(b.name));

  // Clear the input fields
  document.getElementById("name").value = "";
  document.getElementById("mobile").value = "";

  // Refresh the contact list
  displayContacts();
}

function displayContacts() {
  // Get the filter value
  let filter = document.getElementById("filter").value.trim().toLowerCase();

  // Get the contact table element
  let contactTable = document.getElementById("contact-table");

  // Clear the contact table
  contactTable.innerHTML = "";

  // Create the table header
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  let th1 = document.createElement("th");
  th1.innerText = "Name";
  let th2 = document.createElement("th");
  th2.innerText = "Mobile";
  let th3 = document.createElement("th");
  th3.innerText = "Actions";
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  thead.appendChild(tr);
  contactTable.appendChild(thead);

  // Create the table body
  let tbody = document.createElement("tbody");
  contacts.forEach((contact) => {
    if (
      contact.name.toLowerCase().includes(filter) ||
      contact.mobile.includes(filter)
    ) {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerText = contact.name;
      let td2 = document.createElement("td");
      td2.innerText = contact.mobile;
      let td3 = document.createElement("td");
      let editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.onclick = () => editContact(contact);
      td3.appendChild(editButton);
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.onclick = () => deleteContact(contact);
      td3.appendChild(deleteButton);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tbody.appendChild(tr);
    }
  });
  contactTable.appendChild(tbody);
}

// Function to filter the list of contacts
function filterContacts() {
  displayContacts();
}

// Function to edit a contact
function editContact(contact) {
  // Get the index of the contact in the contacts array
  let index = contacts.findIndex((c) => c === contact);

  // Prompt the user for the new values
  let name = prompt("Enter the new name:", contact.name);
  let mobile = prompt("Enter the new mobile number:", contact.mobile);

  // Check if the mobile number already exists
  let existingContact = contacts.find(
    (c) => c.mobile === mobile && c !== contact
  );
  if (existingContact) {
    alert("This mobile number already exists in your address book!");
    return;
  }

  // Update the contact object
  contact.name = name.trim();
  contact.mobile = mobile.trim();

  // Update the contacts array
  contacts[index] = contact;

  // Sort the contacts array in ascending order of name
  contacts.sort((a, b) => a.name.localeCompare(b.name));

  // Refresh the contact list
  displayContacts();
}

// Function to delete a contact
function deleteContact(contact) {
  // Confirm with the user before deleting
  if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
    // Get the index of the contact in the contacts array
    let index = contacts.findIndex((c) => c === contact);

    // Remove the contact from the contacts array
    contacts.splice(index, 1);

    // Refresh the contact list
    displayContacts();
  }
}

// Call the displayContacts function to
