            const submit = document.getElementById("submit");
            const searchbar = document.querySelector('#searchbar')

                      
            const appendRow = (table, row_elements, is_head) => {
              const row = document.createElement('tr');
              for (elem of row_elements) {
                console.log(elem)
                const cell = is_head ? document.createElement('th') : document.createElement('td')
                cell.innerHTML = `${elem}`
                row.appendChild(cell);
              }
              table.appendChild(row);
            }
            
            const displayData = (data) => {
              const table = document.createElement('table');
              appendRow(table, ['properties', 'values'], true)
              for (attribute in data) {
                appendRow(table, [`${attribute}`, `${data[attribute]}`], false)
              }
              const placement_div = document.getElementById('result-body')
              placement_div.innerHTML = '';
              placement_div.appendChild(table);
            }
            
            const makeRequest = () => {
                console.log('in makeRequest')
                const httpRequest = new XMLHttpRequest();
                if (!httpRequest) {
                    alert('problem');
                    return false;
                }
                httpRequest.onreadystatechange = () => renderProfile(httpRequest);
                httpRequest.open('GET', 'https://api.github.com/users/' + searchbar.value)
                httpRequest.send();
            }

            const renderProfile = (httpRequest) => {
                console.log('in renderProfile')
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                    if (httpRequest.status === 200) {
                        const user_data = JSON.parse(httpRequest.responseText);
                        displayData(user_data);
                    } else {
                        alert('User Not Found :(')
                    }
                } else {
                    console.log(httpRequest)
                }
            }

            submit.addEventListener('click', makeRequest)