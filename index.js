let httpRequest;
document
  .querySelector("#submit")
  .addEventListener("click", makeRequest);
const searchbar = document.getElementById('searchbar')

const createTable = () => {
  const response = JSON.parse(httpRequest.responseText);
  const table = document.createElement('table')
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  table.appendChild(thead)
  table.appendChild(tbody)
  thead.appendChild(createRow(['attribute', 'value']))
  for (const attribute in response) {
    tbody.appendChild(createRow([attribute, response[attribute]]))
  }
  const placement = document.querySelector('#result')
  placement.appendChild(table)
}

function makeRequest() {
  httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert("Giving up :( Cannot create an XMLHTTP instance");
  return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open("GET", "https://api.github.com/users/" + searchbar.value);
    httpRequest.send();
}

const createRow = (contents) => {
  const tr = document.createElement('tr')
  for (const elem in contents) {
    const td = document.createElement('td')
    td.innerHTML = contents[elem];
    tr.appendChild(td);            
  }
  return tr;
}

function alertContents() {
      if (httpRequest.status === 200) {
        createTable()
      } else {
        alert("User not found");
      }
    
}