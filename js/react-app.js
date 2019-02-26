import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Spinner from '../js/shared-components/spinner.jsx'
import Index from  '../js/screens/index.jsx'
import Exercise from '../js/screens/exercise.jsx'
import ExerciseList from '../js/screens/exerciseList.jsx'
import getIndexModel  from '../js/controllers/indexController.js'

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
            isLoading: true
        };

        fetch('/exercises.json')
            .then(response => response.json())
            .then(json => {
                self.setState({
                    indexViewModel: getIndexModel(json),
                    isLoading: false
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (<Spinner></Spinner>);
        } else {
            return (<Router>
                <div>
                    <Route exact path="/" component={() => <Index {...this.state.indexViewModel}/>}></Route>
                    <Route path="/exercise-list" component={ExerciseList}></Route>
                    <Route path="/exercise/:id" component={Exercise}></Route>
                </div>
            </Router>);
        }
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));