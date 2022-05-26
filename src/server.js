if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const ToDo = require('./models/toDo')
const port = process.env.PORT;

const Connection = require('./database/database');

app.use(express.static('src/public'))
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const getList = await new ToDo({});
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/toDoList', async (req, res) => {
    try {
        const toDoList = await ToDo.find({});
        res.send(toDoList)
    } catch (error) {
        console.log(error);
    }
})

app.post('/toDoList', async (req, res) => {
    const newToDo = new ToDo({
        title: req.body.title,
        comment: req.body.comment
    })
    await newToDo.save();
    res.send(newToDo)
})

app.delete('/toDoList/:id', async (req, res) => {
    const id = req.params.id;
    res.send(id);
    await ToDo.deleteOne({ _id: id })
});

app.put('/toDoList/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    const newToDo = {
        title: req.body.title,
        comment: req.body.comment
    }

    await ToDo.findOneAndUpdate(filter, newToDo);


})

Connection();

app.listen(port, () => {
    console.log(`App is listen on port ${port}`)
})
