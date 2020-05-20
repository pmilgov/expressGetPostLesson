var express = require('express')
var app = express()

app.use(express.json())
app.set('port', process.env.port || 8000)


app.get('/', (req, res) => {
    res.send('Welcome to the app')
})

const basketsRouter = require('./routes/baskets')
app.use('/baskets',(req,res) => {
    res.send('baskets coming soon')
})

app.listen(app.get('port'), () => console.log('listening on port ${port}'))
