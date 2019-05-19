import * as _ from '../utils.js';

export default class ItemsDataProvider {
    constructor(jsonData) {
        this._defaultGrouping = 'by discipline';
        this._data = jsonData;
        this._filterConfig = {
            "discipline": (filterValue) => (item) => item.discipline_id.toUpperCase() == filterValue.toUpperCase(),
            "ageGroup": (filterValue) => (item) => item.ageRange.toUpperCase() == filterValue.toUpperCase(),
            "theme": (filterValue) => (item) => item.themes.toUpperCase() == filterValue.toUpperCase(),
            "competence": (filterValue) => (item) => item.competence.toUpperCase() == filterValue.toUpperCase()
        }
        this._filtersToApply = [];
        this._groupingToApply = (data) => ({ "": data });
        this._expandBy = [];

        this._needExpand = false; // need to search by multi-choice fields like theme
    }

    newQuery() {
        this._filtersToApply = [];
        this._groupingToApply = (data) => ({ "": data });
        this._expandBy = [];
        this._needExpand = false;

        return this;
    }

    applyFilter(filterName, filterValue) {
        if (!filterValue || filterValue == '')
            return this;

        let filterFunc = this._filterConfig[filterName];

        if (!filterFunc)
            throw Error(`Could not find appropriate filter for ${filterName}`);

        this._filtersToApply.push(filterFunc(filterValue));

        if (filterName === 'theme') {
            this._needExpand = true;
        }

        return this;
    }

    applyGroupingAndSort(groupBy) {
        let groupingFunc = (data) => data;

        if (groupBy == 'by discipline') {
            groupingFunc = (data) => _.groupBy(data, item => item.discipline_id);
        }

        if (groupBy == 'by age') {
            groupingFunc = (data) => _.groupBy(data, item => item.ageRange);
        }

        if (groupBy == 'by theme') {
            this._needExpand = true;
            groupingFunc = (data) => _.groupBy(data, item => item.themes);
        }

        if (groupBy == 'newest') {
            groupingFunc = (data) => {
                let sorted = data.slice().sort((item1, item2) => item1.date.localeCompare(item2.date));

                return _.groupBy(sorted, () => 'From Newest To Oldest');
            }
        }

        if (groupBy == 'oldest') {
            groupingFunc = (data) => {
                let sorted = data.slice().sort((item1, item2) => item2.date.localeCompare(item1.date));
                return _.groupBy(sorted, () => 'From Oldest To Newest');
            }
        }

        if (groupBy == 'popular') {
            groupingFunc = (data) => {
                let sorted = data.slice().sort((item1, item2) => (item1.popular || false) - (item2.popular || false));
                return _.groupBy(sorted, () => 'From Oldest To Newest');
            }
        }

        // this transformation allow to filter by array-properties like theme
        const expandedByThemeFunc = this._needExpand
            ? (data) => data.reduce((prev, next) => [...prev, ...next.themes.map(t => ({...next, themes: t }))], [])
            : (data) => data;

        this._groupingToApply = (data) => groupingFunc(expandedByThemeFunc(data)); // I am doing something crazy!

        return this;
    }

    executeQuery() {
        // group by 
        // apply filters
        // remove empty sections

        let grouped = this._groupingToApply(this._data);
        let aggregatedFilter = (data) => 
            this._filtersToApply.reduce(
                (accumulator, singleFilter) => accumulator.filter(singleFilter), 
                data);

        return Object.entries(grouped)
            .map(([key, items]) => ([key, aggregatedFilter(items)]))
            .filter(([key, items]) => items.length > 0) // show only sections with elements
            .reduce((accumulator, [key, items]) => ({...accumulator, [key]: items }), {})
    }

}