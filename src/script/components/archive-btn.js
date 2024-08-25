class ArchiveButton extends HTMLElement {
    constructor() {
        super();
        this._id = this.getAttribute('id')
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <button id="btn-archive">Archive</button>
        `
    }
}

customElements.define('button-archive', ArchiveButton)