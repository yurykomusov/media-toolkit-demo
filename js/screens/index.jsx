import React from 'react'
import ReactDOM from 'react-dom'
import Card from '../shared-components/card.jsx'

const SectionTitle = (props) => 
    (<div>
        <div className="ten columns"><h4>{props.children}</h4></div>
        <div className="two columns"><button>паказаць усе</button></div>
    </div>);

export default class Index extends React.Component {
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