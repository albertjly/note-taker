const fs = require('fs');
const path = require('path');
const express = require('express');
const router = require('express').Router();
const notesData = require('../../db/db.json');

router.post('/api/notes', (req, res)=>{
    const id = parseInt(Math.random() * 100000).toString();
    const newNote = createNewNote(req.body, id, notesData);
    res.json(newNote);
});

router.get('/api/notes', (req, res)=>{
    res.json(notesData);
});

function createNewNote(note, id, noteArray) {
    note.id = id;
    noteArray.push(note);
    console.log(noteArray);
    fs.writeFile(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ noteArray }.noteArray, null, 2), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    return note;
}

module.exports = router;
