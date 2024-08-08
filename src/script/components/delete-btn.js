class ButtonDelete extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
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
        <button>Delete</button>
        `;
    }
}

customElements.define('button-delete', ButtonDelete);
