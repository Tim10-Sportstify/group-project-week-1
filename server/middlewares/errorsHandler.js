function errorsHandler(err, req, res, next) {
  if(err) {
    if (err.status === 400) {
      if (err.errors) {
        const errors = err.errors.map(error => error.message)
        res.status(400).json({ message: errors })
      }
    } else if(err.status === 401) {
      res.status(401).json({ message: err.message})
    } else if(err.status === 404) {
      res.status(404).json({ message: "Data Not Found" })
    } else {
      res.status(500).json({ message: "Internal Server Errors" })
    }
  }
}

module.exports = errorsHandler