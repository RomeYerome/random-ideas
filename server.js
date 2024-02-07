const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

const ideas = [
    {
        id: 1,
        text: 'Positive Newsletter: a newsletter that only contains positive news',
        tag: 'Technology',
        username: 'TonyStark',
        date: '2021-05-12'
    },
    {
        id: 2,
        text: 'A platform that connects people who need to borrow items with people who have items to lend',
        tag: 'Lifestyle',
        username: 'SteveRogers',
        date: '2021-05-13'
    },
    {
        id: 3,
        text: 'A mobile app that helps people learn new languages',
        tag: 'Education',
        username: 'NatashaRomanoff',
        date: '2021-05-14'
    }
];


app.get('/', (req, res) => {
    res.send({ messagee: 'Welcome to the Random Ideas App' });
});

app.get('/api/ideas', (req, res) => {
    res.send({ success: true, data: ideas });
});

app.get('/api/ideas/:id', (req, res) => {
    const idea = ideas.find(idea => idea.id === parseInt(req.params.id));
    if (!idea)
        res.status(404).send({ success: false, message: 'Resource not found' });
    else
        res.send({ success: true, data: idea });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});