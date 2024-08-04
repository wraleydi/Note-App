class FormInput extends HTMLElement {
    static observedAttributes = [
        'input-name',
        'label',
        'min',
        'placeholder',
    ];
    constructor() {
        super();
        this['_input-name'] = this.getAttribute('input-name');
        this['_label'] = this.getAttribute('label');
        this['_min'] = this.getAttribute('min');
        this['_placeholder'] = this.getAttribute('placeholder');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <label for="${this['_input-name']}">${this['_label']}</label>
            <input 
            type="text" 
            id="${this['_input-name']}" 
            placeholder="${this['_placeholder']}" 
            minlength="${this['_min']}"
            required
            />
        `;
    }
}

customElements.define('form-input', FormInput);