const URLpath = window.location.pathname
const id = URLpath.split('/').pop()

const API_URL = `http://localhost:3002/api/posts/${id}`

const userToken = window.localStorage.getItem('loggedForumappUser')
const token = userToken ? "Bearer " + userToken.toString() : null

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

async function getCSRFToken() {
    const res = await fetch('http://localhost:3002/api/csrf-token', {
        credentials: 'include'
    });
    const data = await res.json();
    return data.csrfToken;
}

// Fetch and display posts
async function loadPost() {

    const response = await fetch(API_URL);
    const postWithComments = await response.json();

    // Seperate comments from posts using deconstructing
    const {comments, ...post} = postWithComments[0]

    console.log(post)

    const postElement = document.getElementById("post-container");
    postElement.innerHTML = ""; // Clear old values

    // Create title for post
    const titleElement = document.createElement("h1")
    titleElement.innerText = post.title
    postElement.appendChild(titleElement)
    
    // Create user text
    const userElement = document.createElement("small")
    const userLinkElement = document.createElement("a")
    userLinkElement.setAttribute("href", `/users/${encodeURIComponent(post.user_id)}`)
    userLinkElement.innerText = post.post_creator
    userElement.innerText = "By "
    userElement.appendChild(userLinkElement)
    postElement.appendChild(userElement)

    // Create content text
    const contentElement = document.createElement("p")
    contentElement.innerText = post.content
    postElement.appendChild(contentElement)

    // Create date text
    const dateElement = document.createElement("p")
    dateElement.innerText = new Date(Date.parse(post.post_created_at)).toLocaleDateString()
    postElement.appendChild(dateElement)

    // Add hr line.
    postElement.appendChild(document.createElement("hr"))


    // Create comments
    const commentContainer = document.getElementById("comments-container")
    commentContainer.innerHTML = ""
    
    if (comments[0]['comment']) {
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            // Create comment
            const commentTextElement = document.createElement("h3")
            commentTextElement.innerText = comment.comment
            commentElement.appendChild(commentTextElement)

            // Create user text with date time
            const commenterInfoElement = document.createElement("small")
            const commenterLinkElement = document.createElement("a")
            commenterLinkElement.setAttribute("href", `/users/${encodeURIComponent(comment.commenter_id)}`)
            commenterLinkElement.innerText = comment.commenter
            commenterInfoElement.innerText = "By "
            commenterInfoElement.appendChild(commenterLinkElement)
            commenterInfoElement.append(` ${new Date(Date.parse(comment.comment_created_at)).toLocaleDateString()}`)
            commentElement.appendChild(commenterInfoElement)

            // hr element
            commentElement.appendChild(document.createElement("hr"))

            commentContainer.appendChild(commentElement);
        });
    } else {
        const noCommentsElement = document.createElement('p')
        noCommentsElement.innerHTML = `<p>No comments posted</p>`
            commentContainer.appendChild(noCommentsElement)
    }
}

// Handle new comment submission
document.getElementById("commentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const comment = document.getElementById("comment").value;
    const csrfToken = await getCSRFToken()

    await fetch(API_URL + "/comment", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ comment }),
        credentials: "include"
    });

    // Clear form & reload
    e.target.reset();
    loadPost();
});

// Load posts on page load
loadPost();
