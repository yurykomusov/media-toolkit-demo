class CustomPad extends HTMLElement {
    constructor(title, description) {
        super();            
    }

    get description() {
        return this.getAttribute('data-description');
    }

    get title() {
        return this.innerText || this.getAttribute('data-title');
    }

    connectedCallback() {
        this.innerHTML = 
        `<div class="pad">
            <div class="image-container ${this.description ? "" : "image-container-full" }">
                <h4>${this.title}</h4>
            </div>
            <div class="pad-description" style="display: ${this.description ? "block" : "none" }">
                ${this.description}
            </div>
        </div>`;
    }
}

window.customElements.define("custom-pad", CustomPad);