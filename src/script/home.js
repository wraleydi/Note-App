import './components/index.js';
import DATA_DUMMY from '../data.js';

let Notes = [];
const EVENT_RENDER = 'EVENT_RENDER';

const formInput = document.getElementById('is-form');

function saveStorage() {
    localStorage.setItem('notes', JSON.stringify(Notes));
}

function createNote(noteItem) {
    const element = document.createElement('book-item');
    element.setAttribute('id', noteItem.id);
    element.setAttribute('title', noteItem.title);
    element.setAttribute('body', noteItem.body);
    element.setAttribute('createdAt', noteItem.createdAt);
    element.setAttribute('archived', noteItem.archived);
    return element;
}

document.addEventListener(EVENT_RENDER, function() {
    const noteList = document.getElementById('note-list');
    noteList.innerHTML = '';
    for (const noteItem of Notes) {
        noteList.append(createNote(noteItem));
    }
});

// Mengisi Notes dari DATA_DUMMY dan memicu render
Notes = DATA_DUMMY;
document.dispatchEvent(new Event(EVENT_RENDER));
