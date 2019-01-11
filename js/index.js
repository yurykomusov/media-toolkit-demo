class IndexModule {  
    constructor() {
        let popularContainer = document.getElementById("popular");                
        let popularItems = this.getPopular();

        let recentContainer = document.getElementById("recent");
        let recentItems = this.getRecent();

        popularItems.map((item) => this.createPad(item.discipline, item.theme)).forEach((pad) => popularContainer.appendChild(pad));
        
        recentItems.map((item) => this.createPad(item.discipline, item.theme)).forEach((pad) => recentContainer.appendChild(pad));
    }

    createPad(discipline, theme) {
        let element = document.createElement('custom-pad');
        element.classList.add('pad');
        element.classList.add('three', discipline);
        element.classList.add('columns', discipline);
        element.setAttribute('data-title', discipline);
        element.setAttribute('data-description', theme);        
        
        return element;
    }

    getPopular() {
        return [
            {"discipline": "Math", "theme": "Trigonometry"},
            {"discipline": "Math", "theme": "Trigonometry"},
            {"discipline": "Math", "theme": "Trigonometry"},
            {"discipline": "Math", "theme": "Trigonometry"},
        ];
    }    

    getRecent() {
        return [
            {"discipline": "Astronomy", "theme": "Lorem"},
            {"discipline": "Biology", "theme": "Ipsum"},
            {"discipline": "Extra-class", "theme": "Trigonometry"},
            {"discipline": "Something-Else", "theme": "Trigonometry"}];
    }
}

new IndexModule();