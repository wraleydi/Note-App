import { notesData } from '../data.js';

const BASE_URL = 'https://notes-api.dicoding.dev/v2';
const container = document.getElementById('notes-container');

const getNotes = async () => {
    try {
        const response = await fetch(`${BASE_URL}/notes`);
        const { data } = await response.json();
        data.forEach(note => displayNotes(note));
    } catch (error) {
        responseMessage('Gagal memuat catatan. Cek koneksi internet Anda.');
    }
};

const displayNotes = (note) => {
    const noteElement = document.createElement('note-item');
    noteElement.setAttribute('id', note.id);
    noteElement.setAttribute('title', note.title);
    noteElement.setAttribute('body', note.body);
    noteElement.setAttribute('createdAt', note.createdAt);
    noteElement.setAttribute('archived', note.archived);
    container.appendChild(noteElement);
};

const createNote = async (note) => {
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
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const responseJson = await response.json();
        responseMessage(responseJson.message);
        displayNotes(responseJson.data);
    } catch (error) {
        responseMessage(error.message || 'Terjadi kesalahan. Cek koneksi internet Anda.');
    }
};

const deleteNote = async (note_id) => {
    try {
        const response = await fetch(`${BASE_URL}/notes/${note_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const responseJson = await response.json();
        responseMessage(responseJson.message);
        getNotes();
    } catch (error) {
        responseMessage(error);
    }
};

const buttonDelete = document.querySelectorAll('#btn-del');
buttonDelete.forEach(button => {
    button.addEventListener('click', event => {
        const noteId = event.target.id;

        deleteNote(noteId);
    });
});

const responseMessage = (message = 'cek internet Anda') => {
    alert(message);
};

document.addEventListener('DOMContentLoaded', () => {
    const inputTitleNote = document.querySelector('#title');
    const inputBodyNote = document.querySelector('#body');
    const formCreate = document.querySelector('#is-form');

    formCreate.addEventListener('submit', function(event){
        event.preventDefault(); 
        const note = {
            title: inputTitleNote.value,
            body: inputBodyNote.value
        };

        createNote(note);
    });

    getNotes();
});
