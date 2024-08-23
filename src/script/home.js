import { notesData } from '../data.js';

const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const container = document.getElementById('notes-container');

fetch(`${BASE_URL}/notes`)
.then(async(response) => {
    const { data } = await response.json();
    data.forEach(note => {
        const noteElement = document.createElement('note-item');
        noteElement.setAttribute('id', note.id);
        noteElement.setAttribute('title', note.title);
        noteElement.setAttribute('body', note.body);
        noteElement.setAttribute('createdAt', note.createdAt);
        noteElement.setAttribute('archived', note.archived);
        container.appendChild(noteElement);
    });
});

const createBook = async (note) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        };

        const response = await fetch(`${BASE_URL}/notes`, options);
        
        if (!response.ok) {
            // Jika status response bukan 200-299
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const responseJson = await response.json();
        responseMessage(responseJson.message);
    } catch (error) {
        responseMessage(error.message || 'Terjadi kesalahan. Cek koneksi internet Anda.');
    }
};


const responseMessage = (message = 'cek internet Anda') => {
    alert(message);
}

document.addEventListener('DOMContentLoaded', () => {
    const inputTitleNote = document.querySelector('#title');
    const inputBodyNote = document.querySelector('#body');
    const buttonCreate = document.querySelector('#btn-create');

    buttonCreate.addEventListener('click', function(){
        const note = {
            title: inputTitleNote.value,
            body: inputBodyNote.value
        };

        createBook(note)
    });
});