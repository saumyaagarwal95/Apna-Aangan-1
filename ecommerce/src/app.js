const express = require('express')
const path = require('path');
const userRouter = require('./routes/user')
const itemRouter =require('./routes/item')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
require('../src/db/mongoose')

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(itemRouter)
app.use(cartRouter)
app.use(orderRouter)

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})
app.listen(port, () => {
    console.log('server listening on port ' + port)
})