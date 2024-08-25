import { deleteNoteApi, responseMessage } from "../../remote/note-api";
import { getNotes } from "../view/notes";

class ButtonDelete extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._id = this.getAttribute('id');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this._shadowRoot.innerHTML = `
        <style>
                button {
                    color: #fff;
                    background-color: #d9534f;
                    border-color: #d43f3a;
                    width:100%;
                    padding: 6px;
                    border-radius: 0.8rem;
                    border: none;
                    cursor: pointer;
                }
        </style>
        <button id="btn-del">Delete</button>
        `;

        this._shadowRoot.getElementById('btn-del').addEventListener('click', async () => {
            try {
                const response = await deleteNoteApi(this.id);
                responseMessage(response.message);
                getNotes();
            } catch(error) {
                responseMessage(err.message);
            }
        });
    }
}

customElements.define('button-delete', ButtonDelete);
