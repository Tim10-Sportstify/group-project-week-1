$("document").ready(() => {

    $("#btn-soccer").on("click", (e) => {
        e.preventDefault()
        loadNews("soccer")
    })

    $("#btn-nba").on("click", (e) => {
        e.preventDefault()
        loadNews("nba")
    })
})

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