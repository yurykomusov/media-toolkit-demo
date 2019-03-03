import ItemsDataProvider from '../services/ItemsDataProvider.js';

export default function getIndexModel(json) {
    let itemsDataProvider = new ItemsDataProvider(json['items']);

    let getRecent = () => {
        let recentItemsGrouped = itemsDataProvider.applyGroupingAndSort('newest').executeQuery();
        let recentItems = recentItemsGrouped[Object.keys(recentItemsGrouped)[0]];
        return recentItems;
    }

    let getPopular = () => {
        let popularItemsGrouped = itemsDataProvider.applyGroupingAndSort('popular').executeQuery();
        let popularItems = popularItemsGrouped[Object.keys(popularItemsGrouped)[0]];
        return popularItems;
    }

    return {
        recent: getRecent(),
        popular: getPopular(),
        disciplines: [
            { name: "Біялогія", url: "/exercises?discipline=biology" },
            { name: "Чалавек і Свет", url: "/exercises?discipline=manandtheworld" },
            { name: "Мастацтва", url: "/exercises?discipline=arts" },
            { name: "Выхаваўчы занятак", url: "/exercises?items.html?discipline=educational" },
        ],
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