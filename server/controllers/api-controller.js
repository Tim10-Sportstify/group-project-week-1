
class News {
    static showNews (req, res, next) {
        let apiKey = "83d779bef41c4808929e741b3b73e487"
        let monthTo = (new Date()).getMonth() + 1
        let dateTo = `${(new Date()).getFullYear()}-${monthTo}-${(new Date().getDate())}`
        let monthFrom = (new Date()).getMonth()
        let dateFrom = `${(new Date()).getFullYear()}-${monthFrom}-${(new Date().getDate())}`
        let page = Math.floor(Math.random()* 15)

        axios({
            url: `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=popularity&pageSize=6&page=${page}&apiKey=${apiKey}&language=en`,
            mothod: "GET"
        })

            .then((data) => {
                res.status(200).json(data)
            })

    } 
}

module.exports = News