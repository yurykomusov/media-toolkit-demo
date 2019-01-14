import * as _ from './utils.js';

export default class ItemsDataProvider {
    constructor(jsonData) {
        this._defaultGrouping = 'by discipline';
        this._data = jsonData;
        this._filterConfig = {
            "discipline": (filterValue) => (item) => item.discipline == filterValue,
            "ageGroup": (filterValue) => (item) => item.ageRange == filterValue,
            "theme": (filterValue) => (item) => item.themes.indexOf(filterValue) >= 0
        }
    }

    applyFilter(filterName, filterValue) {
        if (!filterValue || filterValue == '') return new ItemsDataProvider(this._data);

        let filterFunc = this._filterConfig[filterName];

        if (!filterFunc) 
            throw Error(`Could not find appropriate filter for ${filterName}`);

        return new ItemsDataProvider(this._data.filter(filterFunc(filterValue)));
    }

    applyGroupingAndSort(groupBy) {

        if (!groupBy || groupBy === '') return { default: this._data };

        if (groupBy == 'by discipline') {
            return _.groupBy(this._data, item => item.discipline);
        }

        if (groupBy == 'by age') {
            return _.groupBy(this._data, item => item.ageRange)
        }

        if (groupBy == 'by theme') {
            let expandedByTheme = this._data
                .reduce((prev, next) => [...prev, ...next.themes.map(t => { return { ...next, themes: t}})], [])

            return _.groupBy(expandedByTheme, item => item.themes);
        }

        if (groupBy == 'newest') {
            this._data.sort((item1, item2) => item1.date.localeCompare(item2.date));

            return _.groupBy(this._data, () => 'From Newest To Oldest');
        }
        
        if (groupBy == 'oldest') {
            this._data.sort((item1, item2) => item2.date.localeCompare(item1.date));

            return _.groupBy(this._data, () => 'From Oldest To Newest');
        }
    }

    // valueOf() {
    //     this._data;
    // }
}