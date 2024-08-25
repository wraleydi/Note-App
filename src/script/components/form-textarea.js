class FormTextarea extends HTMLElement {
  static observedAttributes = ['input-name', 'label', 'min', 'placeholder']
  constructor() {
    super()
    this['_input-name'] = this.getAttribute('input-name')
    this['_label'] = this.getAttribute('label')
    this['_min'] = this.getAttribute('min')
    this['_placeholder'] = this.getAttribute('placeholder')
  }

  connectedCallback() {
    this.render()

    this.validationHandler()
  }

  render() {
    this.innerHTML = `
        <div class="form-group">
            <label for="${this['_input-name']}"><h2>${this['_label']}</h2></label>
            <textarea 
            id="${this['_input-name']}" 
            placeholder="${this['_placeholder']}" 
            minlength="${this['_min']}"
            required
            ></textarea>
            <small class="error-message-textarea" style="display:none;"></small>
        </div>
        `
  }

  validationHandler() {
    const textAreaElement = this.querySelector('textarea')
    const errorMessage = this.querySelector('.error-message-textarea')

    const customValidate = () => {
      textAreaElement.setCustomValidity('')

      if (textAreaElement.validity.valueMissing) {
        textAreaElement.setCustomValidity('*Harap isi catatan')
      } else if (textAreaElement.validity.tooShort) {
        textAreaElement.setCustomValidity(
          `*Minimal panjang ${this['_min']} karakter`
        )
      }

      errorMessage.textContent = textAreaElement.validationMessage
      errorMessage.style.display = textAreaElement.validationMessage
        ? 'block'
        : 'none'
    }

    textAreaElement.addEventListener('input', customValidate)
    textAreaElement.addEventListener('blur', customValidate)
  }
}

customElements.define('form-textarea', FormTextarea)
