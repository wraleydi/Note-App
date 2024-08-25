class CustomFooter extends HTMLElement {
  static observedAttributes = ['text']

  constructor() {
    super()
    this['_text'] = this.getAttribute('text')
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
        <div class="my-footer">
            <footer>${this['_text']}</footer>
        </div>
        `
  }
}

customElements.define('custom-footer', CustomFooter)
