const axios = require("axios")
class News {
  // static showNews (req, res, next) {
  //     console.log(axios, ">>>>>");
  //     console.log('masuk----');
  //       let apiKey = "83d779bef41c4808929e741b3b73e487"
  //       let monthTo = (new Date()).getMonth() + 1
  //       let dateTo = `${(new Date()).getFullYear()}-${monthTo}-${(new Date().getDate())}`
  //       let monthFrom = (new Date()).getMonth()
  //       let dateFrom = `${(new Date()).getFullYear()}-${monthFrom}-${(new Date().getDate())}`
  //       let page = Math.floor(Math.random()* 15)

  //       axios({
  //           // url: `https://newsapi.org/v2/everything?q=soccer&from=2021-2-4&to=2021-3-4&sortBy=relevancy&pageSize=6&page=15&apiKey=5ed21ad4a2924a7cb59957a289f0c9c0&language=en`,
  //           // method: "GET"
  //       })
  //       .then(response => {
  //         console.log('>>>ini respon>>>');
  //         res.status(200).json(response.data)
  //         console.log(response.data);
  //       })
  //       .catch(() => {
  //         // next({status: 404})
  //         res.status(500)
  //       })
  //   }

    static standingsPr(req, res, next){
      console.log('MASUK API');
      axios({
        url:`https://api-football-beta.p.rapidapi.com/standings?season=2020&league=39`,
        method: "GET",
        headers : {
            "x-rapidapi-host" : "api-football-beta.p.rapidapi.com",
            "x-rapidapi-key" : "1efb766545msh90eb6827270a45cp1d75adjsn67c272789963",
            "useQueryString" : true
      }
    })
    .then(response => {
      console.log('>>>ini respon>>>');
      res.status(200).json(response.data)
      console.log(response);
    })
    .catch(() => {
      // next({status: 404})
      res.status(500)
    })
  }

  static standingsSa(req, res, next){
    console.log('MASUK API');
    axios({
      url:`https://api-football-beta.p.rapidapi.com/standings?season=2020&league=135`,
      method: "GET",
      headers : {
          "x-rapidapi-host" : "api-football-beta.p.rapidapi.com",
          "x-rapidapi-key" : "1efb766545msh90eb6827270a45cp1d75adjsn67c272789963",
          "useQueryString" : true
    }
  })
  .then(response => {
    console.log('>>>ini respon>>>');
    res.status(200).json(response.data)
    console.log(response);
  })
  .catch(() => {
    // next({status: 404})
    res.status(500)
  })
}

static standingsLl(req, res, next){
  console.log('MASUK API');
  axios({
    url:`https://api-football-beta.p.rapidapi.com/standings?season=2020&league=140`,
    method: "GET",
    headers : {
        "x-rapidapi-host" : "api-football-beta.p.rapidapi.com",
        "x-rapidapi-key" : "1efb766545msh90eb6827270a45cp1d75adjsn67c272789963",
        "useQueryString" : true
  }
})
.then(response => {
  console.log('>>>ini respon>>>');
  res.status(200).json(response.data)
  console.log(response);
})
.catch(() => {
  // next({status: 404})
  res.status(500)
})
}
          
}

module.exports = News