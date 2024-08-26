import { createNote, getNotes, showLoading, hideLoading, getArchived } from './view/notes';

document.addEventListener('DOMContentLoaded', () => {
  showLoading();
  const inputTitleNote = document.querySelector('#title');
  const inputBodyNote = document.querySelector('#body');
  const formCreate = document.querySelector('#is-form');

  formCreate.addEventListener('submit', function(event) {
    event.preventDefault();
    const note = {
      title: inputTitleNote.value,
      body: inputBodyNote.value,
    };

    createNote(note);

    inputTitleNote.value = '';
    inputBodyNote.value = '';
  });

  getNotes().finally(() => {
    hideLoading();
  });
});

const archived = document.querySelector('#archived')
const nonArchived = document.querySelector('#non-archived')

archived.addEventListener('click', function(event) {
  event.preventDefault()

  getArchived();
})
