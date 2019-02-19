export default function index(model) {
    let renderExercise = (item) => 
    `<a style="display: block;" class="three columns" href="${item.url}">
        <custom-pad data-title="${item.discipline}" data-description="${item.title}"></custom-pad>
    </a>`;
    
    let renderSectionItem = (sectionItem, columnsPerItem) => 
    `<a href="${sectionItem.url}" class="${columnsPerItem} columns">
        <custom-pad data-title="${sectionItem.name}" data-route="${sectionItem.url}"></custom-pad>
    </a>`;    
    
    return `
        <h1>
            Nastaunik.info - media education. Toolkit
        </h1>
        <h4 class="section-title">Папулярныя</h4>
        <div id="popular" class="row">
            ${model.popular.map((item) => renderExercise(item)).join('')}
        </div>
        
        <h4 class="section-title">Новыя</h4>
        <div id="recent" class="row">
            ${model.recent.map((item) => renderExercise(item)).join('')}
        </div>
        
        <div class="row section-title">
            <div class="ten columns">
                <h4>Мэтавая група</h4>
            </div>
            <div class="two columns">
                <button>паказаць усе</button>
            </div>
        </div>        
        <div id="age" class="row">
            ${model.ageGroups.map(item => renderSectionItem(item, 'four')).join('')}
        </div>

        <!-- Disciplines-->
        <div class="row section-title">
            <div class="ten columns">
                <h4>
                    Прадмет
                </h4>
            </div>
            <div class="two columns">
                <button>паказаць усе</button>
            </div>
        </div>

        <div class="row">
            ${model.disciplines.map(item => renderSectionItem(item, 'three')).join('')}
        </div>

        <div class="row section-title">
            <div class="ten columns">
                <h4>
                    Медыя кампетэнцыя
                </h4>
            </div>
            <div class="two columns">
                <button>паказаць усе</button>
            </div>
        </div>

        <div class="row">
            ${model.competentions.map(item => renderSectionItem(item, 'three')).join('')}
        </div>
        <a href="/exercises" class="btn btn-primary">click me</a>
        `;
}