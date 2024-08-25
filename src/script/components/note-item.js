class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ['id', 'title', 'body', 'createdAt', 'archived']
  }

  constructor() {
    super()
    this._id = ''
    this._title = ''
    this._body = ''
    this._createdAt = ''
    this._archived = false
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[`_${name}`] = newValue
      this.render()
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
                <div class="btn-note">
                <button-delete id="${this.id}"></button-delete>
                <button-archive id="${this.id}"></button-archive>
                </div>
            </div>
        `
  }
}

customElements.define('note-item', NoteItem)
