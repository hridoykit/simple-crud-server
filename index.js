const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

const users = [
    {id: 1, name: 'Sathi', age: 28, email: 'sathi@gmail.com'},
    {id: 1, name: 'Hridoy', age: 31, email: 'hridoy@gmail.com'},
    {id: 1, name: 'dina', age: 23, email: 'dina@gmail.com'}
]

app.get('/', (req, res) => {
    res.send("hello crud operation")
})

app.get('/users', (req, res) => {
    // const id = req.params.id
    res.send(users)
})

app.post('/users', (req, res) => {
    const user = req.body
    console.log(user)
    // res.send(user)
})

app.listen(port, () => {
    console.log(`app is running port: ${port}`)
})
