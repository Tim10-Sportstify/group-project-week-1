const baseURL = "http://127.0.0.1:3000/"

$(document).ready(() => {
  checkLocalStorage()

  $("#btn-submit").on("click", (e) => {
    e.preventDefault();
    logIn();
  })

  $("#btn-go-sign-up-page").on("click", () => {
    showRegister();
  })

  $("#btn-logout").on("click", () => {
    logOut();
  })

  $("#btn-submit-signup").on("click", () => {
    register();
  })


})

function logIn() {
  const email = $('#emaillogin').val()
  const password = $('#passwordlogin').val()

  $.ajax({
    url: baseURL + 'user/login',
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done(response => {
    console.log(response)
    localStorage.setItem("access_token", response.access_token)
    localStorage.setItem("name", response.name)
    checkLocalStorage()
  })
  .fail(err => {
    console.log(err);
  })
  .always(() => {
    $('#emaillogin').val("")
    $('#passwordlogin').val("")
  })
}

function showRegister() {
  $("#registerpage").show()
  $("#loginpage").hide()
  $("#afterlogin").hide()
}

function register() {
  const name = $('#reg-name').val()
  const email = $('#reg-email').val()
  const password = $('#reg-password').val()

  $.ajax({
    url: baseURL + 'user/register',
    method: "POST",
    data: {
      name,
      email,
      password
    }
  })
  .done(response => {
    console.log(response)
    $("#loginpage").show()
    $("#registerpage").hide()
    $("#afterlogin").hide()
  })
  .fail(err => {
    console.log(err)
  })
}

function checkLocalStorage() {
  if(localStorage.access_token) {
    $("#afterlogin").show()
    $("#loginpage").hide()
    $("#registerpage").hide()
  } else {
    $("#loginpage").show()
    $("#registerpage").hide()
    $("#afterlogin").hide()
  }
}

function logOut() {
  localStorage.removeItem("access_token")
  checkLocalStorage()
}