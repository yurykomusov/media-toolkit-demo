function convertDate(epoch) {
    return epoch;
}

function extractTextFromHtmlString(raw) {
    
}

export default class DataStore {
    constructor(useCms) {
        this._useCms = useCms;

        this._exerciseUrlLocal = '/exercises.json';
        this._exerciseUrlAzure = 'https://yurykgeneral.blob.core.windows.net/aspnet-blob/exercises.json';
        this._exerciseUrlCms = 'http://www.nastaunik.info/node.json?type=toolkit_item&page=0';        
        this._metadataUrl = '/exercises.json';
       
        this._convertFromCms = (json) =>
            json.list.map((cmsExercise) => ({
                id: cmsExercise.nid,        
                date: convertDate(cmsExercise.created),        
                firstName: cmsExercise.field_author,
                lastName: null,        
                discipline: null,        
                discipline_id: cmsExercise.field_discipline,
                ageRange: cmsExercise.field_age_group,        
                title: cmsExercise.title,        
                requirements: "(TODO)",        
                length: cmsExercise.field_length,        
                methods: [],
                themes: [],
                summary: cmsExercise.body.summary,
                text: cmsExercise.body.value,
                tips: null,
                links: []
            }));

        this._fetchExerciseFromCms = function() {
            return fetch(this._exerciseUrlCms                )
                .then(response => response.json())
                .then(json => this._convertFromCms(json))
        };
    
        this._fetchExercisesFromFile = function() {
            return fetch(this._exerciseUrlLocal)
                .then(response => response.json())
                .then(json => json['items'])
        };
    }

    getExercises() {
        if (this._useCms === true) {
            return this._fetchExerciseFromCms();
        } else {
            return this._fetchExercisesFromFile();
        }
    }

    getDisciplines() {
        return fetch(this._metadataUrl)
            .then((response) => response.json())
            .then(json => json['all-disciplines'])
        
    }

    getCompetences() {
        return fetch(this._metadataUrl)
            .then((response) => response.json())
            .then(json => json['all-comptences'])
    }

    getAgeGroups() {
        return fetch(this._metadataUrl)
            .then((response) => response.json())
            .then(json => json['all-age-groups'])
    }

    getThemes() {
        return fetch(this._metadataUrl)
            .then((response) => response.json())
            .then(json => json['all-themes'])
    }
}
