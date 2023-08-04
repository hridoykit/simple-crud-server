const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

const users = [
    {id: 1, name: 'Sathi', age: 28, email: 'sathi@gmail.com'},
    {id: 2, name: 'Hridoy', age: 31, email: 'hridoy@gmail.com'},
    {id: 3, name: 'dina', age: 23, email: 'dina@gmail.com'}
]

app.get('/', (req, res) => {
    res.send("hello crud operation")
})

app.get('/users', (req, res) => {
    res.send(users)
})

app.post('/users', (req, res) => {
    const newUser = req.body
    newUser.id = users.length + 1
    users.push(newUser)
    res.send(newUser)
})

app.listen(port, () => {
    console.log(`app is running port: ${port}`)
})
