import ItemsDataProvider from './ItemsDataProvider.js';

class IndexModule {  
    constructor() {
        
        let $elementary = document.querySelector('#elementary');
        let $primary = document.querySelector('#primary');
        let $adults = document.querySelector('#adults');

        $elementary.addEventListener('click', () => window.location = `items.html?ageGroup=elementary`);
        $primary.addEventListener('click', () => window.location = `items.html?ageGroup=primary`);
        $adults.addEventListener('click', () => window.location = `items.html?ageGroup=adults`);

        document.querySelector('#biology').addEventListener('click', () => window.location = 'items.html?discipline=biology')
        document.querySelector('#manandtheworld').addEventListener('click', () => window.location = 'items.html?discipline=manandtheworld')
        document.querySelector('#educational').addEventListener('click', () => window.location = 'items.html?discipline=educational')
        document.querySelector('#arts').addEventListener('click', () => window.location = 'items.html?discipline=arts')

        document.querySelector('#accessAndTrustToSources').addEventListener('click', () => window.location='items.html?theme=ads')
        document.querySelector('#mediaAnalysis').addEventListener('click', () => window.location='items.html?theme=media consumering')
        document.querySelector('#mediaAssessment').addEventListener('click', () => window.location = 'items.html?theme=facts and opinions')
        document.querySelector('#createAndUseMedia').addEventListener('click', () => window.location = 'items.html?theme=fact checking')
    }

    onDataLoaded(data) {
        this._items = data['items'];

        let itemsDataProvider = new ItemsDataProvider(this._items);
        
        let $recentContainer = document.querySelector('#recent');
        

        recentItems
            .map(this.createPad)
            .slice(0, 4)
            .forEach(element => $recentContainer.appendChild(element));
        
        let $popularContainer = document.querySelector('#popular');
        let popularItemsGrouped = itemsDataProvider.applyGroupingAndSort('popular').executeQuery();
        let popularItems = popularItemsGrouped[Object.keys(popularItemsGrouped)[0]];

        popularItems
            .map(this.createPad)
            .slice(0, 4)
            .forEach(element => $popularContainer.appendChild(element));
    }

    createPad(item) {        
        let $pad = document.createElement('custom-pad');
        $pad.dataset.title = item.discipline;
        $pad.dataset.description = item.title;
        $pad.classList.add('three');
        $pad.classList.add('columns');
        $pad.addEventListener('click', () => window.location = 'details.html');

        return $pad;
    }
}

const indexController = new IndexModule();

fetch('data/exercises.json')
    .then((response) => response.json())
    .then((json) => indexController.onDataLoaded(json));