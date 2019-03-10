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
            <h2> Single Item</h2>
            <Slider {...settings}>
                <Card className="three columns" title="something" description="Yet another text to put"></Card>
            </Slider>
        </div>);
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        if (process.env.NODE_ENV == 'production') {
            this.basename = '/mediatoolkit';
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
            json: null
        };

        const dataFileLocation = process.env.NODE_ENV == 'production'
            ? 'https://yurykgeneral.blob.core.windows.net/aspnet-blob/exercises.json'
            : '/exercises.json'


        fetch(dataFileLocation)
            .then(response => response.json())
            .then(json => {
                setTimeout(() => {
                    self.setState({
                        indexViewModel: getIndexModel(json),
                        isLoading: false,
                        json: json
                    });    
                }, 1000);
            });
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
                        <Route path="/exercise-list" component={(props) => <ExerciseList json={this.state.json} {...props}></ExerciseList>}></Route>
                        <Route path="/exercise/:id" component={(props) => <Exercise {...props} json={this.state.json} exercise={this.state.json.items.filter((item) => item.id === props.match.params.id)[0]} ></Exercise>}></Route>
                        <Route path="/authors" component={() => <div>Site is under construction. Please be patient</div>}></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/help" component={() => <div>Site is under construction. Please be patient</div>}></Route>
                    </ContentContainerWithSpinner>
                </div>
            </Router>);
    }
}



ReactDOM.render(<App></App>, document.getElementById('app'));