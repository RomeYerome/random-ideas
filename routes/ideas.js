const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// const ideas = [
//     {
//         id: 1,
//         text: 'Positive Newsletter: a newsletter that only contains positive news',
//         tag: 'Technology',
//         username: 'TonyStark',
//         date: '2021-05-12'
//     },
//     {
//         id: 2,
//         text: 'A platform that connects people who need to borrow items with people who have items to lend',
//         tag: 'Lifestyle',
//         username: 'SteveRogers',
//         date: '2021-05-13'
//     },
//     {
//         id: 3,
//         text: 'A mobile app that helps people learn new languages',
//         tag: 'Education',
//         username: 'NatashaRomanoff',
//         date: '2021-05-14'
//     }
// ];

// Get all ideas
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.send({ success: true, data: ideas });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
});

// Get single idea
router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.send({ success: true, data: idea });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: error.message });
    }

    // const idea = ideas.find(idea => idea.id === parseInt(req.params.id));
    // if (!idea)
    //     res.status(404).send({ success: false, message: 'Resource not found' });
    // else
    //     res.send({ success: true, data: idea });
});


// Add new idea
router.post('/', async (req, res) => {  // we need to add the async keyword here because we are using MongoDB
    // const idea = {
    //     id: ideas.length + 1,
    //     text: req.body.text,
    //     tag: req.body.tag,
    //     username: req.body.username,
    //     date: new Date().toISOString().split('T')[0]
    // }

    // ideas.push(idea);    // we don't need this line anymore because we are using MongoDB

    // res.send({ success: true, data: ideas });    

    // The idea object above is for local array storage. We don't need it anymore because we are using MongoDB

    const idea = new Idea({
        // we don't need the id field line anymore because mongoDB will automatically generate an id for us
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username
        // we don't need the date line anymore because we set it in the model to default to the current time
    });


    try {
        const savedIdea = await idea.save();
        res.json({ success: true, data: savedIdea });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }

})


// Update an idea
router.put('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        if (idea.username === req.body.username) {
            const updatedIdea = await Idea.findByIdAndUpdate(
                req.params.id,
                {
                    text: req.body.text,
                    tag: req.body.tag
                },
                { new: true }
            );
            return res.send({ success: true, data: updatedIdea });
        }

        // No Match
        else {
            return res.status(403).send({ success: false, message: 'Unauthorized to update this resource' });
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
    }



    // const idea = ideas.find(idea => idea.id === parseInt(req.params.id));
    // if (!idea)
    //     res.status(404).send({ success: false, message: 'Resource not found' });
    // else {
    //     idea.text = req.body.text || idea.text;
    //     idea.tag = req.body.tag || idea.tag;
    //     res.send({ success: true, data: idea });
    // }
});


// Delete an idea
router.delete('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);

        // Match Usernames
        if (idea.username === req.body.username) {
            await Idea.findByIdAndDelete(req.params.id);
            return res.send({ success: true, data: {} });
        }

        // No Match
        else {
            return res.status(403).send({ success: false, message: 'Unauthorized to delete this resource' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: error.message });
    }



    // const idea = ideas.find(idea => idea.id === parseInt(req.params.id));


    // if (!idea)
    //     res.status(404).send({ success: false, message: 'Resource not found' });

    // const deleted = ideas.splice(ideas.indexOf(idea), 1);
    // res.send({ success: true, data: deleted });

});




module.exports = router;