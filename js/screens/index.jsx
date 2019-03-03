import React from 'react'
import ReactDOM from 'react-dom'
import Card from '../shared-components/card.jsx'
import Slider from 'react-slick'

const SectionTitle = (props) => 
    (<div>
        <div className="ten columns"><h4>{props.children}</h4></div>
        {/* <div className="two columns"><button>паказаць усе</button></div> */}
    </div>);



export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this.disciplinesSliderSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1   
        };
        this.sliderSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1   
        }
    }

    getNextColor(index) {
        const classNames = ["pad-orange", "pad-green", "pad-blue", "pad-brown"];

        return classNames[index % classNames.length];
    }

    render() {        
        return (
            <div>
                <h4>Папулярныя</h4>
                <div className="row">
                    <Slider {...this.sliderSettings}>
                        {this.props.popular.map((i) => <Card className="eleven columns" key={i.title} title={i.title} description={i.summary} linkTo={`/exercise/${i.id}`}/>)}
                    </Slider>
                </div> 
                
                <h4>Новыя</h4>
                <div className="row">
                    <Slider {...this.sliderSettings}>
                        {this.props.recent.map((i) => <Card className="eleven columns" key={i.title} title={i.title} description={i.summary} linkTo={`/exercise/${i.id}`} />)}
                    </Slider>
                </div>
                
            <SectionTitle className="row">Мэтавая група</SectionTitle>
            <div className="row">
                <Card className="four columns" title="Дзеці" linkTo="/exercise-list/?ageGroup=elementary"/>
                <Card className="four columns" title="Падлеткі" linkTo="/exercise-list/?ageGroup=primary"/>
                <Card className="four columns"title="Дарослыя" linkTo="/exercise-list/?ageGroup=adults"/>
            </div>            

            <h4>Прадметы</h4>
            <Slider {...this.disciplinesSliderSettings}>
                {this.props.disciplines.map((discipline, index) => 
                    <Card className={"eleven columns " + this.getNextColor(index)} 
                        key={discipline.key} 
                        title={discipline.name} 
                        linkTo={discipline.url}/>)}
            </Slider>

            <h4>Медыя кампетэнцыі</h4>
            <div className="row">
                <Card className="three columns" title="Доступ і надзейнасць крыніц"/>
                <Card className="three columns" title="Аналіз медыя"/>
                <Card className="three columns" title="Ацэнка медыя"/>
                <Card className="three columns" title="Стварэнне і карыстанне медыя прасторай"/>
            </div>
        </div>);
    }
}