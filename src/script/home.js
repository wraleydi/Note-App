import { notesData } from '../data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('notes-container');

    notesData.forEach(note => {
        const noteElement = document.createElement('note-item');
        noteElement.setAttribute('id', note.id);
        noteElement.setAttribute('title', note.title);
        noteElement.setAttribute('body', note.body);
        noteElement.setAttribute('createdAt', note.createdAt);
        noteElement.setAttribute('archived', note.archived);
        container.appendChild(noteElement);
    });
});
