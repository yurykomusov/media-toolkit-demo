import React from 'react'
import ReactDOM from 'react-dom'
import Card from '../shared-components/card.jsx'

class FilterList extends React.Component {
    constructor(props) {
        super(props);

        this.onItemClick = this.onItemClick.bind(this);
        this.state = {
            selected: props.selected
        }
    }

    getActiveClassName(isSelected) {
        if (isSelected) 
            return "selected";
        else 
            return "";
    }

    render() {
        return (
        <ul>
            {this.props.items.map(i => 
                <li data-key={i.key} key={i.key} onClick={this.onItemClick}>
                    <a className={this.getActiveClassName(i.key == this.state.selected)}>{i.text}</a>
                </li>)}
        </ul>);
    }

    onItemClick(e) {
        this.setState({ selected: e.currentTarget.dataset.key});

        console.log("this is data-key")
    }
}

const FilterBox = (props) => (
    <div className="row">
        <div className="three columns">
            <label>Прадметы</label>
            <FilterList items={props.disciplines} selected="arts"></FilterList>
        </div>
        <div className="three columns">
            <label>Мэтавыя групы</label>
            <FilterList items={props.ageGroups} selected="adults">
            </FilterList>
        </div>
        <div className="three columns">
            <label>Тэмы</label>
            <FilterList items={props.themes}></FilterList>
        </div>
        <div className="three columns">
            <label>Згрупаваць па</label>
            <FilterList items={props.sortAndGroup}>
            </FilterList>
        </div>
    </div>
);

const SearchResult = (props) => (
    <div className="row">
        <div>
            {`agegroup=${props.query.ageGroup},discipline=${props.query.disciplines},theme=${props.query.themes}`}
        </div>
        <h4 className="section-title">Group 1</h4>
        <div className="row">
            <Card className="three columns" title="One" description="One" linkTo=""></Card>
            <Card className="three columns" title="Two" description="Two" linkTo=""></Card>
            <Card className="three columns" title="Three" description="Three" linkTo=""></Card>
            <Card className="three columns" title="Four" description="Four" linkTo=""></Card>
        </div>
        
        <h4 className="section-title">Group 2</h4>
        <div className="row">            
            <Card className="three columns" title="One" description="One" linkTo=""></Card>
            <Card className="three columns" title="Two" description="Two" linkTo=""></Card>
            <Card className="three columns" title="Three" description="Three" linkTo=""></Card>
            <Card className="three columns" title="Four" description="Four" linkTo=""></Card>
        </div>
    </div>
);

class ExerciseList extends React.Component {
    constructor(props) {
        super(props);
        
        let searchParams = new URLSearchParams(props.location.search);

        this.state = {
            disciplines: [
                { "key": "manandtheworld", "text": "Чалавек і свет" },
                { "key": "arts", "text": "Мастацтва" },
                { "key": "geography", "text": "Геаграфія" },
                { "key": "biology", "text": "Біялогія" },
                { "key": "history", "text": "Гісторыя" },
                { "key": "educational", "text": "Выхаваўчы занятак" }
            ],
            ageGroups: [
                { "key": "elementary", "text": "Дзеці" },
                { "key": "primary", "text": "Падлеткі" },
                { "key": "adults", "text": "Дарослыя" }
            ],
            themes: [
                { "key": "factchecking", "text": "Факт чэкінг" },
                { "key": "mediagenres", "text": "Жанры медыя" },
                { "key": "mediasources", "text": "Крыніцы інфармацыі і іх надзейнасць" },
                { "key": "infosearch", "text": "Пошук інфармацыi" },
                { "key": "medialanguage", "text": "Мова медыя" },
                { "key": "mediadecoding", "text": "Дэкадаванне медыятэкстаў" },
                { "key": "mediacreation", "text": "Стварэнне, апрацоўка, прэзентацыя" },
                { "key": "pii", "text": "Ахова персанальных дадзеных" },
                { "key": "security", "text": "Інфармацыйная бяспека" },
                { "key": "disinformation", "text": "Дэзінфармацыя" },
                { "key": "infosourcing", "text": "Пошук і збор інфармацыі" }
            ],
            sortAndGroup: [
                { "key": "newest", "text": "Новыя"},
                { "key": "oldest", "text": "Старыя"},
                { "key": "bydiscipline", "text": "Па прадметах"},
                { "key": "byage", "text": "Па мэтавай групе"}
            ],
            showFilters: false,
            filterValues: {
                ageGroup: searchParams.get('ageGroup') || '',
                disciplines: searchParams.get('discipline') || '',
                themes: searchParams.get('theme') || '',
                sortAndGroup: "bydiscipline"
            }
        }
    }    

    render() {
        return (
            <div>
                <h2>Практыкаванні</h2>
                <button onClick={() => this.setState({ showFilters: !this.state.showFilters})}>Фільтры</button>
                {this.state.showFilters 
                    ? <FilterBox {...this.state}></FilterBox> 
                    : null}
                <SearchResult query={this.state.filterValues}></SearchResult>
            </div>);
    }
}


export default ExerciseList;

