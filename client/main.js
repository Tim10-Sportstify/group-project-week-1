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
  $('#classment').hide()
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

function loadNews(type) {
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
                        <div class="card m-5" style="width: 18rem;">
                            <img class="img-card" src="${response.articles[i].urlToImage}" class="card-img-top" alt="imgNews">
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
                        <div class="card m-5" style="width: 18rem;">
                            <img class="img-card" src="${response.articles[i].urlToImage}" class="card-img-top" alt="imgNews">
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
      "x-rapidapi-key" : "40d6015370msh6b2bef29c28104ap165f74jsnc05db6016311",
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
      "x-rapidapi-key" : "40d6015370msh6b2bef29c28104ap165f74jsnc05db6016311",
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
      "x-rapidapi-key" : "40d6015370msh6b2bef29c28104ap165f74jsnc05db6016311",
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
