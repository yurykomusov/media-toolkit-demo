import React from 'react'
import ReactDOM from 'react-dom'
import Card from '../shared-components/card.jsx'

const Exercise = ({ match }) => (<div>{"Ha! You got me! id=" + match.params.ageGroup } </div>);

export default Exercise;