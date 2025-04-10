API_URL = 'http://localhost:3002/api/login'

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const loginError = document.getElementById('login-error')

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    })
    const res_status = await response.status

    e.target.reset()
    if (res_status !== 200) {
        loginError.style.display = "block"
    } else {
        window.location.href = '/' // Go to front page
    }
})