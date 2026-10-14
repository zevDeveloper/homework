function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, "click", callback);
}

const contactsTable = getElement("#contactsTable tbody");
const addContactForm = getElement("#addContact");
const firstInput = getElement("#first");
const lastInput = getElement("#last");
const emailInput = getElement("#email");
const phoneInput = getElement("#phone");
const addContactButton = getElement("#add");
let contacts = [];

function hideAddContactForm() {
  setCss(addContactForm, "display", "none");
  addContactForm.reset();
  setCss(addContactButton, "visibility", "visible");
}
on(document, "DOMContentLoaded", async () => {
  const r = await fetch("contacts.json");
  if (!r.ok) {
    throw new Error(`${r.status} - ${r.statusText} `);
  }
  const jsonContacts = await r.json();
  console.log("Is this an array?", Array.isArray(jsonContacts));
  console.log('What is inside?', jsonContacts);
  if (!contacts.length) {
    contactsTable.innerHTML = "";
  }
  jsonContacts.forEach((c) => {
    const newContact = {
      first: c.first,
      last: c.last,
      email: c.email,
      phone: c.phone,
    };

    contacts.push(newContact);

    const row = contactsTable.insertRow();

    // <td><button>delete</button></td>
    row.innerHTML = `
    <td>${newContact.first}</td>
    <td>${newContact.last}</td>
    <td>${newContact.email}</td>
    <td>${newContact.phone}</td>
    <td><button>delete</button></td>
  `;

    row.querySelector("button").addEventListener("click", () => {
      row.remove();

      contacts = contacts.filter((c) => c !== newContact);

      if (!contacts.length) {
        contactsTable.innerHTML = `<tr>
          <td colspan="5">no contacts loaded</td>
        </tr>`;
      }
    });
  });
});

on(addContactForm, "submit", (e) => {
  e.preventDefault();
  //
  if (!contacts.length) {
    contactsTable.innerHTML = "";
  }

  const newContact = {
    first: firstInput.value,
    last: lastInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
  };

  contacts.push(newContact);

  const row = contactsTable.insertRow();

  // <td><button>delete</button></td>
  row.innerHTML = `
    <td>${newContact.first}</td>
    <td>${newContact.last}</td>
    <td>${newContact.email}</td>
    <td>${newContact.phone}</td>
    <td><button>delete</button></td>
  `;

  /*const td = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'delete';
  td.appendChild(deleteButton);
  row.appendChild(td);
  deleteButton.addEventListener('click', () => {
    console.log('delete row here');
  });*/

  row.querySelector("button").addEventListener("click", () => {
    row.remove();

    contacts = contacts.filter((c) => c !== newContact);

    if (!contacts.length) {
      contactsTable.innerHTML = `<tr>
          <td colspan="5">no contacts loaded</td>
        </tr>`;
    }
  });

  hideAddContactForm();
});

click(addContactButton, () => {
  setCss(addContactForm, "display", "block");
  setCss(addContactButton, "visibility", "hidden");
});

click(getElement("#cancel"), hideAddContactForm);
