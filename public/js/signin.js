function logIn() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    axios.post("/reg/login", {
        email: email,
        password: password,
    })
        .then(function (response) {
            localStorage.setItem('token', response.data.token)
            // res.send( user, response.data.token )
            console.log(response);
            console.log(response.data.token)
            location.replace('http://localhost:3000/index')
        })
        .catch(function (error) {
            console.log(error);
        })
}