const baseURL = "http://localhost:3001/"

$(document).ready(() => {
  checkLocalStorage()

  $("#btn-submit").on("click", (e) => {
    e.preventDefault();
    logIn();
  })

  $("#btn-go-sign-up-page").on("click", () => {
    showRegister();
  })

  $("#btn-logout").on("click", (e) => {
    e.preventDefault();
    logOutGoogle()
    logOut();
  })

  $("#btn-submit-signup").on("click", (e) => {
    e.preventDefault()
    register();
  })

  $("#btn-soccer").on("click", (e) => {
    e.preventDefault()
    loadNews("soccer")
  })

  $("#btn-nba").on("click", (e) => {
    e.preventDefault()
    loadNews("nba")
  })

  $('#Premier_League').on('click', (e)=>{
    $('#classment').show()
    listPremierLeague()
  })

  $('#Serie_A').on('click', (e)=>{
    $('#classment').show()
    listSeriaA()
  })

  $('#La_Liga').on('click', (e)=>{
    $('#classment').show()
    listLaLiga()
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
  .fail((err, res) => {
    console.log(err, res);
  })
  .always(() => {
    $('#emaillogin').val("")
    $('#passwordlogin').val("")
  })
}

function showRegister() {
  $("#registerpage").show()
  $('#classment').hide()
  $("#loginpage").hide()
  $("#afterlogin").hide()
  $("#futer").hide()
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
    $("#futer").hide()
  })
  .fail(err => {
    console.log(err)
  })
}

function checkLocalStorage() {
  $("#greetings").empty()
  if(localStorage.access_token) {
    $("#greetings").append(
      `
      <h1 style="color: white;">Hi, ${localStorage.getItem('name')} welcome to Sportstify</h1>
      `
    )
    loadNews("soccer")
    $("#afterlogin").show()
    $('#classment').hide()
    $("#loginpage").hide()
    $("#registerpage").hide()
    generateRandomAvatar(localStorage.getItem('name'))
  } else {
    $("#loginpage").show()
    $("#registerpage").hide()
    $("#afterlogin").hide()
    $("#futer").hide()
  }
}

function logOut() {
  localStorage.removeItem("access_token")
  localStorage.removeItem("name")
  localStorage.removeItem("oauth2_ss::http://localhost:8080::1::DEFAULT::_ss_")
  localStorage.removeItem("promo")
  checkLocalStorage()
}

function loadNews(type) {
    console.log(type, '<<<< Masuk')
    $("#row1").empty()
    $("#row2").empty()
    let apiKey = "5ed21ad4a2924a7cb59957a289f0c9c0"
    let monthTo = (new Date()).getMonth() + 1
    let dateTo = `${(new Date()).getFullYear()}-${monthTo}-${(new Date().getDate())}`
    let monthFrom = (new Date()).getMonth()
    let dateFrom = `${(new Date()).getFullYear()}-${monthFrom}-${(new Date().getDate())}`
    let page = Math.floor(Math.random()* 15)

    $.ajax({
        url: `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=popularity&pageSize=6&page=${page}&apiKey=${apiKey}&language=en`,
        mothod: "GET"
    })
    .then((response) => {
        // console.log(response.articles)
        for(let i = 0; i < response.articles.length; i++) {
            response.articles[i].publishedAt = `${(new Date(response.articles[i].publishedAt)).toDateString()} ${(new Date(response.articles[i].publishedAt)).toLocaleTimeString()}`
                // console.log(response.articles[i])
                if(i % 2 === 0) {
                    $("#row1").append(
                        // `<h1> test </h1>`
                        `
                        <div id="card1" class="card m-5 bg-body rounded" style="width: 18rem;">
                            <img style="width: 100%;" class="img-card" src="${response.articles[i].urlToImage}" class="card-img-top" alt="imgNews">
                            <div class="card-body">
                                <h5 class="card-title">${response.articles[i].title}</h5>
                                <p class="card-text">${response.articles[i].description}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">${response.articles[i].publishedAt}</li>
                            </ul>
                            <div class="card-body">
                                <a target="_blank" href="${response.articles[i].url}" class="card-link">Link to Website</a>
                            </div>  
                        </div>
                        `
                    )
                } else {
                    $("#row2").append(
                        `
                        <div id="card2" class="card m-5" style="width: 18rem;">
                            <img style="width: 100%;" class="img-card" src="${response.articles[i].urlToImage}" class="card-img-top" alt="imgNews">
                            <div class="card-body">
                                <h5 class="card-title">${response.articles[i].title}</h5>
                                <p class="card-text">${response.articles[i].description}</p>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">${response.articles[i].publishedAt}</li>
                            </ul>
                            <div class="card-body">
                                <a target="_blank" href="${response.articles[i].url}" class="card-link">Link to Website</a>
                            </div>  
                        </div>
                        `
                    )
                }
            }
    })
}

function listPremierLeague(){
  $('#group').empty()
  let year = new Date().getFullYear() - 1
  
  $.ajax({
    url:`https://api-football-beta.p.rapidapi.com/standings?season=${year}&league=39`,
    method: "GET",
    headers : {
      "x-rapidapi-host" : "api-football-beta.p.rapidapi.com",
      "x-rapidapi-key" : "1efb766545msh90eb6827270a45cp1d75adjsn67c272789963",
      "useQueryString" : true
    }
  })
    .done(response =>{
      let list = response.response[0].league.standings[0]
      let num = 1
      
      list.forEach(e => {
        $('#group').append(`
        <tr>
          <td>${num}</td>
          <td><img src="${e.team.logo}" width="20" height="20"> ${e.team.name}</td>
          <td>${e.all.played}</td>
          <td>${e.all.win}</td>
          <td>${e.all.draw}</td>
          <td>${e.all.lose}</td>
          <td>${e.points}</td>
        </tr>
        `)
        num++
      });
    })
    .fail(err =>{
      console.log(err);
    })
    .always(_ =>{
      console.log('hallo');
    })
}

function listSeriaA(){
  $('#group').empty()
  let year = new Date().getFullYear() - 1

  $.ajax({
    url:`https://api-football-beta.p.rapidapi.com/standings?season=${year}&league=135`,
    method: "GET",
    headers : {
      "x-rapidapi-host" : "api-football-beta.p.rapidapi.com",
      "x-rapidapi-key" : "1efb766545msh90eb6827270a45cp1d75adjsn67c272789963",
      "useQueryString" : true
    }
  })
    .done(response =>{
      let list = response.response[0].league.standings[0]
      let num = 1
      
      list.forEach(e => {
        $('#group').append(`
        <tr>
        <td>${num}</td>
        <td><img src="${e.team.logo}" width="20" height="20"> ${e.team.name}</td>
        <td>${e.all.played}</td>
        <td>${e.all.win}</td>
        <td>${e.all.draw}</td>
        <td>${e.all.lose}</td>
        <td>${e.points}</td>
        </tr>
        `)
        num++
      });
    })
    .fail(err =>{
      console.log(err);
    })
    .always(_ =>{
      console.log('hallo');
    })
}

function listLaLiga(){
  $('#group').empty()
  let year = new Date().getFullYear() - 1
  // console.log(year);
  $.ajax({
    url:`https://api-football-beta.p.rapidapi.com/standings?season=${year}&league=140`,
    method: "GET",
    headers : {
      "x-rapidapi-host" : "api-football-beta.p.rapidapi.com",
      "x-rapidapi-key" : "1efb766545msh90eb6827270a45cp1d75adjsn67c272789963",
      "useQueryString" : true
    }
  })
    .done(response =>{
      let list = response.response[0].league.standings[0]
      let num = 1
      
      list.forEach(e => {
        $('#group').append(`
        <tr>
          <td>${num}</td>
          <td><img src="${e.team.logo}" width="20" height="20"> ${e.team.name}</td>
          <td>${e.all.played}</td>
          <td>${e.all.win}</td>
          <td>${e.all.draw}</td>
          <td>${e.all.lose}</td>
          <td>${e.points}</td>
        </tr>
        `)
        num++
      });
    })
    .fail(err =>{
      console.log(err);
    })
    .always(_ =>{
      console.log('hallo');
    })
  
}

function generateRandomAvatar(name) {
  $('#userAvatar').attr('src', `https://ui-avatars.com/api/?rounded=true&background=2596be&color=FFFF&name=${name}`)
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
      method: 'POST',
      url: `${baseURL}googleLogin`,
      data: {
        id_token
      }
    })
    .done(res => {
      localStorage.setItem('name', res.name)
      localStorage.setItem('access_token', res.access_token)
      console.log(res);
      checkLocalStorage()
    })
    .fail((err, res) => {
      console.log(err, res);
    })
}

function logOutGoogle() {
    $.ajax({
        method: "GET",
        url: "https://mail.google.com/mail/u/0/?logout&hl=en"
    })
    .done(res => {
        logOut()
    })
}