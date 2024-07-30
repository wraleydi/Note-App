class HeaderApp extends HTMLElement {
    constructor() {
        super();
        this._style = document.createElement('style');
        this._style.textContent = `
            header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                background-color: #f8f8f8;
                border-bottom: 1px solid #ddd;
            }
            .title h1 {
                margin: 0;
                font-size: 24px;
            }
            .profile-img img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        `;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.emptyContent();
        this.appendChild(this._style);

        this.innerHTML += `
            <header>
                <div class="title">
                    <h1>My Note</h1>
                </div>
                <div class="profile-img">
                    <img src="path/to/profile-image.jpg" alt="Profile Image" />
                </div>
            </header>
        `;
    }

    emptyContent() {
        this.innerHTML = '';
    }
}

customElements.define('header-app', HeaderApp);
