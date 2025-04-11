const URLpath = window.location.pathname
const id = URLpath.split('/').pop()

const API_URL = `http://localhost:3002/api/users/${id}`

async function getCSRFToken() {
    const res = await fetch('http://localhost:3002/api/csrf-token', {
        credentials: 'include'
    });
    const data = await res.json();
    return data.csrfToken;
}

function getUsername() {
    let name = "username" + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
const loggedUser = getUsername()

// Fetch and display posts
async function loadPosts() {
    const response = await fetch(API_URL, { credentials: "include" });
    const posts = await response.json();
    
    const headerElem = document.getElementById('usernameHeader')
    headerElem.innerText = `Posts of user ${posts[0].username}`

    const postsCountElem = document.getElementById('postsCount')
    postsCountElem.innerText = `Amount of posts: ${posts.length}`

    // Delete button
    if (loggedUser === posts[0].username) {
        const deleteButtonElement = document.createElement("button")
        const csrfToken = await getCSRFToken()
        deleteButtonElement.addEventListener("click", async () => {
            const res = await fetch(API_URL + "/delete", {
                method: "POST",
                headers: {
                    "X-CSRF-Token": csrfToken
                },
                credentials: "include"
            })

            if (res.status === 204) {
                await fetch("http://localhost:3002/api/login/logout", { credentials: "include" })
                window.location.href = "/"
            }
        })
        deleteButtonElement.innerText = "Delete account"
        postsCountElem.appendChild(deleteButtonElement)
    }


    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; // Clear old posts

    console.log(posts)

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        // Create title
        const titleElement = document.createElement("h3")
        const titleLinkElement = document.createElement("a")
        titleLinkElement.setAttribute("href", `/posts/${encodeURIComponent(post.id)}`) 
        titleLinkElement.innerText = post.title
        titleElement.appendChild(titleLinkElement)
        postElement.appendChild(titleElement)

        // Create content text
        const contentElement = document.createElement("p")
        contentElement.innerText = post.content
        postElement.appendChild(contentElement)

        // Create user text
        const userElement = document.createElement("small")
        const userLinkElement = document.createElement("a")
        userLinkElement.setAttribute("href", `/users/${encodeURIComponent(post.user_id)}`)
        userLinkElement.innerText = post.username
        userElement.innerText = "By "
        userElement.appendChild(userLinkElement)
        postElement.appendChild(userElement)
        
        // Create date text
        const dateElement = document.createElement("p")
        dateElement.innerText = new Date(Date.parse(post.created_at)).toLocaleDateString()
        postElement.appendChild(dateElement)

        // Create hr
        postElement.appendChild(document.createElement("hr"))
        postsContainer.appendChild(postElement);
    });
}

// Load posts on page load
loadPosts();
