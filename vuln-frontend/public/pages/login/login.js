API_URL = 'http://localhost:3002/api/login'

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const loginError = document.getElementById('login-error')

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    const data = await response.json()
    
    e.target.reset()
    if (!data['token']) {
        loginError.style.display = "block"
    } else {
        window.localStorage.setItem('loggedForumappUser', data.token)
        window.localStorage.setItem('forumUsername', data.username)
        window.location.href = '/' // Go to front page
    }
})