const express = require('express')
      cors = require('cors')
      app = express()
var corsOptions = {
    origin : "http://localhost:8081"
} 

app.use(cors(corsOptions))

app.use(express.json()) // Content-type - application/json

app.use(express.urlencoded({ extended: true})) // Content type - x-www-form-urlencoded

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to crude-app-redux-toolkit'})
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Server is running on port 8080')
})