import ItemsDataProvider from '../ItemsDataProvider.js';

function getSearchResults() {
    return null; // todo
}

function getFilters(json) {
    return {
        disciplineFilter: {
            items: json['all-disciplines']
        },
        ageGroupFilter: {
            items: json['all-age-groups']
        },
        themeFilter: {
            items: json['all-themes']
        },
        groupByFilter: {
            items: [
                { key: "newest", text: "Новыя"},
                { key: "oldest", text: "Старыя"},
                { key: "by discipline", text: "Па прадметах"},
                { key: "by theme", text: "Па тэмах"},
                { key: "by age", text: "Па мэтавай групе"},
            ]
        },
        actions: {
            onToggleFilters: (e) => e.target.classList.toggle('hidden'),
            onFilterClick: (e) => console.log(`clicked event: ${e}`)
        }
    }
}

export default function getExcercisesModel(json) {
    return {
        filters: getFilters(json),
        getSearchResults: getSearchResults()
    }
}