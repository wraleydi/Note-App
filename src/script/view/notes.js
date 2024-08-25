import { createNoteApi, getNotesApi, responseMessage } from '../../remote/note-api.js';

const container = document.getElementById('notes-container');
const loading = document.getElementById('loading');
const overlay = document.getElementById('overlay');

export const displayNotes = (note) => {
    const noteElement = document.createElement('note-item');
    noteElement.setAttribute('id', note.id);
    noteElement.setAttribute('title', note.title);
    noteElement.setAttribute('body', note.body);
    noteElement.setAttribute('createdAt', note.createdAt);
    noteElement.setAttribute('archived', note.archived);
    container.appendChild(noteElement);
};

const showLoading = () => {
    loading.style.display = 'block';
    overlay.style.display = 'block';
}

const hideLoading = () => {
    loading.style.display = 'none';
    overlay.style.display = 'none';
}

const getNotes = async () => {
    try {
        const { data } = await getNotesApi();
        container.innerHTML = '';
        data.forEach(note => displayNotes(note));
    } catch (error) {
        responseMessage('gagal memuat, coba cek internet anda')
    }
};

const createNote = async (note) => {
    showLoading();
    try {
        const response = await createNoteApi(note);
        responseMessage(response.message);
        displayNotes(response.data);
    } catch(error) {
        responseMessage(error.message || 'Terjadi kesalahan. Cek koneksi internet Anda.');
    } finally {
        hideLoading();
    }
};

export {
    getNotes,
    createNote,
    showLoading,
    hideLoading
};