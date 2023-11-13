const submit = document.getElementById("submit");
const searchbar = document.querySelector('#searchbar')

const displayInfo = (data) => {
  const avatar = document.createElement('img')              
  const name = document.createElement('h1')              
  const login = document.createElement('p')
  const bio = document.createElement('p')
  const follow_info = document.createElement('div')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const container = document.createElement('div')
  
  avatar.src = data['avatar_url']
  name.innerHTML = data['name']
  login.innerHTML = data['login']
  bio.innerHTML = data['bio']
  followers.innerHTML = 'Followers: ' + data['followers']
  following.innerHTML = 'Following: ' + data['following']
  follow_info.id = 'follow-info'

  follow_info.appendChild(followers)
  follow_info.appendChild(following)
  container.appendChild(avatar)
  container.appendChild(name)
  container.appendChild(login)
  container.appendChild(bio)
  container.appendChild(follow_info)

  const head = document.getElementById('result-head')
  head.innerHTML = ''
  head.appendChild(container)
}

const displayRepos = async (data) => {
  const response = await fetch(data['repos_url'])
  const repos = await response.json();
  
  const result_list = document.createElement('ul')
  result_list.id = 'result-list'
  for (repo of repos) {
    const li = document.createElement('li')
    const name = document.createElement('h3')
    const desc = document.createElement('p')
    const container = document.createElement('div')
    const lang = document.createElement('span')
    const updated = document.createElement('span')

    name.innerHTML = repo['name']
    desc.innerHTML = repo['description']
    container.className = 'repo-lang-updated'
    lang.innerHTML = repo['language'] == null ? 'none' + ' | ' : repo['language'] + ' | '
    updated.innerHTML = repo['updated_at'].slice(0, 10)

    container.appendChild(lang)
    container.appendChild(updated)
    li.appendChild(name)
    li.appendChild(desc)
    li.appendChild(container)
    result_list.appendChild(li)
  }

  const body = document.getElementById('result-body')
  body.innerHTML = ''
  body.appendChild(result_list)         
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
            displayInfo(user_data);
            displayRepos(user_data)
        } else {
            alert('User Not Found :(')
        }
    } else {
        console.log(httpRequest)
    }
}

submit.addEventListener('click', makeRequest)