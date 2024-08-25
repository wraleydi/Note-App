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
        this.innerHTML = `
            <div class="notes" id="notes">
                <div class="title">
                    <h2>${this._title}</h2>
                </div>
                <div class="body">
                    <p>${this._body}</p>
                </div>
                <button-delete id="${this.id}"></button-delete>
            </div>
        `;
    }
}

customElements.define("note-item", NoteItem);
