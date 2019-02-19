import Router from './custom-elements/router.js'
import Spinner from './custom-elements/spinner.js'

import indexView from './views/indexView.js'
import excercisesView from './views/excercisesView.js'

import getIndexModel from './controllers/indexController.js'
import getExcercisesModel from './controllers/excercisesController.js';

class App {
    constructor($container) {
        this.$container = $container;
        this.$root = document.createElement('div');
        this.$root.innerHTML = `<simple-router><custom-spinner/></simple-router>`;        
        this.$router = this.$root.querySelector('simple-router');
        
        fetch('data/exercises.json')
            .then((response) => response.json())
            .then((json) => {
                setTimeout(() => this.$router.goTo('default'), 1000); // todo: remove timeout
                
                let indexModel = getIndexModel(json);        
                let excercisesModel = getExcercisesModel(json);

                this.$router.mapRoute('default', indexView(indexModel));
                this.$router.mapRoute('/', indexView(indexModel));
                this.$router.mapRoute('/exercises', excercisesView(excercisesModel));
                this.$router.mapRoute('/details', `<div>You gonna see some details here!</div>`);        
            })

        let refreshNavigation = () => {
            Array.from(this.$root.querySelectorAll('[data-route]') || []).forEach($el => this.$router.addNavigation($el));
            Array.from(this.$root.querySelectorAll('a') || []).forEach($el => this.$router.addNavigation($el));
        }
        
        refreshNavigation();

        this.$router.addEventListener('navigationOccured', refreshNavigation);
    }

    render() {        
        this.$container.appendChild(this.$root);
    }
}

let app = new App(document.querySelector('#app'));

app.render();