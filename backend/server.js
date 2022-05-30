const express = require('express')
const db = require('./models/index')
const cors = require('cors')
const app = express()
var corsOptions = {
    origin : "http://localhost:8081"
} 

db.mongoose.connect(db.url, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    console.log('Connected to database')
}).catch(err => {
    console.log('Connection Error - ',err)
    process.exit()
})

app.use(cors(corsOptions))

app.use(express.json()) // Content-type - application/json

app.use(express.urlencoded({ extended: true})) // Content type - x-www-form-urlencoded

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to crude-app-redux-toolkit'})
})

require('./routes/tutorial.routes')(app)

const PORT = process.env.PORT || 9000

app.listen(PORT, () => {
    console.log('Server is running on port '+PORT)
})