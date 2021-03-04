
$('document').ready(_ =>{
  $('#classment').hide()

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
      console.log(list);
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