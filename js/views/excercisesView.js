export default function exercisesView(model) {
    let renderFilter = (filter) => `
        <ul id=${filter.id}>
            ${filter.items.map(li => `<li>${li.text}</li>`).join('')}
        <ul>`;

    let renderSearchResults = (searchResults) => `Not done yet!`; 

    return `
    <div class="container">
        <h2 id="exercise">Практыкаванні - </h2>
        <button ${model.filerToggleId}>Фільтры</button>
        <div id=${model.filterBoxId} class="row hidden">
            <div class="three columns">
                <label>Прадметы</label>                
               ${renderFilter(model.filters.disciplineFilter)}
            </div>
            <div class="three columns">
                <label>Мэтавыя групы</label>
                
                ${renderFilter(model.filters.ageGroupFilter)}
            </div>
            <div class="three columns">
                <label>Тэмы</label>                
                ${renderFilter(model.filters.themeFilter)}
            </div>
            <div class="three columns">
                <label>Згрупаваць па</label>
                
                ${renderFilter(model.filters.groupByFilter)}
            </div>
        </div>

        <div id="items-search-results">
            ${renderSearchResults()}
        </div>
    </div>`;

    return document.createElement('div')
}