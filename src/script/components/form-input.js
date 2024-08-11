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
        <div class="form-group">
            <label for="${this['_input-name']}"><h2>${this['_label']}</h2></label>
            <input 
                type="text" 
                id="${this['_input-name']}" 
                placeholder="${this['_placeholder']}" 
                minlength="${this['_min']}"
                required
            />
        </div>
        `;
    }
}

customElements.define('form-input', FormInput);