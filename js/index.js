class IndexModule {  
    constructor() {
        
        let $elementary = document.querySelector('#elementary');
        let $primary = document.querySelector('#primary');
        let $adults = document.querySelector('#adults');

        $elementary.addEventListener('click', () => window.location = `items.html?ageGroup=elementary`);
        $primary.addEventListener('click', () => window.location = `items.html?ageGroup=primary`);
        $adults.addEventListener('click', () => window.location = `items.html?ageGroup=adults`);

        document.querySelector('#biology').addEventListener('click', () => window.location = 'items.html?discipline=biology')
        document.querySelector('#geography').addEventListener('click', () => window.location = 'items.html?discipline=geography')
        document.querySelector('#history').addEventListener('click', () => window.location = 'items.html?discipline=history')
        document.querySelector('#foreignLanguage').addEventListener('click', () => window.location = 'items.html?discipline=foreignlanguages')

        document.querySelector('#accessAndTrustToSources').addEventListener('click', () => window.location='items.html?theme=ads')
        document.querySelector('#mediaAnalysis').addEventListener('click', () => window.location='items.html?theme=media consumering')
        document.querySelector('#mediaAssessment').addEventListener('click', () => window.location = 'items.html?theme=facts and opinions')
        document.querySelector('#createAndUseMedia').addEventListener('click', () => window.location = 'items.html?theme=fact checking')
    }
}

new IndexModule();