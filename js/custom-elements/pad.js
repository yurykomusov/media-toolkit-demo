class CustomPad extends HTMLElement {

    constructor() {
        super();
    }

    get description() {
        return this.dataset.description;
    }

    set description(value) {
        this.dataset.description = value;
    }

    get title() {
        return this.dataset.title;
    }

    set title(value) {
        this.dataset.title = value;
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

        this.style.display = 'block';
    }    

    // static get observedAttributes() {
    //     return ['data-title', 'data-description'];
    // }

    // attributeChagedCallback(name, oldValue, newValue) {
    //     if (name == 'data-title');
        
    // }
}

window.customElements.define("custom-pad", CustomPad);