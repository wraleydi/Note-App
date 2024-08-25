import { archivedNoteApi, responseMessage } from "../../remote/note-api"
import { getNotes } from "../view/notes"

class ArchiveButton extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._id = this.getAttribute('id')
  }

  connectedCallback() {
    this.render()
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
        <button id="btn-archive">Archive</button>
        `

        this._shadowRoot.getElementById('btn-archive').addEventListener('click',
            async () => {
                try {
                const response = await archivedNoteApi(this.id)
                responseMessage(response.message)
                getNotes();
            } catch(error) {
                responseMessage(err.message)
            }
            }
        )
  }
}

customElements.define('button-archive', ArchiveButton)
