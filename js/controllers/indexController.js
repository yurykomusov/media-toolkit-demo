import ItemsDataProvider from '../services/ItemsDataProvider.js';

export default function getIndexModel(exercises, disciplines) {
    let itemsDataProvider = new ItemsDataProvider(exercises);

    const getRecent = () => {
        let recentItemsGrouped = itemsDataProvider.applyGroupingAndSort('newest').executeQuery();
        let recentItems = recentItemsGrouped[Object.keys(recentItemsGrouped)[0]];
        return recentItems;
    }

    const getPopular = () => {
        let popularItemsGrouped = itemsDataProvider.applyGroupingAndSort('popular').executeQuery();
        let popularItems = popularItemsGrouped[Object.keys(popularItemsGrouped)[0]];
        return popularItems;
    }

    const getDisciplines = () => disciplines.map(discipline => ({
        key: discipline.key,
        name: discipline.text,
        url: `/exercise-list/?discipline=${discipline.key}`
    }))

    return {
        recent: getRecent(),
        popular: getPopular(),
        disciplines: getDisciplines(),
        ageGroups: [
            { name: "Дзеці", url: "/exercises?ageGroup=elementary"},
            { name: "Падлеткі", url: "/exercises?ageGroup=primary"},
            { name: "Дарослыя", url: "/exercises?ageGroup=adults"}
        ],
        mediaCompetences: [
            { name: "Доступ і надзейнасць", url: "/exercises?theme=ads" },
            { name: "Аналіз медыя", url: "/exercises?theme=media%20consumering" },
            { name: "Ацэнка медыя", url: "/exercises?theme=facts%20and%20opinions" },
            { name: "Стварэнне і карыстанне медыя-прасторай", url: "/exercises?theme=fact%20checking" }
        ]
    }    
}