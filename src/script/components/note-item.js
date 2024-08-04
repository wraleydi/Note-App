class NoteItem extends HTMLElement {
    static get observedAttributes() {
        return ['id',
                'title', 
                'body', 
                'createdAt', 
                'archived'
            ];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._id = '';
        this._title = '';
        this._body = '';
        this._createdAt = '';
        this._archived = false;
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[`_${name}`] = newValue;
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .notes {
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 5px;
                }
                .title h2 {
                    margin: 0;
                }
            </style>
            <div class="notes">
                <div class="title">
                    <h2>${this._title}</h2>
                </div>
                <div class="body">
                    <p>${this._body}</p>
                </div>
                <button-delete></button-delete>
            </div>
        `;
    }
}

customElements.define("note-item", NoteItem);
