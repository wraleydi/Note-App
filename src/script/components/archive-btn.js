import { archivedNoteApi, unArchivedApi, responseMessage } from '../../remote/note-api';
import { getNotes } from '../view/notes';

class ArchiveButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._id = this.getAttribute('id');
    this._archived = this.hasAttribute('archuve') && this.getAttribute('archive') === 'true'

  }

  async handleClick() {
    try {
      if(this._archive) {
        const response = await unArchivedApi(this._id)
        responseMessage(response.message)
      } else {
        const response = await archivedNoteApi(this._id)
        responseMessage(response.message)
      }

      this._archive = !this._archive

      this.render()

      getNotes()
    } catch(error) {
      responseMessage(err.message)
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
  background-color: #4f68d9;
  border-color: #d43f3a;
  width: 100px;
  padding: 6px;
  border-radius: 0.8rem;
  border: none;
  cursor: pointer;
  margin-inline-start: 0.5rem;
}
    </style>
        <button id="btn-archive">${this.archive ? 'Unarchived':'Archived'}</button>
        `;

    this._shadowRoot
      .getElementById('btn-archive')
      .addEventListener('click', () => this.handleClick() 







      );
  }
}

customElements.define('button-archive', ArchiveButton);
