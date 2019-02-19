export default class Router extends HTMLElement {
    constructor() {
        super();

        this.routes = {            
            default: `<div>No view was found. Try again later</div>`
        }

        this.event = new Event("navigationOccured", {"bubbles": false, "cancelable": false});

        window.onpopstate = () => {
            this.innerHTML = this.findRoute(window.location.pathname);
            this.dispatchEvent(this.event);
        }
    }

    onConnectedCallback() {
        this.routes = {            
            default: `<div>No view was found. Try again later</div>`
        }         
    }

    findRoute(path) {
        let queryParamStartsAt = path.indexOf('?');        
        if (queryParamStartsAt >= 0)
            path = path.slice(0, queryParamStartsAt); // remove query string param

        return this.routes[path] || this.routes.default;
    }

    mapRoute(path, view) {
        this.routes[path] = view;
    }

    goTo(path) {   
        this.innerHTML = this.findRoute(path);
        this.dispatchEvent(this.event);
    }

    addNavigation($element) {
        $element.addEventListener('click', (e) => {
            e.preventDefault();
            let pathName = e.currentTarget.pathname;

            if (!pathName) 
                return; // skip clicking not on anchor
            
            this.goTo(pathName);

            window.history.pushState(
                {}, 
                pathName,
                window.location.origin + pathName
              );
        });
    }
}

window.window.customElements.define("simple-router", Router);

// let $router = document.querySelector('#router');

// $router.mapRoute('/java', 'I like java!')
// $router.mapRoute('/csharp', 'I like c#!')
// $router.mapRoute('/python', 'I like Python!')

// Array.from(document.querySelectorAll('a')).forEach($el => $router.addNavigation($el));



