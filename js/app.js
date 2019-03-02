import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Spinner from './shared-components/spinner.jsx'
import Index from  './screens/index.jsx'
import Exercise from './screens/exercise.jsx'
import ExerciseList from './screens/exerciseList.jsx'
import getIndexModel  from './controllers/indexController.js'


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
            },
            isLoading: true,
            json: null
        };

        fetch('exercises.json')
            .then(response => response.json())
            .then(json => {
                setTimeout(() => {
                    self.setState({
                        indexViewModel: getIndexModel(json),
                        isLoading: false,
                        json: json
                    });    
                }, 2000);
            });
    }

    render() {
        return (
            <Router>
                <div>
                    <header>
                        Nastaunik.info - Медыя Тулкіт
                        <nav>
                            <Link to="/">Галоўная</Link>
                            <Link to="/authors">Аўтары</Link>
                            <Link to="/about">А праекце</Link>
                            <Link to="/help">Падтрымаць</Link>
                        </nav>
                    </header>
                    <ContentContainerWithSpinner isLoading={this.state.isLoading}>
                        <Route exact path="/" component={() => <Index {...this.state.indexViewModel}/>}></Route>
                        <Route path="/exercise-list" component={(props) => <ExerciseList json={this.state.json} location={props.location} isLoading={this.state.isLoading}></ExerciseList>}></Route>
                        <Route path="/exercise/:id" component={Exercise}></Route>
                        <Route path="/authors" component={() => <div>Site is under construction. Please be patient</div>}></Route>
                        <Route path="/about" component={() => <div>Site is under construction. Please be patient</div>}></Route>
                        <Route path="/help" component={() => <div>Site is under construction. Please be patient</div>}></Route>
                    </ContentContainerWithSpinner>
                </div>
            </Router>);
    }
}

ReactDOM.render(<App></App>, document.getElementById('app'));