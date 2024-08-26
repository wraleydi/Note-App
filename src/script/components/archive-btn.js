import { archivedNoteApi, unArchivedApi, responseMessage } from '../../remote/note-api';
import { getNotes } from '../view/notes';

class ArchiveButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._id = this.getAttribute('id');
    this._archived = this.getAttribute('archived') === 'true'; // Memastikan atribut archived diambil dari elemen
  }

  async handleClick() {
    try {
      if (this._archived) {
        // Jika catatan sudah diarsipkan, unarchive
        const response = await unArchivedApi(this._id);
        responseMessage(response.message);
      } else {
        // Jika catatan belum diarsipkan, archive
        const response = await archivedNoteApi(this._id);
        responseMessage(response.message);
      }

      // Toggle state
      this._archived = !this._archived;
      this.setAttribute('archived', this._archived); 

      this.render(); 
    } catch (error) {
      responseMessage(error.message || 'Terjadi kesalahan.');
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
      #btn-archive {
        color: #fff;
        background-color: ${this._archived ? '#4CAF50' : '#4f68d9'}; /* Warna berubah tergantung state */
        border-color: ${this._archived ? '#4CAF50' : '#d43f3a'};
        width: 100px;
        padding: 6px;
        border-radius: 0.8rem;
        border: none;
        cursor: pointer;
        margin-inline-start: 0.5rem;
      }
    </style>
    <button id="btn-archive">${this._archived ? 'Unarchive' : 'Archive'}</button>
    `;

    this._shadowRoot
      .getElementById('btn-archive')
      .addEventListener('click', () => this.handleClick());
  }
}

customElements.define('button-archive', ArchiveButton);
