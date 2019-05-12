import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Slider from 'react-slick'

import Spinner from './shared-components/spinner.jsx'
import Index from  './screens/index.jsx'
import Navbar from './shared-components/navbar.jsx'
import Exercise from './screens/exercise.jsx'
import ExerciseList from './screens/exerciseList.jsx'

import getIndexModel  from './controllers/indexController.js'

import '../css/index.scss'
import '../css/react-slick-custom.scss'

import DataStore from './services/data/datastore.js'

function withSpinner(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            if (this.props.isLoading)
                return <Spinner></Spinner>
            else 
                return <WrappedComponent {...this.props}></WrappedComponent>
        }
    }
}

const ContentContainer = (props) => <div className="container">{props.children}</div>
const ContentContainerWithSpinner = withSpinner(ContentContainer);

class About extends React.Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1
          };

        return (
        <div>
            <p>MediaToоlkit - гэта скарбонка практыкаванняў для развіцця медыяпісьменнасці. Яе ствараюць настаўнікі, медыяпедагогі, журналісты.</p>
            <p>У скарбонку трапляюць тыя практыкаванні, якія дапамагаюць настаўнікам на прыкладзе медыятэкстаў патлумачыць вучням змест урока, а разам з тым даюць адказ на шмат іншых пытанняў, важных для жыцця ў інфармацыйным грамадстве. Як адрозніць фэйк ад праўды?  Як праверыць надзейнасць крыніц інфармацыі? Ці можна давяраць рэкламе? Чаму адна і тая ж падзея выклікае розную рэакцыю ў людзей? Што рабіць, калі цябе троляць? Як не заблытацца ў сацыяльных сетках і не стаць ахвярай кібербулінгу?</p>
            <p>Спецыяльныя фільтры дазваляюць знайсці практыкаванні для розных прадметаў і ўзросту навучэнцаў. Акрамя таго, адмысловыя тэгі дапамогуць адабраць заданні паводле  скарыстанага метаду, медыякампетэнцыі.</p>
            <p>Аўтары практыкаванняў падабралі цікавыя для дзяцей прыклады, падрыхтавалі іншыя дапаможныя матэрыялы для заняткаў: карысныя спасылкі, публікацыі ў СМІ і метадычныя рэкамендацыі для калег.</p>
            <p>Урокі, класныя і інфармацыйныя гадзіны, выхаваўчыя мерапрыемствы з медыяадукацыйным зместам дапамагаюць развіць крытычнае мысленне і засвоіць практычныя навыкі бяспечнага і адказнага карыстання медыйнай прасторай. </p>
            <p>Дасылайце нам вашыя практыкаванні і прапановы на адрас: nastaunik.info@gmail.com</p>
            <p>Сачыце за навінамі ў нашай суполцы ў Facebook «Медыяадукатар»: <a href="https://www.facebook.com/groups/medyaadukatar/">https://www.facebook.com/groups/medyaadukatar/</a></p>
            <p>Дзякуем за ідэю стварэння тулкіта міжнароднаму праекту Medianavigator.org: <a href="https://medianavigator.org/">https://medianavigator.org/</a></p>
        </div>);
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        if (process.env.NODE_ENV == 'production') {
            this.basename = '/mediatoolkit/';
        } else {
            this.basename = ''
        }

        let self = this;
        this.state = {
            items: [],
            currentScreen: "index",
            currentExerciseId: null,
            indexViewModel: {
                recent: [],
                popular: [],
                disciplines: [],
                ageGroups: [],
                mediaCompetences: []
            },
            isLoading: true,
            disciplines: null,
            ageGroups: null,
            disciplines: null,
            themes: null
        };

        const useCms = true;
        const dataStore = new DataStore(useCms);
        
        Promise.all([dataStore.getExercises(), dataStore.getDisciplines(), dataStore.getThemes(), dataStore.getAgeGroups()])
            .then(([exercises, disciplines, themes, ageGroups]) => setTimeout(() => {
                self.setState({
                    indexViewModel: getIndexModel(exercises, disciplines),
                    isLoading: false,
                    exercises: exercises,
                    disciplines: disciplines,
                    themes: themes,
                    ageGroups: ageGroups
                });    
            }, 1000));
    }

    render() {
        return (
            <Router basename={this.basename}>
                <div>
                    <header>
                        <div className="container">
                            <Navbar></Navbar>
                        </div>
                    </header>
                    <ContentContainerWithSpinner isLoading={this.state.isLoading}>
                        <Route exact path="/" component={() => <Index {...this.state.indexViewModel}/>}></Route>
                        <Route path="/exercise-list" component={(props) => <ExerciseList {...props} exercises={this.state.exercises} disciplines={this.state.disciplines} themes={this.state.themes} ageGroups={this.state.ageGroups}></ExerciseList>}></Route>
                        <Route path="/exercise/:id" component={(props) => <Exercise {...props} exercise={this.state.exercises.filter((item) => item.id === props.match.params.id)[0]} themes={this.state.themes} ageGroups={this.state.ageGroups}></Exercise>}></Route>
                        <Route path="/authors" component={() => <div>Site is under construction. Please be patient</div>}></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/help" component={() => <div>Site is under construction. Please be patient</div>}></Route>
                    </ContentContainerWithSpinner>
                </div>
            </Router>);
    }
}



ReactDOM.render(<App></App>, document.getElementById('app'));