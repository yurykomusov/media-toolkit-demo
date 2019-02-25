import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import getIndexModel  from '../js/controllers/indexController.js'

function Card(props) {
    if (props.description) {
        return (
            <div className={props.className}>
                <Link to={props.linkTo || "/"}>
                    <div className="pad">
                        <div className="image-container">
                            <h4>{props.title}</h4>
                        </div>
                        <div className="pad-description">
                            {props.description}
                        </div>
                    </div>
                </Link>
            </div>);
    } else {
        return (
            <div className={props.className}> 
                <Link to={props.linkTo || "/"}>
                    <div className="pad">
                        <div className="image-container image-container-full">
                            <h4>{props.title}</h4>
                        </div>
                    </div>
                </Link>
            </div>);
    }
}

const SectionTitle = (props) => 
    (<div>
        <div className="ten columns"><h4>{props.children}</h4></div>
        <div className="two columns"><button>паказаць усе</button></div>
    </div>);

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        return <div>
            <SectionTitle className="row">Папулярныя</SectionTitle>
            <div className="row">
                {this.props.popular.map((i) => <Card className="three columns" key={i.title} title={i.title} description={i.summary} linkTo={`/exercise/${i.id}`}/>)}
            </div>

            <SectionTitle className="row" title="Новыя"></SectionTitle>
            <div className="row">
                {this.props.recent.map((i) => <Card className="three columns" key={i.title} title={i.title} description={i.summary} linkTo={`/exercise/${i.id}`} />)}
            </div>

            <SectionTitle className="row">Мэтавая група</SectionTitle>
            <div className="row">
                <Card className="four columns" title="Дзеці" linkTo={`/exercise-list/?ageGroup=elementary`}/>
                <Card className="four columns" title="Падлеткі" linkTo={`/exercise-list/?ageGroup=primary`}/>
                <Card className="four columns"title="Дарослыя" linkTo={`/exercise-list/?ageGroup=adults`}/>
            </div>

            <SectionTitle className="row">Прадметы</SectionTitle>
            <div className="row">
                <Card className="three columns" title="Біялогія"/>
                <Card className="three columns" title="Геаграфія"/>
                <Card className="three columns" title="Гісторыя і грамадазнаўства"/>
                <Card className="three columns" title="Замежная мова"/>
            </div>

            <SectionTitle className="row">Медыя кампетэнцыі</SectionTitle>
            <div className="row">
                <Card className="three columns" title="Доступ і надзейнасць крыніц"/>
                <Card className="three columns" title="Аналіз медыя"/>
                <Card className="three columns" title="Ацэнка медыя"/>
                <Card className="three columns" title="Стварэнне і карыстанне медыя прасторай"/>
            </div>
        </div>
    }
}

const ExerciseList = ({ location }) => (<div>{location.search}</div>);

const Exercise = ({ match }) => (<div>{"Ha! You got me! id=" + match.params.ageGroup } </div>);

class App extends React.Component {
    constructor(props) {
        super(props);

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
            }
        };

        fetch('exercises.json')
            .then(response => response.json())
            .then(json => {
                self.setState({
                    indexViewModel: getIndexModel(json)
                })
            });
    }

    render() {
        return (
            <Router>
                <div>
                <Route exact path="/" component={() => <Index {...this.state.indexViewModel}/>}></Route>
                <Route path="/exercise-list" component={ExerciseList}></Route>
                <Route path="/exercise/:id" component={Exercise}></Route>
                </div>
            </Router>
        );
    }

    goToExerciseScreen(id) {
        this.setState({ currentScreen: "exerciseList", currentExerciseId: id});
    }

    goToIndexScreen() {
        this.setState({ currentScreen: "index", currentExerciseId: null});
    }

}

ReactDOM.render(<App/>, document.getElementById('app'));