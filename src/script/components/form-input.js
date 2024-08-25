class FormInput extends HTMLElement {
  static observedAttributes = ['input-name', 'label', 'min', 'placeholder']

  constructor() {
    super()
    this['_input-name'] = this.getAttribute('input-name') || ''
    this['_label'] = this.getAttribute('label') || ''
    this['_min'] = parseInt(this.getAttribute('min'), 10) || 0
    this['_placeholder'] = this.getAttribute('placeholder') || ''
  }

  connectedCallback() {
    this.render()
    this.validationHandler()
  }

  render() {
    this.innerHTML = `
        <div class="form-group">
            <label for="${this['_input-name']}"><h2>${this['_label']}</h2></label>
            <input 
                type="text" 
                id="${this['_input-name']}" 
                placeholder="${this['_placeholder']}" 
                minlength="${this['_min']}"
                required
            />
            <small class="error-message-input" style="display:none;"></small>
        </div>
        `
  }

  validationHandler() {
    const form = document.querySelector('form')
    const inputElement = form.elements.title
    const errorMessage = this.querySelector('.error-message-input')

    const customValidate = (event) => {
      const element = event.target

      element.setCustomValidity('')

      if (element.validity.valueMissing) {
        element.setCustomValidity('*Harap isi judul')
      } else if (element.validity.tooShort) {
        element.setCustomValidity(`*Minimal panjang ${this['_min']} karakter`)
      }

      errorMessage.textContent = element.validationMessage
      errorMessage.style.display = element.validationMessage ? 'block' : 'none'
    }

    inputElement.addEventListener('input', customValidate)
    inputElement.addEventListener('blur', customValidate)
  }
}

customElements.define('form-input', FormInput)
