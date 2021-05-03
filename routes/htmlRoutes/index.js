const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const notesData = require('../../db/db.json');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

router.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

router.delete('/api/notes/:id', function (req, res) {
    const result = notesData.filter(obj => {
        return obj.id !== req.params.id;
    });
    if (result) {
        fs.writeFile(
            path.join(__dirname, '../../db/db.json'),
            JSON.stringify({ result }.result, null, 2),
            (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        console.log(result);
        res.json(result);
    } else {
        res.send(404);
    }
});

function filterById(id, notesArray) {
    const result = notesArray.filter(note => note.id !== id);
    return result;
}

module.exports = router;