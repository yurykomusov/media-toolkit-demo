import * as _ from './utils.js';

export default class ItemsDataProvider {
    constructor(jsonData) {
        this._defaultGrouping = 'by discipline';
        this._data = jsonData;
        this._filterConfig = {
            "discipline": (filterValue) => (item) => item.discipline.toUpperCase() == filterValue.toUpperCase(),
            "ageGroup": (filterValue) => (item) => item.ageRange.toUpperCase() == filterValue.toUpperCase(),
            "theme": (filterValue) => (item) => item.themes.toUpperCase() == filterValue.toUpperCase()
        }
        this._filtersToApply = [];
        this._groupingToApply = (data) => ({ "": data });
        this._expandBy = [];
    }

    applyFilter(filterName, filterValue) {
        if (!filterValue || filterValue == '')
            return this;

        let filterFunc = this._filterConfig[filterName];

        if (!filterFunc)
            throw Error(`Could not find appropriate filter for ${filterName}`);

        this._filtersToApply.push(filterFunc(filterValue));

        return this;
    }

    applyGroupingAndSort(groupBy) {
        let groupingFunc;

        if (groupBy == 'by discipline') {
            groupingFunc = (data) => _.groupBy(data, item => item.discipline);
        }

        if (groupBy == 'by age') {
            groupingFunc = (data) => _.groupBy(data, item => item.ageRange);
        }

        if (groupBy == 'by theme') {
            groupingFunc = (data) => _.groupBy(data, item => item.themes);
        }

        if (groupBy == 'newest') {
            groupingFunc = (data) => {
                data.sort((item1, item2) => item1.date.localeCompare(item2.date));

                return _.groupBy(data, () => 'From Newest To Oldest');
            }
        }

        if (groupBy == 'oldest') {
            groupingFunc = (data) => {
                data.sort((item1, item2) => item2.date.localeCompare(item1.date));
                return _.groupBy(data, () => 'From Oldest To Newest');
            }
        }

        // this transformation allow to filter by array-properties like theme
        let expandedByThemeFunc = (data) => data.reduce((prev, next) => [...prev, ...next.themes.map(t => ({...next, themes: t }))], []);

        this._groupingToApply = (data) => groupingFunc(expandedByThemeFunc(data)); // I am doing something crazy!

        return this;
    }

    executeQuery() {
        // group by 
        // apply filters
        // remove empty sections

        let grouped = this._groupingToApply(this._data);
        let aggregatedFilter = (data) => this._filtersToApply.reduce((accumulator, singleFilter) => accumulator.filter(singleFilter), data);

        return Object.entries(grouped)
            .map(([key, items]) => ([key, aggregatedFilter(items)]))
            .filter(([key, items]) => items.length > 0)
            .reduce((accumulator, [key, items]) => ({ ...accumulator, [key]: items }), {})
            
    }
}