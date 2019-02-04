import * as _ from './utils.js';
import ItemsDataProvider from './ItemsDataProvider.js';
import { SingleFilterModule } from './SingleFilterModule.js';

class ItemsModule {
    constructor() {
        this._showFilter = false;
        this._data = [];
        this._isDataLoaded = false;
        this._itemsDataProvider = null;        

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

        this._selectedFilters = {}; // { filterName, filterValue}
        this._groupBy = null;

        this.filters = {
            'discipline': disciplineFilter,
            'theme': themeFilter,
            'ageGroup': ageGroupFilter,
            'groupBy': groupByFilter
        }
    }

    bindFilter($container, items) {
        $container.innerHTML = items.map((item) => `<li><a data-key="${item.key}">${item.text}</a></li>`)
            .reduce((item1, item2) => item1.concat(item2));
    }


    bindItem($container, title, description) {
            let $pad = document.createElement('custom-pad');
            $pad.dataset.title = title;
            $pad.dataset.description = description;
            $pad.classList.add('three');
            $pad.classList.add('columns');

            $container.appendChild($pad);
    }

    bindItemsSection($container, items, title) {           
        let $title = document.createElement('h4');
        $title.classList.add('section-title');
        $title.innerText = title;

        $container.appendChild($title);

        _.chunk(items, 4).forEach(chunk => {
            let $row = document.createElement('div');

            $row.addEventListener('click', () => window.location = 'details.html');
            $row.classList.add('row');

            chunk.forEach((item) => this.bindItem($row, item.title, item.description));
            
            $container.appendChild($row);
        })
    }
    
    bindItems($container, itemsGrouped) {
        if (Object.keys(itemsGrouped).length == 0) {
            this.$searchResults.innerHTML = 'Не знойдзена ніводнага практыкавання:( Паспрабуйце пашукаць па іншых крытэрыях'
            return;    
        }

        this.$searchResults.innerHTML = '';

        Object.keys(itemsGrouped).forEach(groupName => this.bindItemsSection($container, itemsGrouped[groupName], this.getGroupTitleByKey(groupName, this.filters['groupBy'].selectedValue)))
    }

    getGroupTitleByKey(key, groupBy) {
        if (groupBy === 'newest') 
            return 'З ранніх';
        if (groupBy === 'oldest') 
            return 'З апошніх';
        if (groupBy === 'by discipline')
            return this._allDisciplines.find(i => i.key === key).text
        
        if (groupBy === 'by theme')
            return this._allThemes.find(i => i.key === key).text

        if (groupBy === 'by age')
            return this._allAgeGroups.find(i => i.key === key).text
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

    onDataLoaded(data) {
        this._items = data['items'];
        this._allDisciplines = data['all-disciplines'];
        this._allAgeGroups = data['all-age-groups'];
        this._allThemes = data['all-themes'];

        this.bindFilter(this.$filterDisciplines, this._allDisciplines); 
        this.bindFilter(this.$filterAgeGroups, this._allAgeGroups); 
        this.bindFilter(this.$filterThemes, this._allThemes); 
        this.bindFilter(this.$filterGroupBy, 
            [
                { key: "newest", text: "Новыя"},
                { key: "oldest", text: "Старыя"},
                { key: "by discipline", text: "Па прадметах"},
                { key: "by theme", text: "Па тэмах"},
                { key: "by age", text: "Па мэтавай групе"},
            ]);

        this._isDataLoaded = true;

        // set default filter
        this.filters['groupBy'].selectedValue = 'by discipline';

        // set links

    }

    onFilterChange(name, value) {
        console.log(`filter ${name} changed to ${value}`);

        if (name == 'groupBy')
            this._groupBy = value;
        else
            this._selectedFilters[name] = value;

        let itemsDataProvider = new ItemsDataProvider(this._items)
    
        let items = Object.entries(this._selectedFilters) // applying filters
            .reduce((accumulator, [filterName, filterValue]) => accumulator.applyFilter(filterName, filterValue), itemsDataProvider)
            .applyGroupingAndSort(this._groupBy)
            .executeQuery();

        this.bindItems(this.$searchResults, items);

        
    }

    onUrlChange(location) {
        let searchParams = new URLSearchParams(location.search);

        if (searchParams.has('ageGroup')) {
            this.filters['ageGroup'].selectedValue = searchParams.get('ageGroup');
            this.filters['groupBy'].selectedValue = 'by discipline'
        }
            
        if (searchParams.has('discipline')) {
            this.filters['discipline'].selectedValue = searchParams.get('discipline');
            this.filters['groupBy'].selectedValue = 'by age'
        }

        if (searchParams.has('theme')) {
            this.filters['theme'].selectedValue = searchParams.get('theme');
            this.filters['groupBy'].selectedValue = 'by discipline';
        }

        // if (searchParams.has('groupBy'))
        //     this.filter['groupBy'].selectedValue = searchParams.get('groupBy');
    }
}

const itemsController = new ItemsModule();

fetch('data/fixtures.json')
    .then((response) => response.json())
    .then((json) => itemsController.onDataLoaded(json));

window.addEventListener('load', () => itemsController.onUrlChange(window.location) )