import * as _ from './utils.js';

class SingleFilterModule {
    constructor(element) {
        let self = this;
        this.$element = element;
        this._selectedValue = null;
        this.$selected = null;
        this._onChange = null;

        this.$element.addEventListener('click', function (event) {
            if (event.target.tagName !== 'A') return;

            let from = null;
            let to = null;
            
            if (self.$selected && self.$selected !== null) {
                self.$selected.classList.remove('selected');
                from = self.$selected.innerText;
            }
                

            event.target.classList.add('selected');
            self.$selected = event.target;
            
            to = self.$selected.innerText;

            if (self._onChange !== null) 
                self._onChange(from, to);

        });
    }
    set onChange(value) {
        this._onChange = value;
    }

    get selectedValue() {
        return this.$selected.innerText;
    }
}

class ItemsModule {
    constructor() {
        this._showFilter = false;
        this._data = [];

        this.$filterBox = document.querySelector('#filter-box');
        this.$trigger = document.querySelector('#filter-toggle');
        
        this.$filterDisciplines = document.querySelector('#disciplines');        
        this.$filterAgeGroups = document.querySelector('#age-groups');
        this.$filterThemes = document.querySelector('#themes');
        this.$filterGroupBy = document.querySelector('#group-by');
        this.$searchResults = document.querySelector('#items-search-results');

        this.$trigger.addEventListener('click', () => this.showFilter = !this.showFilter);

        let disciplineFilter = new SingleFilterModule(this.$filterDisciplines);
        let ageGroupFilter = new SingleFilterModule(this.$filterAgeGroups);
        let themeFilter = new SingleFilterModule(this.$filterThemes);
        let groupByFilter = new SingleFilterModule(this.$filterGroupBy);
        
        disciplineFilter.onChange = (from, to) => this.onFilterChange('discipline', to);
        themeFilter.onChange = (from, to) => this.onFilterChange('theme', to);
        ageGroupFilter.onChange = (from, to) => this.onFilterChange('ageGroup', to);
        groupByFilter.onChange = (from, to) => this.onFilterChange('groupBy', to);
    }

    bindFilter($container, items) {
        $container.innerHTML = items.map((item) => `<li><a>${item}<a></li>`)
            .reduce((item1, item2) => item1.concat(item2));
    }

    bindItemsSection($container, items, title) {
        let $title = document.createElement('h4');
        $title.classList.add('section-title');
        $title.innerText = title;

        $container.appendChild($title);

        _.chunk(items, 4).map(chnk => {
            let $row = document.createElement('div');
            $row.classList.add('row');

            chnk.map((item) => {
                let $pad = document.createElement('custom-pad');
                $pad.dataset.title = item.title;
                $pad.dataset.description = item.description;
                $pad.classList.add('three');
                $pad.classList.add('columns');
    
                $row.appendChild($pad);                
            });
            
            $container.appendChild($row);
        })
    }

    get showFilter() {
        return this._showFilter;        
    }

    set showFilter(value) {
        if (this._showFilter === value) return;

        this._showFilter = value;

        if (value === false)
            this.$filterBox.setAttribute('style', 'display: none');
        else 
            this.$filterBox.setAttribute('style', 'display: block');
    }

    onLoad(data) {
        this._items = data['items'];
        this.bindFilter(this.$filterDisciplines, data['all-disciplines']); 
        this.bindFilter(this.$filterAgeGroups, data['all-age-groups']); 
        this.bindFilter(this.$filterThemes, data['all-themes']); 
        this.bindFilter(this.$filterGroupBy, ['newest', 'oldest', 'by discipline', 'by theme', 'by age']);

        this.bindItemsSection(this.$searchResults, data['items'], 'Physics');
        this.bindItemsSection(this.$searchResults, data['items'], 'Physics 2');
        this.bindItemsSection(this.$searchResults, data['items'], 'Physics 3');
    }

    onFilterChange(name, value) {
        let searchResults = null;
        
        if (name === 'groupBy' && value == 'by discipline') {
            searchResults = _.groupBy(this._items, item => item.discipline);
        }

        if (name === 'groupBy' && value == 'by age') {
            searchResults = _.groupBy(this._items, item => item.ageRange)
        }

        if (name == 'groupBy' && value == 'by theme') {
            
            let expandedByTheme = this._items
                .reduce((prev, next) => [...prev, ...next.themes.map(t => { return { ...next, themes: t}})], [])

            searchResults = _.groupBy(expandedByTheme, item => item.themes);
        }

        if (name == 'groupBy' && value == 'newest') {
            this._items.sort((item1, item2) => item1.date.localeCompare(item2.date));

            searchResults = _.groupBy(this._items, item => 'By Date');
        }
        
        if (name == 'groupBy' && value == 'oldest') {
            this._items.sort((item1, item2) => item2.date.localeCompare(item1.date));

            searchResults = _.groupBy(this._items, item => 'By Date');
        }

        this.$searchResults.innerHTML = '';

        Object.keys(searchResults).map(groupName => 
            this.bindItemsSection(this.$searchResults, searchResults[groupName], groupName))
    }

    
}

const itemsController = new ItemsModule();

fetch('data/fixtures.json')
    .then((response) => response.json())
    .then((json) => itemsController.onLoad(json));

