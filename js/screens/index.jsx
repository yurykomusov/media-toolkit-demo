import React from 'react'
import ReactDOM from 'react-dom'
import { Card, CardImage } from '../shared-components/card.jsx'
import Slider from 'react-slick'

const SectionTitle = (props) => 
    (<div>
        <div className="ten columns"><h4>{props.children}</h4></div>
    </div>);



export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this.disciplinesSliderSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,                   
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                  }
                }
            ]
        };
        this.sliderSettings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                  }
                }
            ]
        }
    }

    getNextColor(index) {
        const classNames = ["card-1", "card-2", "card-3", "card-4"];

        return classNames[index % classNames.length];
    }

    render() {        
        return (
            <div>
              <h4>Медыя кампетэнцыі</h4>
                <div className="row">
                    <Card className="three columns card-1" title="Доступ і надзейнасць крыніц" linkTo="/exercise-list/?competence=reliability"/>
                    <Card className="three columns card-2" title="Аналіз медыя" linkTo="/exercise-list/?competence=analysis"/>
                    <Card className="three columns card-3" title="Ацэнка медыя" linkTo="/exercise-list/?competence=assessment"/>
                    <Card className="three columns card-4" title="Стварэнне і карыстанне медыя прасторай" linkTo="/exercise-list/?competence=creative"/>
                </div>

                {/* <h4>Папулярныя</h4>
                <div className="row">
                    <Slider {...this.sliderSettings}>
                        {this.props.popular.map((i, index) => 
                          <Card className={"eleven columns " + this.getNextColor(index)} 
                            key={i.id} title={i.title} 
                            subtitle={i.discipline} 
                            description={i.summary} 
                            linkTo={`/exercise/${i.id}`}/>)}
                    </Slider>
                </div>  */}
                
                <h4>Новыя</h4>
                <div className="row">
                    <Slider {...this.sliderSettings}>
                        {this.props.recent.map((i, index) => 
                          <Card className={"eleven columns " + this.getNextColor(index)} 
                            key={i.id} 
                            title={i.title} 
                            subtitle={i.discipline} 
                            description={i.summary} 
                            linkTo={`/exercise/${i.id}`} />)}
                    </Slider>
                </div>
                
            <SectionTitle className="row">Мэтавая група</SectionTitle>
            <div className="row">
                <CardImage className="four columns kids text-white" 
                  title="Дзеці" linkTo="/exercise-list/?ageGroup=elementary"
                  imageUrl="https://yurykgeneral.blob.core.windows.net/aspnet-blob/kids.jpg"/>
                <CardImage className="four columns teens text-white" 
                  title="Падлеткі" linkTo="/exercise-list/?ageGroup=primary"
                  imageUrl="https://yurykgeneral.blob.core.windows.net/aspnet-blob/teens.jpg"/>
                <CardImage className="four columns teens text-white" 
                  title="Дарослыя" linkTo="/exercise-list/?ageGroup=adults"
                  imageUrl="https://yurykgeneral.blob.core.windows.net/aspnet-blob/adults.jpg"/>
            </div>

            <h4>Прадметы</h4>
            <Slider {...this.disciplinesSliderSettings}>
                {this.props.disciplines.map((discipline, index) => 
                    <Card className={"eleven columns " + this.getNextColor(index)} 
                        key={discipline.key} 
                        title={discipline.name} 
                        linkTo={discipline.url}/>)}
            </Slider>

        </div>);
    }
}