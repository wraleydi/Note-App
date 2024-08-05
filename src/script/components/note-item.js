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

const colors = ['#dabbfa', '#d7f8f2', '#fff6e2', '#f8d7d7'];

    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    document.addEventListener('DOMContentLoaded', (event) => {
        const noteItems = document.querySelectorAll('note-item');

        noteItems.forEach((item) => {
            item.querySelector('.notes').style.backgroundColor = getRandomColor();
        });
    });

customElements.define("note-item", NoteItem);
