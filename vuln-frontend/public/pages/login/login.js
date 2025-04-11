API_URL = 'http://localhost:3002/api/'

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const loginError = document.getElementById('login-error')

    const response = await fetch(API_URL + 'login', {
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

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const username = document.getElementById('register-username').value
    const password = document.getElementById('register-password').value
    const email = document.getElementById('register-email').value
    const loginError = document.getElementById('login-error')

    const response = await fetch(API_URL + 'users', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
        credentials: "include"
    })
    const res_status = await response.status

    e.target.reset()
    if (res_status !== 204) {
        loginError.style.display = "block"
    } else {
        const successElement = document.getElementById('user-creation-success')
        successElement.style.display = "block"
    }
})

